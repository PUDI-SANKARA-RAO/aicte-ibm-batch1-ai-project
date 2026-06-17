import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser configuration to allow large audio uploads
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// Derive directories for static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString()
  });
});

// Primary generation API using Gemini audio-to-intelligence schema
app.post("/api/generate", async (req, res) => {
  try {
    const { base64Audio, mimeType, fileName, textTranscript } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(400).json({
        error: "Missing GEMINI_API_KEY configuration inside the Settings > Secrets panel of your AI Studio environment."
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // We can either use raw base64 audio directly in Gemini, or draft notes from a text block
    let contents: any[] = [];

    if (base64Audio && mimeType) {
      contents.push({
        inlineData: {
          data: base64Audio,
          mimeType: mimeType,
        },
      });
      contents.push({
        text: `You are an elite academic assistant. Listen carefully to this lecture audio recording and process it as follows:
1. Transcribe the lecture speech accurately and verbatim. Keep filler words out, make the paragraphs readable.
2. Formulate highly detailed structured Lecture Notes in clean GitHub-Flavored Markdown. Use generous headers (##, ###), bullet lists, definitions of crucial terms, styled callout blocks for formulas/laws, and clear practical examples.
3. Formulate three types of summaries: a short 100-word summary, a comprehensive 200-word summary, and a single catchy one-sentence summary.
4. Generate 8 high-value interactive flashcards for critical keywords, theories, or formulas covered.
5. Generate 10 multiple-choice questions (MCQs) of varying difficulty levels (Easy, Medium, Hard). Each quiz question must have 4 options, a correctOption index (0 to 3), and a comprehensive reason explaining the correct and incorrect answers.

Return everything strictly parsed according to the required JSON schema response schema.`
      });
    } else if (textTranscript) {
      contents.push({
        text: `You are an elite academic assistant. Based on this lecture text/transcript, process and generate study materials:
1. Process the text and output it as the clean transcript asset.
2. Formulate highly detailed structured Lecture Notes in clean GitHub-Flavored Markdown. Use generous headers (##, ###), bullet lists, definitions of crucial terms, styled callout blocks for formulas/laws, and clear practical examples.
3. Formulate three types of summaries: a short 100-word summary, a comprehensive 200-word summary, and a single catchy one-sentence summary.
4. Generate 8 high-value interactive flashcards for critical keywords, theories, or formulas covered.
5. Generate 10 multiple-choice questions (MCQs) of varying difficulty levels (Easy, Medium, Hard). Each quiz question must have 4 options, a correctOption index (0 to 3), and a comprehensive reason explaining the correct and incorrect answers.

Input Lecture Text:
"${textTranscript}"

Return everything strictly parsed according to the required JSON schema response schema.`
      });
    } else {
      return res.status(400).json({ error: "Please provide either verified audio recording data or raw text transcript." });
    }

    // Configure schema definition
    const responseSchema = {
      type: Type.OBJECT,
      properties: {
        transcript: {
          type: Type.STRING,
          description: "An accurate paragraphs-based transcription of the lecture audio or cleaned text transcript.",
        },
        notes: {
          type: Type.STRING,
          description: "Detailed scholarly Markdown lecture notes with headings, subheadings, bullet points, blockquotes, code-blocks or callouts, bold terms, and explicit practical examples.",
        },
        summary100: {
          type: Type.STRING,
          description: "A compact lecture summary of approximately 100 words.",
        },
        summary200: {
          type: Type.STRING,
          description: "A detailed, detailed narrative summary of approximately 200 words.",
        },
        summaryOneLine: {
          type: Type.STRING,
          description: "A single, punchy one-liner summarizing the lecture's core takeaway.",
        },
        flashcards: {
          type: Type.ARRAY,
          description: "A list of 8-10 high-value study flashcard QA pairs.",
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "The front of the card: term or concept question." },
              answer: { type: Type.STRING, description: "The back of the card: clear, verified answer or explanation." }
            },
            required: ["question", "answer"]
          }
        },
        quiz: {
          type: Type.ARRAY,
          description: "An interactive set of 10 comprehensive MCQs scaling in difficulty (Easy, Medium, Hard) to test learning.",
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "The multiple choice question." },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of exactly 4 choices."
              },
              correctOption: { type: Type.INTEGER, description: "Scale of 0-3 index representing the correct answer." },
              explanation: { type: Type.STRING, description: "Brief academic reasoning explaining the correct option." }
            },
            required: ["question", "options", "correctOption", "explanation"]
          }
        }
      },
      required: ["transcript", "notes", "summary100", "summary200", "summaryOneLine", "flashcards", "quiz"]
    };

    console.log("Routing content analysis request to Gemini model 'gemini-3.5-flash'...");
    
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema,
        temperature: 0.2, // low temperature for high precision transcription and academic accuracy
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.status(200).json(parsedData);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    return res.status(500).json({
      error: error?.message || "An unexpected error occurred during audio processing and lecture generation."
    });
  }
});

// Configure Vite integration or build asset serving
const isProd = process.env.NODE_ENV === "production";
const distPath = path.join(process.cwd(), "dist");

async function launch() {
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware loaded.");
  } else {
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled static assets from dist/.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lecture Notes Server booted successfully at URL http://localhost:${PORT}`);
  });
}

launch().catch((err) => {
  console.error("Failed to launch Express server:", err);
});
