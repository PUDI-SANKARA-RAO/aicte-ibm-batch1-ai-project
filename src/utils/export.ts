import { Lecture } from "../types";

// Helper to sanitize filename
const getSafeFilename = (title: string, ext: string) => {
  const clean = title.toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `${clean || "lecture_notes"}.${ext}`;
};

// Export as plain text (TXT)
export const exportToTxt = (lecture: Lecture) => {
  const content = `==================================================
LECTURE: ${lecture.title.toUpperCase()}
DATE: ${lecture.date}
DURATION: ${lecture.duration} | FILE SIZE: ${lecture.fileSize}
==================================================

ONE-LINE SUMMARY:
${lecture.summaryOneLine}

100-WORD SUMMARY:
${lecture.summary100}

200-WORD SUMMARY:
${lecture.summary200}

==================================================
LECTURE NOTES
==================================================
${lecture.notes}

==================================================
TRANSCRIPT
==================================================
${lecture.transcript}

==================================================
FLASHCARDS
==================================================
${lecture.flashcards.map((f, i) => `[CARD ${i + 1}]
Q: ${f.question}
A: ${f.answer}
-------------------------`).join("\n")}

==================================================
PRACTICE QUIZ
==================================================
${lecture.quiz.map((q, i) => `Q${i + 1}: ${q.question}
Options:
  A) ${q.options[0]}
  B) ${q.options[1]}
  C) ${q.options[2]}
  D) ${q.options[3]}
Correct Answer Index: Option ${String.fromCharCode(65 + q.correctOption)}
Explanation: ${q.explanation}
-------------------------`).join("\n")}
`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getSafeFilename(lecture.title, "txt");
  link.click();
  URL.revokeObjectURL(url);
};

// Export as DOCX using standard HTML format compatible with MS Word
export const exportToDocx = (lecture: Lecture) => {
  const content = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${lecture.title}</title>
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
        h1 { color: #1e3a8a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
        h2 { color: #1e40af; margin-top: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
        h3 { color: #1d4ed8; }
        .meta { color: #64748b; font-size: 0.95em; margin-bottom: 20px; }
        .summary-box { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 16px 0; }
        .term { font-weight: bold; color: #0f172a; }
        blockquote { border-left: 4px solid #94a3b8; padding-left: 12px; color: #475569; font-style: italic; }
        table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
        th { background-color: #f1f5f9; }
        .card { border: 1px solid #e2e8f0; padding: 12px; margin-bottom: 10px; background-color: #f8fafc; }
      </style>
    </head>
    <body>
      <h1>${lecture.title}</h1>
      <div class="meta">
        <strong>Date:</strong> ${lecture.date} &nbsp;|&nbsp; 
        <strong>Duration:</strong> ${lecture.duration} &nbsp;|&nbsp; 
        <strong>File Size:</strong> ${lecture.fileSize}
      </div>

      <div class="summary-box">
        <h3>Lecture Summaries</h3>
        <p><strong>One-Sentence:</strong> ${lecture.summaryOneLine}</p>
        <p><strong>100-Words:</strong> ${lecture.summary100}</p>
        <p><strong>200-Words:</strong> ${lecture.summary200}</p>
      </div>

      <h2>Study Notes</h2>
      <div>${lecture.notes.replace(/\n/g, "<br/>")}</div>

      <h2>Lecture Transcript</h2>
      <p style="white-space: pre-wrap;">${lecture.transcript}</p>

      <h2>Flashcards</h2>
      ${lecture.flashcards.map((f, i) => `
        <div class="card">
          <strong>Question ${i + 1}:</strong> ${f.question}<br/>
          <strong>Answer:</strong> ${f.answer}
        </div>
      `).join("")}

      <h2>Practice Quiz</h2>
      ${lecture.quiz.map((q, i) => `
        <div class="card">
          <p><strong>Q${i + 1}: ${q.question}</strong></p>
          <ul>
            <li>[A] ${q.options[0]} ${q.correctOption === 0 ? "★ (Correct)" : ""}</li>
            <li>[B] ${q.options[1]} ${q.correctOption === 1 ? "★ (Correct)" : ""}</li>
            <li>[C] ${q.options[2]} ${q.correctOption === 2 ? "★ (Correct)" : ""}</li>
            <li>[D] ${q.options[3]} ${q.correctOption === 3 ? "★ (Correct)" : ""}</li>
          </ul>
          <p><em>Explanation:</em> ${q.explanation}</p>
        </div>
      `).join("")}
    </body>
    </html>
  `;

  const blob = new Blob(["\ufeff" + content], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = getSafeFilename(lecture.title, "doc");
  link.click();
  URL.revokeObjectURL(url);
};

// Open a custom styled elegant print win optimized for crisp high res vector PDF layout
export const exportToPdf = (lecture: Lecture) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Popup blocker prevented exporting as PDF. Please allow popups for this page.");
    return;
  }

  printWindow.document.write(`
    <html>
      <head>
        <title>${lecture.title} - Study Pack</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #1e293b;
            padding: 40px;
            max-width: 800px;
            margin: 0 auto;
          }
          h1 { font-size: 28px; font-weight: 700; color: #0f172a; margin-bottom: 8px; border-bottom: 2px solid #3b82f6; padding-bottom: 12px; }
          h2 { font-size: 20px; font-weight: 600; color: #1e3a8a; margin-top: 36px; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
          .meta { font-size: 14px; color: #64748b; margin-bottom: 24px; display: flex; gap: 16px; }
          .summary-card { background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin: 24px 0; }
          .summary-section { margin-bottom: 12px; }
          .summary-section strong { display: block; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 4px; }
          .notes-container { font-size: 15px; }
          .notes-container h1, .notes-container h2, .notes-container h3 { border: none; margin-top: 18px; color: #1e293b; }
          .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; page-break-inside: avoid; }
          .card strong { color: #0f172a; }
          .options-list { list-style: none; padding-left: 0; margin-top: 8px; }
          .options-list li { padding: 6px 12px; margin-bottom: 4px; border-radius: 4px; border: 1px solid #e2e8f0; }
          .options-list li.correct { background-color: #f0fdf4; border-color: #bbf7d0; color: #166534; font-weight: 500; }
          .explanation { font-size: 13px; color: #475569; margin-top: 8px; font-style: italic; }
          @media print {
            body { padding: 20px; color: #000; }
            h2 { page-break-after: avoid; }
            .card { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <h1>${lecture.title}</h1>
        <div class="meta">
          <span><strong>Date:</strong> ${lecture.date}</span>
          <span><strong>Duration:</strong> ${lecture.duration}</span>
          <span><strong>File Size:</strong> ${lecture.fileSize}</span>
        </div>

        <div class="summary-card">
          <div class="summary-section">
            <strong>Key Focus (One-line)</strong>
            <div>${lecture.summaryOneLine}</div>
          </div>
          <div class="summary-section" style="margin-top: 16px;">
            <strong>Executive Summary (100 words)</strong>
            <div>${lecture.summary100}</div>
          </div>
          <div class="summary-section" style="margin-top: 16px;">
            <strong>Detailed Summary (200 words)</strong>
            <div>${lecture.summary200}</div>
          </div>
        </div>

        <h2>I. Comprehensive Lecture Notes</h2>
        <div class="notes-container">${lecture.notes.replace(/\n/g, "<br/>")}</div>

        <div style="page-break-before: always;"></div>

        <h2>II. Review Flashcards</h2>
        ${lecture.flashcards.map((f, i) => `
          <div class="card">
            <p><strong>Front of Card (Question ${i + 1}):</strong><br/> ${f.question}</p>
            <p style="border-top: 1px dashed #e2e8f0; padding-top: 8px; margin-top: 8px;"><strong>Back of Card (Answer):</strong><br/> ${f.answer}</p>
          </div>
        `).join("")}

        <div style="page-break-before: always;"></div>

        <h2>III. Lecture Assessment Quiz</h2>
        ${lecture.quiz.map((q, i) => `
          <div class="card">
            <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
            <ul class="options-list">
              <li class="${q.correctOption === 0 ? "correct" : ""}">${q.options[0]} ${q.correctOption === 0 ? "✓" : ""}</li>
              <li class="${q.correctOption === 1 ? "correct" : ""}">${q.options[1]} ${q.correctOption === 1 ? "✓" : ""}</li>
              <li class="${q.correctOption === 2 ? "correct" : ""}">${q.options[2]} ${q.correctOption === 2 ? "✓" : ""}</li>
              <li class="${q.correctOption === 3 ? "correct" : ""}">${q.options[3]} ${q.correctOption === 3 ? "✓" : ""}</li>
            </ul>
            <p class="explanation"><strong>Explanation:</strong> ${q.explanation}</p>
          </div>
        `).join("")}

        <h2>IV. Full Verbatim Transcript</h2>
        <p style="white-space: pre-wrap; font-size: 13px; color: #475569;">${lecture.transcript}</p>

        <script>
          window.onload = function() {
            window.print();
          };
        </script>
      </body>
    </html>
  `);
  printWindow.document.close();
};
