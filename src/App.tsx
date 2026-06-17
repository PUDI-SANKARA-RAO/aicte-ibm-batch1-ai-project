import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  HelpCircle,
  Layers,
  FileText,
  PlusCircle,
  Sparkles,
  Clock,
  Calendar,
  Download,
  Trash2,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Search,
  AlertCircle,
  RefreshCw,
  Sun,
  Moon,
  Mic,
  Pause,
  Square,
  Upload,
  ChevronRight,
  Sliders,
  Volume2,
  Bookmark,
  Share2,
  Settings as SettingsIcon
} from "lucide-react";
import { Lecture, Flashcard, QuizQuestion } from "./types";
import { exportToPdf, exportToDocx, exportToTxt } from "./utils/export";
import DashboardView from "./components/DashboardView";

// Initial academic mock lecture template for out-of-the-box premium experience
const INITIAL_LECTURES: Lecture[] = [
  {
    id: "sample-lecture-1",
    title: "Quantum Superposition & Computing Mechanics",
    date: "2026-06-12",
    duration: "45m 12s",
    fileSize: "14.2 MB",
    transcript: "Welcome class to Lecture 4 on Quantum Superposition. Today we will explore how subatomic particles exist in multiple systemic states at once, defined mathematically by wavefunctions. Unlike classical computing bits which must be strictly zero or one, quantum computing operates with qubits. Qubits occupy a mathematical linear combination of states until a physical measurement collapsing the wave function occurs. We express superposition through Dirac bra-ket notation |ψ⟩ = α|0⟩ + β|1⟩, where the probability of observing state |0⟩ is calculated as the absolute square of the coefficient α, and state |1⟩ as the absolute square of β, subject to the normalization constraint. Entanglement and interference allow these superposition states to handle exponentially parallel calculations, rendering algorithms like Shor's or Grover's immensely powerful relative to traditional silicon architectures. However, environmental interactions quickly cause decoherence, which is the primary engineering challenge facing companies like IBM, Google, and Rigetti. Quantum error correction requires thousands of physical qubits to sustain a single logical qubit, which is why research is heavily funded worldwide.",
    notes: `## Quantum Mechanics: Superposition and Classical Collapses

### 1. Fundamental Principles
Classical computer bits are binary, representing state elements restricted strictly to **0** or **1**. Modern quantum bits (**qubits**) deviate from this by existing in a **coherent linear combination** of both base states simultaneously. This physical state is known as **Quantum Superposition**.

### 2. Dirac Mathematical Formulation
Any generic state $|\\psi\\rangle$ of a single qubit can be defined dynamically as:

> $|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle$

Where:
* $\\alpha$ and $\\beta$ are complex amplitude coordinates of the wavefunction.
* The physical probability of observing state $|0\\rangle$ during measurement is $|\\alpha|^2$.
* The physical probability of observing state $|1\\rangle$ is $|\\beta|^2$.
* The state is subject to the normalization constraint: $|\\alpha|^2 + |\\beta|^2 = 1$.

### 3. Practical Analogy
Consider a spinning coin. While spinning on a wood table, the coin is in a superposition of both "heads" and "tails" simultaneously. It is only when you press your hand flat to the coin that the state collapses into a singular binary outcome.

### 4. Key Limitations and Decoherence
* **Decoherence**: Quantum calculations require perfect isolation. Interactions with thermal, electromagnetic, or atmospheric environments instantly destroy the phase angles.
* **Quantum Error Correction (QEC)**: Stabilizing a single perfect logical qubit currently demands upwards of 1,000 physical qubits in a localized cryo-fridge.`,
    summary100: "This lecture introduces quantum superposition, demonstrating how qubits differ from normal bits by existing in linear combinations of states simultaneously. Described mathematically as |ψ⟩ = α|0⟩ + β|1⟩, state probabilities correspond to the absolute square of their complex coefficients, constrained to a sum of 1. Quantum computing relies on superposition, interference, and entanglement to achieve parallel processing. However, environmental coupling induces rapid decoherence, demanding thousands of physical error-correcting qubits to protect and sustain a single functional logical qubit.",
    summary200: "The session focuses on quantum superposition and its crucial application in next-generation computing hardware. Superposition allows quantum systems to possess dual-value probabilities before physical measurement collapses the wave structure. This behavior is represented formally with the standard Dirac Bra-Ket notation. Quantum superposition enables modern quantum devices to complete calculations exponentially faster than classical Turing architectures. However, the fragile phase relationship easily breaks down due to environmental noise in a process called decoherence. To counter this, scientists utilize complex quantum error correction (QEC) models requiring high physical-to-logical qubit scale ratios. This physical overhead continues to be the dominant barrier holding back fault-tolerant quantum computers.",
    summaryOneLine: "Quantum superposition allows qubits to calculate in state-combinations before decoherence, unlocking exponential computational power.",
    flashcards: [
      { question: "What is a Qubit?", answer: "The fundamental unit of quantum information, analogous to the classical bit but capable of existing in multiple states simultaneously." },
      { question: "What defines Decoherence?", answer: "The loss of quantum coherence and phase alignment, caused by interaction and entanglement with the external thermal or material environment." },
      { question: "State the Normalization Constraint formula.", answer: "|α|² + |β|² = 1, ensuring the total sum of state probabilities equals 100%." },
      { question: "What represents Dirac Notation?", answer: "A mathematical notation utilizing brackets (|ψ⟩) to represent vector coordinates in quantum mechanics." },
      { question: "Why is cryogenic cooling needed for qubits?", answer: "To reduce thermal noise and slow down the process of environmental decoherence." },
      { question: "Name two quantum algorithms.", answer: "Shor's algorithm (for prime factorization) and Grover's algorithm (for unstructured database searching)." },
      { question: "What is Wavefunction Collapse?", answer: "The irreversible transition of a quantum state from a superposition into a single deterministic state caused by external measurement." },
      { question: "What is a Logical Qubit?", answer: "A fault-tolerant qubit constructed from a collective array of physical qubits running error correction." }
    ],
    quiz: [
      {
        question: "How does a qubit state differ from a traditional binary computer bit?",
        options: [
          "It can represent values from 0 to 9.",
          "It exists in a linear mathematical combination of both 0 and 1 until measured.",
          "It holds electrical charges inside silicon floating gate transistors solely.",
          "It does not require any mathematics to construct or compute."
        ],
        correctOption: 1,
        explanation: "Superposition allows qubits to store linear combinations of states, while classical bits are physically gated to discrete 0 or 1 charges."
      },
      {
        question: "In Dirac state notation, what does the term |α|² represent?",
        options: [
          "The speed of light inside the quantum processing unit.",
          "The number of faulty qubits connected to the microchip.",
          "The mathematical probability of collapsing to state |0⟩ upon physical observance.",
          "The coefficient of thermal expansion."
        ],
        correctOption: 2,
        explanation: "The square of the absolute value of the complex coefficient represents the active probability of measuring that specific base state."
      },
      {
        question: "Which of the following describes Quantum Decoherence?",
        options: [
          "A mechanical process that makes computers run faster.",
          "An state of perfect vacuum isolation in cryogenic chambers.",
          "The unwanted collapse of the quantum state due to thermal or material environmental noise.",
          "A program code used directly to compile Python scripts."
        ],
        correctOption: 2,
        explanation: "Decoherence is the primary physical challenge where quantum phase angles slip due to external thermal or environmental interactions."
      },
      {
        question: "Why do quantum computers require 'thousands of physical qubits' for simple operations?",
        options: [
          "To increase the overall screen resolution of the monitor.",
          "Because physical qubits are very cheap to fabricate.",
          "To implement quantum error correction and sustain single logical qubits.",
          "To allow the computer to connect directly to public Wi-Fi networks."
        ],
        correctOption: 2,
        explanation: "Due to high noise, vast redundant physical qubits are bound together to run error-correcting codes, forming a single stable logical qubit."
      },
      {
        question: "What is the sum of probabilities of all possible states in quantum superposition?",
        options: [
          "Always zero.",
          "It scales logarithmically up to one thousand.",
          "Exactly one, as defined by the normalization constraint.",
          "It varies randomly depending on the processor speed."
        ],
        correctOption: 2,
        explanation: "By the normalization constraint, the sum of all probabilities (|α|² + |β|²) must always equal 1 (representing a 100% total probability)."
      },
      {
        question: "Who are the major industry players active in building qubits?",
        options: [
          "Standard automobile manufacturers.",
          "Companies like IBM, Google, and Rigetti.",
          "Traditional silicon mining corporations exclusively.",
          "Local web development agencies."
        ],
        correctOption: 1,
        explanation: "IBM, Google, and Rigetti are leading tech entities building and hosting superconducting and trapped ion quantum computers."
      },
      {
        question: "What physical mechanism is exploited to perform fast parallel search algorithms?",
        options: [
          "Standard magnetic core memory structures.",
          "Superposition, interference, and quantum entanglement.",
          "Multi-threading on localized silicon chips.",
          "Standard browser local storage databases."
        ],
        correctOption: 1,
        explanation: "Entanglement and quantum interference allow qubits to explore an exponential search space simultaneously, leaving classical bits behind."
      },
      {
        question: "Which formula properly defines the single qubit superposition state?",
        options: [
          "E = mc²",
          "|ψ⟩ = α|0⟩ + β|1⟩",
          "PV = nRT",
          "a² + b² = c²"
        ],
        correctOption: 1,
        explanation: "This is the classic single-qubit Dirac vector state formulation with complex amplitude coefficients α and β."
      },
      {
        question: "What temperature is generally needed for superconducting quantum chips?",
        options: [
          "Slightly below standard office room temperatures.",
          "Exactly 0 degrees Celsius.",
          "Near absolute zero, around 10-15 millikelvins.",
          "Extremely hot temperatures similar to combustion engines."
        ],
        correctOption: 2,
        explanation: "Superconducting qubits must be cooled to near absolute zero in dilution refrigerators to minimize thermal currents and preserve superposition."
      },
      {
        question: "What is quantum entanglement?",
        options: [
          "Two separate software programs failing to compile together.",
          "A phenomenon where physical states of qubits remain linked regardless of the physical distance between them.",
          "A messy arrangement of fiber optic cables inside raw servers.",
          "The process of converting MP3 files to simple TXT documents."
        ],
        correctOption: 1,
        explanation: "Entanglement links particles such that the state of one instantly correlates with the state of another, creating powerful computational systems."
      }
    ]
  },
  {
    id: "sample-lecture-2",
    title: "Artificial Intelligence: Backpropagation & Loss Optimization",
    date: "2026-06-10",
    duration: "38m 45s",
    fileSize: "11.8 MB",
    transcript: "Class, today we study the backbone of deep learning: Backpropagation. At its core, training a neural network is an iterative optimization problem where we aim to minimize a mathematical loss function. The loss function, such as Mean Squared Error or Cross-Entropy, represents how wrong our model network predictions are. To find how we should adjust weights to decrease this loss, we compute the partial derivative of the loss with respect to every single parameter weight. We use the calculus chain rule for this. The signal cascades backward from the final loss output layer through recursive activations like Sigmoid or ReLU. By updating each weight using the product of the gradient and a small scalar value called the learning rate, the network iteratively learns. Let's make sure we write this down and implement it safely.",
    notes: `## Deep Learning: The Calculus of Backpropagation

### 1. Introduction to Loss Minimization
To teach neural networks, we must quantify their inaccuracies using a mathematical **loss function** ($L$).
* **MSE (Mean Squared Error)**: Used for continuous numeric predictions (regression).
* **Cross-Entropy Loss**: Standard for categorical classifications.

### 2. The Chain Rule of Calculus
Because weights are layered deep within model layers, we compute gradients recursively backward from output nodes to the inputs using the **chain rule**:

> $\\frac{\\partial L}{\\partial w_i} = \\frac{\\partial L}{\\partial y} \\cdot \\frac{\\partial y}{\\partial z} \\cdot \\frac{\\partial z}{\\partial w_i}$

Where:
* $y$ is the predicted model output.
* $z$ is the weighted sum input to the neuron activation.
* $w_i$ is the targeted weight parameter.

### 3. Gradient Descent Weight Updates
Once the gradient is obtained, we adjust the weight value proportionally using:

> $w_i \\leftarrow w_i - \\eta \\frac{\\partial L}{\\partial w_i}$

Where $\\eta$ (eta) represents the **learning rate**. If this scalar is too large, the algorithm will oscillate and diverge; if it is too small, convergence will be slow.`,
    summary100: "This lecture covers backpropagation, the vital mathematical engine behind training neural networks. Training optimizes parameter weights to minimize loss functions like Mean Squared Error or Cross-Entropy. The calculus chain rule calculates gradient vectors, propagating errors back from the output layer to input neurons. Once these partial derivatives are calculated, weights update through gradient descent, guided by the learning rate. Learning rate selection is critical: excessive values cause divergence, while overly small settings prolong training times.",
    summary200: "The instructor reviews backpropagation and loss optimization within artificial feedforward neural networks. In deep learning frameworks, the loss function acts as a scoreboard of error. Backpropagation works by systematically computing the partial derivative of this objective function relative to each parameter weight. Utilizing the chain rule of multivariable calculus, error values flow backwards through successive levels of neurons and non-linear activation gates. Standard gradient descent then subtracts this derivative vector scaled by the learning rate from the active weights. Proper gradient optimization determines whether modern architectures like large language models and transformers compile and solve complex visual or text tasks with high accuracy.",
    summaryOneLine: "Backpropagation uses the calculus chain rule to compute gradients, updating neural network weights via gradient descent.",
    flashcards: [
      { question: "What is Backpropagation?", answer: "An algorithm that calculates gradients of the loss function with respect to weights of a neural network utilizing the chain rule." },
      { question: "Define a Loss Function.", answer: "A mathematical function measuring the difference between predicted values and actual target values." },
      { question: "What is Learning Rate (eta)?", answer: "A scalar tuning parameter determining step sizes in gradient descent updates." },
      { question: "Name two common activation functions.", answer: "ReLU (Rectified Linear Unit) and Sigmoid." },
      { question: "What is the Calculus Chain Rule?", answer: "A calculus standard for finding derivatives of composite functions, calculating how changes cascade." },
      { question: "What happens if learning rate is too large?", answer: "The model might overshoot optimal minima, oscillate wildly, or mathematically diverge." },
      { question: "Define Gradient Descent.", answer: "An optimization algorithm that iteratively moves variables towards the direction of steepest descent to minimize loss." },
      { question: "What is an epoch?", answer: "One full pass of the entire training dataset through the neural network." }
    ],
    quiz: [
      {
        question: "What core calculus tool does backpropagation rely on?",
        options: [
          "The Pythagorean Theorem",
          "The Chain Rule of composite derivatives",
          "Integration by parts exclusively",
          "Fourier analytical transforms"
        ],
        correctOption: 1,
        explanation: "The chain rule allows gradients to propagate backwards through nested activation functions and layers."
      },
      {
        question: "What is the primary danger of choosing a learning rate that is too high?",
        options: [
          "The computer screen loses contrast.",
          "The optimization model may overstep minimum points and diverge.",
          "The database deletes itself.",
          "The neural network runs out of physical disk space."
        ],
        correctOption: 1,
        explanation: "Excessive learning step sizes cause gradient vectors to overshoot valleys, resulting in erratic oscillations or mathematical divergence."
      },
      {
        question: "Which of these losses is typically preferred for multi-class classification?",
        options: [
          "Mean Squared Error (MSE)",
          "Cross-Entropy Loss",
          "Simple addition function",
          "Linear regression equation"
        ],
        correctOption: 1,
        explanation: "Cross-Entropy is optimized to penalize wrong probability outputs in classification, while MSE is standard for continuous values."
      },
      {
        question: "What represents 'z' inside feedforward calculations?",
        options: [
          "The output of the final model block.",
          "The database server port number.",
          "The weighted sum of node inputs before an activation function is applied.",
          "The total training hours."
        ],
        correctOption: 2,
        explanation: "z is the linear combination of weights, biases, and active elements before state projection via activations like ReLU."
      },
      {
        question: "What does gradient descent do to minimize the loss function?",
        options: [
          "It climbs up the highest slope coordinates.",
          "It subtracts the loss gradient multiplied by the learning rate from parameters.",
          "It randomizes the neural network configuration completely.",
          "It converts categorical values to base64 Strings."
        ],
        correctOption: 1,
        explanation: "Weights are updated in the negative direction of the gradient to travel down the loss curve systematically."
      },
      {
        question: "Which activation function is defined by f(x) = max(0, x)?",
        options: [
          "Sigmoid",
          "Hyperbolic Tangent (tanh)",
          "ReLU",
          "Cosine wave"
        ],
        correctOption: 2,
        explanation: "ReLU is zero for negative inputs and linear for positive inputs, solving vanishing gradient issues."
      },
      {
        question: "What is MSE?",
        options: [
          "Modern Systems Engineering",
          "Mean Squared Error, measuring average squared prediction variance",
          "Micro Second Epoch",
          "Minimal Softmax Element"
        ],
        correctOption: 1,
        explanation: "Mean Squared Error computes the mean of squared differences between outputs and original values, ideal for continuous regression."
      },
      {
        question: "In what direction does the backpropagation data stream cascade?",
        options: [
          "From input layers to the disk files.",
          "From original files to network outputs.",
          "Backward from final loss calculation towards initial parameter gates.",
          "Directly to the database of other projects."
        ],
        correctOption: 2,
        explanation: "It moves backwards, transmitting error gradient outputs from the loss interface recursively into raw initial layers."
      },
      {
        question: "What is an epoch on deep learning pipelines?",
        options: [
          "A CPU generation metric.",
          "One complete loop cycle through the entire available dataset.",
          "The total hours an API key lasts.",
          "A modern styling library."
        ],
        correctOption: 1,
        explanation: "Epoch indicates completion of one full training dataset traversal through forward and backward passes."
      },
      {
        question: "Why are non-linear activation functions used?",
        options: [
          "To make the programming languages more beautiful.",
          "To allow networks to approximate complex mathematical functions beyond simple linear planes.",
          "To protect and secure internal API endpoints.",
          "To speed up text translation limits."
        ],
        correctOption: 1,
        explanation: "Without non-linearity, multiple layers mathematically collapse into a single linear matrix, rendering depth useless."
      }
    ]
  }
];

// Presets list for user to inject transcripts without typing
const PRESET_TOPICS = [
  {
    title: "General Physics: Gravitational Forces",
    text: "Welcome back. Today we delve into classical Newton gravity and General Relativity. Isaac Newton's Universal Law of Gravitation states that any two bodies in the universe attract each other with a force proportional to the product of their masses and inversely proportional to the square of the distance between them. This is expressed with the formula F = G * (m1 * m2) / r². The constant G represents the gravitational constant, which is extremely small, measuring at roughly 6.674 x 10^-11 N m²/kg². Gravity is always attractive, never repulsive. Albert Einstein updated this formulation in 1915 with his General Theory of Relativity, describing gravity not as a direct pulling force, but as an elegant geometric warping of spacetime caused by massive objects. Think of a heavy bowling ball sitting on a flexible rubber trampoline; it creates a bowl-like depression that smaller marbles naturally orbit and slide into. Spacetime curvature dictates our orbits, global satellite delays, and even cosmic black holes."
  },
  {
    title: "Intro to Economics: Supply and Demand Curves",
    text: "Let's begin. Today we examine the basic laws of microeconomics: Supply and Demand. The Law of Demand states that, other factors remaining equal, as the price of a good increases, the consumer quantity demanded falls. Conversely, the Law of Supply holds that as the market price rises, producers will strive to supply more quantity to maximize potential profits. In a free, unmanipulated market, price is determined at the equilibrium intersection where coordinates of supply and demand curves meet. If the supplier sets the price too high, a market surplus occurs, leading to inventory build-ups and eventual price cuts. If prices are kept artificially low, demand balloons and triggers immediate shortages. Shifts in curves can be caused by external determinants such as consumer income changes, technological breakthroughs, raw material costs, or public policy regulations."
  },
  {
    title: "Biology: Photosynthesis Core Processes",
    text: "Class, today we trace how plants convert ambient solar radiation into chemical compounds via Photosynthesis. This biological carbon-fixing process occurs primarily within chloroplasts, leveraging the pigment chlorophyll to trap photons from Sunlight. The chemical reaction is written as 6 carbon dioxide molecules plus 6 water molecules, in the presence of light, yielding 1 glucose molecule and 6 oxygen molecules: 6CO₂ + 6H₂O -> C₆H₁₂O₆ + 6O₂. This is divided into light-dependent reactions where solar energy excites electrons to synthesize ATP and NADPH, and light-independent reactions occurring in the stroma (the Calvin Cycle) where those carriers drive enzymes to bind atmospheric carbon into energy-rich sugars like sucrose."
  }
];

export default function App() {
  // Navigation & Active Lecture Selection
  const [activeTab, setActiveTab] = useState<'dashboard' | 'upload' | 'history' | 'notes' | 'flashcards' | 'quiz' | 'settings'>('dashboard');
  const [selectedLectureId, setSelectedLectureId] = useState<string>("sample-lecture-1");
  const [searchQuery, setSearchQuery] = useState("");

  // DB State matching standard SQLite feel synced locally
  const [lectures, setLectures] = useState<Lecture[]>(() => {
    const cached = localStorage.getItem("lecture_notes_db");
    return cached ? JSON.parse(cached) : INITIAL_LECTURES;
  });

  // Settings State
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const cachedTheme = localStorage.getItem("lecture_theme");
    return (cachedTheme === 'light' || cachedTheme === 'dark') ? cachedTheme : 'dark';
  });

  // Upload/Record processing states
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [customTitle, setCustomTitle] = useState("");
  const [pasteText, setPasteText] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  // Audio Recorder State
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<any>(null);

  // Flashcards state
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Quiz evaluation state
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Sync state & theme HTML class changes
  useEffect(() => {
    localStorage.setItem("lecture_notes_db", JSON.stringify(lectures));
  }, [lectures]);

  useEffect(() => {
    localStorage.setItem("lecture_theme", theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const activeLecture = lectures.find(l => l.id === selectedLectureId) || lectures[0] || null;

  // Search filter
  const filteredLectures = lectures.filter(l =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.transcript.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigation router that handles layout resetting
  const handleNavigate = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setApiError(null);
  };

  const handleSelectLecture = (id: string, tab: typeof activeTab = 'notes') => {
    setSelectedLectureId(id);
    setActiveTab(tab);
    setFlippedCards({});
    setCurrentCardIndex(0);
    setQuizAnswers({});
    setShowQuizResults(false);
    setApiError(null);
  };

  const handleDeleteLecture = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this lecture from your memory database?")) {
      const remaining = lectures.filter(l => l.id !== id);
      setLectures(remaining);
      if (selectedLectureId === id && remaining.length > 0) {
        setSelectedLectureId(remaining[0].id);
      }
    }
  };

  // Convert File to Base64 String Helper
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Strip out metadata header
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Dispatch API generation with full loading bars
  const processDocumentAnalysis = async (payload: { base64Audio?: string, mimeType?: string, fileName?: string, textTranscript?: string }, originType: 'audio' | 'text') => {
    setIsProcessing(true);
    setUploadProgress(10);
    setApiError(null);

    const progressTimer = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 800);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      clearInterval(progressTimer);
      setUploadProgress(95);

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Generation query failed on remote model endpoint.");
      }

      const responseData = await response.json();
      setUploadProgress(100);

      const computedTitle = customTitle.trim() || payload.fileName?.split(".")[0] || `Generated Study Pack (${new Date().toLocaleDateString()})`;

      const newLecture: Lecture = {
        id: "lecture_" + Date.now(),
        title: computedTitle,
        date: new Date().toISOString().split("T")[0],
        duration: originType === 'text' ? "N/A (Text Input)" : "Audio Clip",
        fileSize: originType === 'text' ? `${Math.round((payload.textTranscript?.length || 0) / 1024)} KB` : "Varying Size",
        transcript: responseData.transcript || "No transcript returned.",
        notes: responseData.notes || "No structured notes formulated.",
        summary100: responseData.summary100 || "",
        summary200: responseData.summary200 || "",
        summaryOneLine: responseData.summaryOneLine || "",
        flashcards: responseData.flashcards || [],
        quiz: responseData.quiz || []
      };

      setLectures(prev => [newLecture, ...prev]);
      setSelectedLectureId(newLecture.id);
      setActiveTab('notes');

      // Reset form variables
      setCustomTitle("");
      setPasteText("");
    } catch (err: any) {
      clearInterval(progressTimer);
      setApiError(err.message || "Something went wrong during generation. Be sure your GEMINI_API_KEY is configured inside the cloud Secrets dashboard.");
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  // Handle Drag-and-Drop or direct File upload
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await convertFileToBase64(file);
      await processDocumentAnalysis({
        base64Audio: base64,
        mimeType: file.type || "audio/mpeg",
        fileName: file.name
      }, 'audio');
    } catch (err: any) {
      setApiError("Failed to convert audio file. Ensure the file conforms to standard mime criteria.");
    }
  };

  // Live microphone recording implementation
  const startMicRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      
      const mediaRecorder = new MediaRecorder(stream);
      recorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const localUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(localUrl);

        // Convert recording to Base64 to transmit directly to the Gemini server
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const rawBase64 = (reader.result as string).split(",")[1];
          await processDocumentAnalysis({
            base64Audio: rawBase64,
            mimeType: "audio/webm",
            fileName: `Microphone_Lecture_${Date.now()}`
          }, 'audio');
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordDuration(0);

      recordingTimerRef.current = setInterval(() => {
        setRecordDuration(prev => prev + 1);
      }, 1000);
    } catch (err: any) {
      setApiError("Could not access microphone browser stream. Please verify permissions in the AI Studio metadata frames configuration.");
    }
  };

  const pauseMicRecording = () => {
    if (recorderRef.current && isRecording) {
      if (isPaused) {
        recorderRef.current.resume();
        setIsPaused(false);
        recordingTimerRef.current = setInterval(() => {
          setRecordDuration(prev => prev + 1);
        }, 1000);
      } else {
        recorderRef.current.pause();
        setIsPaused(true);
        if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      }
    }
  };

  const stopMicRecording = () => {
    if (recorderRef.current && isRecording) {
      recorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
      
      // Stop media tracks
      recorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const handleInjectPreset = (presetText: string, presetTitle: string) => {
    setPasteText(presetText);
    setCustomTitle(presetTitle);
  };

  // Flip Flashcard Helper logic
  const handleFlipCard = (index: number) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Submit Answer to MCQ
  const handleSelectQuizOption = (questionIndex: number, optionIndex: number) => {
    if (showQuizResults) return; // frozen after evaluation
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const countCorrectQuizAnswers = () => {
    if (!activeLecture) return 0;
    return activeLecture.quiz.reduce((score, q, index) => {
      return score + (quizAnswers[index] === q.correctOption ? 1 : 0);
    }, 0);
  };

  // Audio Duration Formatter
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <div className="min-h-screen font-sans antialiased text-slate-800 dark:text-slate-100 bg-linear-to-b from-[#f8fafc] to-[#f1f5f9] dark:from-[#0f111a] dark:to-[#05060a] relative overflow-x-hidden">
      
      {/* Background Glowing Auroras (Vibrant Frosted glass accent layer) */}
      <div className="absolute top-0 right-0 left-0 h-[600px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-250px] right-[-100px] w-[600px] h-[600px] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[120px] aurora-1"></div>
        <div className="absolute top-[-100px] left-[-200px] w-[500px] h-[500px] rounded-full bg-teal-500/8 dark:bg-purple-500/4 blur-[130px] aurora-2"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        
        {/* SIDEBAR NAVIGATION PANEL */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white/40 dark:bg-slate-900/40 border-r border-slate-200/50 dark:border-slate-800/40 backdrop-blur-xl p-6 relative">
          
          {/* Logo element with frosted sheen */}
          <div className="flex items-center gap-2.5 font-bold text-lg text-indigo-900 dark:text-white mt-2 pb-6 border-b border-slate-200/40 dark:border-slate-800/40">
            <span className="p-2 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-indigo-600/20">
              🎙️
            </span>
            <div className="flex flex-col">
              <span className="leading-tight font-extrabold tracking-tight">Lecture Voice</span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold tracking-wider uppercase">to Notes</span>
            </div>
          </div>

          <nav className="mt-6 space-y-1.5 flex-1">
            <button
              onClick={() => handleNavigate('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <BookOpen className="h-4.5 w-4.5" />
              Overview Dashboard
            </button>

            <button
              onClick={() => handleNavigate('upload')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'upload'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <PlusCircle className="h-4.5 w-4.5" />
              Analyze Lecture
            </button>

            <button
              onClick={() => handleNavigate('history')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition cursor-pointer ${
                activeTab === 'history'
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Bookmark className="h-4.5 w-4.5" />
              Lectures History ({lectures.length})
            </button>

            <div className="pt-4 pb-2 text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-600 px-4">
              Study Pack Tools
            </div>

            <button
              disabled={!activeLecture}
              onClick={() => handleNavigate('notes')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition disabled:opacity-55 disabled:cursor-not-allowed ${
                activeTab === 'notes'
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <FileText className="h-4.5 w-4.5" />
              Lecture Notes
            </button>

            <button
              disabled={!activeLecture}
              onClick={() => handleNavigate('flashcards')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition disabled:opacity-55 disabled:cursor-not-allowed ${
                activeTab === 'flashcards'
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <Layers className="h-4.5 w-4.5" />
              Flashcards
            </button>

            <button
              disabled={!activeLecture}
              onClick={() => handleNavigate('quiz')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition disabled:opacity-55 disabled:cursor-not-allowed ${
                activeTab === 'quiz'
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <HelpCircle className="h-4.5 w-4.5" />
              Interactive Quiz
            </button>

            <button
              onClick={() => handleNavigate('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition mt-auto ${
                activeTab === 'settings'
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100/60 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100"
              }`}
            >
              <SettingsIcon className="h-4.5 w-4.5" />
              Settings Setup
            </button>
          </nav>

          {/* Current selected document indicator */}
          {activeLecture && (
            <div className="mt-8 p-3.5 rounded-xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-700/30 text-xs">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold mb-1">Active Lecture</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 block truncate" title={activeLecture.title}>
                {activeLecture.title}
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">{activeLecture.date}</span>
            </div>
          )}
        </aside>

        {/* MAIN APPLICATION CONTAINER BODY */}
        <main className="flex-1 flex flex-col min-w-0 max-h-screen overflow-y-auto">
          
          {/* Top header status bar */}
          <header className="sticky top-0 z-40 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/40 flex items-center justify-between px-6 py-4">
            
            {/* Mobile Title Logo representation */}
            <div className="flex items-center gap-2 md:hidden">
              <span className="text-xl">🎙️</span>
              <span className="font-extrabold text-sm tracking-tight text-slate-800 dark:text-slate-100">LectureVoice</span>
            </div>

            {/* Title / Tab indicators */}
            <div className="hidden md:flex flex-col">
              <h2 className="text-sm font-bold text-slate-440 dark:text-slate-500 uppercase tracking-widest leading-none">
                {activeTab === 'dashboard' ? "Main Dashboard" : activeTab.toUpperCase()}
              </h2>
              {activeLecture && activeTab !== 'dashboard' && activeTab !== 'upload' && activeTab !== 'settings' && (
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 flex items-center gap-1.5">
                  <Bookmark className="h-3 w-3 shrink-0" /> Working on: <strong className="font-bold">{activeLecture.title}</strong>
                </span>
              )}
            </div>

            {/* Quick action shortcuts */}
            <div className="flex items-center gap-3">
              {/* Quick Preset helper tag to capture user eyes */}
              <div className="hidden lg:flex items-center gap-1.5 text-xs bg-indigo-50 dark:bg-indigo-950/20 px-3 py-1.5 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold">
                <Sparkles className="h-3.5 w-3.5 text-yellow-500 animate-pulse" />
                <span>Quick Preset transcripts loaded below</span>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50 transition cursor-pointer"
                title="Toggle visual mode"
              >
                {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
              </button>

              {/* Mobile Sidebar Trigger/Drawer equivalents (Simple inline grid navigators) */}
              <div className="md:hidden flex items-center gap-1">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as any)}
                  className="bg-slate-100 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs font-semibold rounded-xl px-2.5 py-1.5 text-slate-800 dark:text-slate-200 outline-none"
                >
                  <option value="dashboard">🏠 Dashboard</option>
                  <option value="upload">📁 New Lecture</option>
                  <option value="history">📚 History</option>
                  <option value="notes">📄 Lecture Notes</option>
                  <option value="flashcards">🗂️ Flashcards</option>
                  <option value="quiz">📝 Practice Quiz</option>
                  <option value="settings">⚙️ Settings</option>
                </select>
              </div>
            </div>
          </header>

          {/* ACTIVE CONTENT GRID DISPLAY AREA */}
          <div className="flex-1 p-6 max-w-5xl w-full mx-auto space-y-6">

            {/* API Warning/Status block */}
            {apiError && (
              <div className="glass-card p-4 rounded-2xl border border-rose-200 dark:border-rose-950/40 bg-rose-500/5 dark:bg-rose-500/10 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-rose-800 dark:text-rose-400 text-sm">AI Pipeline Notice</h4>
                  <p className="text-xs text-rose-700/80 dark:text-rose-400/80 leading-relaxed">
                    {apiError}
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleNavigate('settings')}
                      className="text-xs font-bold text-rose-800 dark:text-rose-300 hover:underline inline-flex items-center gap-1"
                    >
                      Configure GEMINI_API_KEY inside secrets panel <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Global API / Processing Loading bar */}
            {isProcessing && (
              <div className="glass-card p-6 rounded-2xl border border-indigo-200/50 dark:border-indigo-900/30 bg-indigo-50/10 text-center space-y-4">
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-300 shimmer"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <RefreshCw className="h-5 w-5 text-indigo-500 animate-spin" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Gemini model 'gemini-3.5-flash' conducting audit... ({uploadProgress}%)
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  This requires around 10-15 seconds to listen directly to the speech wave, transcribe, write core structured Markdown notes, compile summarized bullet items, program 8 study cards, and structure 10 distinct MCQs. Please keep this tab active.
                </p>
              </div>
            )}

            {/* SIDEBAR VIEWS SWITCHING LOGIC */}

            {/* VIEW A: DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <DashboardView
                lectures={lectures}
                onNavigate={handleNavigate}
                onSelectLecture={handleSelectLecture}
              />
            )}

            {/* VIEW B: UPLOAD AUDIO & TEXT FOR ANALYSIS (Primary app gateway) */}
            {activeTab === 'upload' && (
              <div className="space-y-8">
                <div className="text-left space-y-2">
                  <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                    Analyze New Lecture Materials
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Capture live voice streams, upload files from device, or paste continuous text outputs.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* LEFT: File Upload & Title Settings */}
                  <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/50 space-y-4">
                      <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Sliders className="h-4 w-4 text-indigo-500" />
                        1. Choose Lecture Title (Optional)
                      </h3>
                      <div>
                        <input
                          type="text"
                          value={customTitle}
                          onChange={(e) => setCustomTitle(e.target.value)}
                          placeholder="e.g. Mechanical Engineering: Fluid Dynamics"
                          className="w-full bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none placeholder:text-slate-400"
                        />
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 block leading-relaxed">
                          Leaving this empty will default to the filename or current date/time pattern automatically.
                        </span>
                      </div>
                    </div>

                    <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/10 space-y-4">
                      <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Upload className="h-4 w-4 text-indigo-500" />
                        2. Upload Recorded Audio
                      </h3>
                      
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/30 rounded-2xl p-8 text-center transition relative cursor-pointer group">
                        <input
                          type="file"
                          accept=".mp3,.wav,.m4a"
                          onChange={handleAudioUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <FileText className="h-10 w-10 text-slate-400 dark:text-slate-600 mx-auto mb-3 group-hover:scale-110 transition duration-300" />
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Drag & drop or Click to browse</p>
                        <p className="text-xs text-slate-400 mt-1">Accepts standard MP3, WAV, or M4A audio clips</p>
                      </div>
                    </div>

                    {/* Live microphone recording widget */}
                    <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/10 space-y-4">
                      <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                        <Mic className="h-4 w-4 text-rose-500" />
                        3. Fast Live Voice Recording
                      </h3>

                      <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-800/40 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {isRecording ? "Capturing microphone..." : "Microphone idle"}
                          </span>
                          {recordDuration > 0 && (
                            <span className="text-xs font-mono font-bold text-rose-500 block">
                              Duration: {formatTime(recordDuration)}
                            </span>
                          )}
                        </div>

                        {/* Waveform indicator bars during active stream */}
                        {isRecording && !isPaused && (
                          <div className="h-10 flex items-center justify-center gap-0.5 bg-rose-500/5 rounded-xl border border-rose-500/10">
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                            <span className="wave-bar"></span>
                          </div>
                        )}

                        <div className="flex gap-2">
                          {!isRecording ? (
                            <button
                              onClick={startMicRecording}
                              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition cursor-pointer"
                            >
                              <Mic className="h-4 w-4" /> Start Recording
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={pauseMicRecording}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition cursor-pointer"
                              >
                                <Pause className="h-4 w-4" /> {isPaused ? "Resume" : "Pause"}
                              </button>
                              <button
                                onClick={stopMicRecording}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-650 hover:bg-red-600 text-white font-semibold text-xs transition cursor-pointer"
                              >
                                <Square className="h-4 w-4" /> Finish & Submit
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Text transcript paste fallback & presets */}
                  <div className="space-y-6">
                    <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/10 flex flex-col h-full space-y-4">
                      
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <FileText className="h-4.5 w-4.5 text-indigo-500" />
                          4. Paste Text / Transcript Direct
                        </h3>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold uppercase">
                          No Key Needed for presets
                        </span>
                      </div>

                      <textarea
                        value={pasteText}
                        onChange={(e) => setPasteText(e.target.value)}
                        placeholder="Paste random lecture transcription text, notes snippets, or online articles to formulate standard quiz cards..."
                        className="w-full flex-1 min-h-[160px] max-h-[300px] bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none leading-relaxed text-slate-800 dark:text-slate-200"
                      ></textarea>

                      {/* Presets shortcut buttons to easily show product features */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Fast-track Preset templates</span>
                        <div className="grid grid-cols-1 gap-2">
                          {PRESET_TOPICS.map((p, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleInjectPreset(p.text, p.title)}
                              className="w-full text-left p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/20 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border border-slate-200/40 dark:border-slate-700/20 transition-all text-xs truncate cursor-pointer flex items-center gap-2"
                            >
                              <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
                              <div className="truncate">
                                <span className="font-bold text-slate-700 dark:text-indigo-300 block truncate">{p.title}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => processDocumentAnalysis({ textTranscript: pasteText }, 'text')}
                        disabled={!pasteText.trim() || isProcessing}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition shadow-lg shadow-indigo-600/10 cursor-pointer"
                      >
                        <Sparkles className="h-4 w-4" /> Formulate Study Materials
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* VIEW C: FULL MEMORY LECTURE DATABASE HISTORY LIST */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                      Lectures History Memory Database
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Search, view metrics, and manage previous processed materials.
                    </p>
                  </div>
                  
                  {/* Search input field */}
                  <div className="relative w-full sm:w-72 shrink-0">
                    <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search general keywords..."
                      className="w-full bg-slate-100/60 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-300 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>

                {filteredLectures.length === 0 ? (
                  <div className="glass-card rounded-2xl p-12 text-center border border-slate-200/50 dark:border-slate-800/10">
                    <BookOpen className="h-12 w-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">No matching items resolved</h3>
                    <p className="text-xs text-slate-400 mt-1">Try varying your query coordinates or formulate a new document package.</p>
                    <button
                      onClick={() => handleNavigate('upload')}
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-500 transition cursor-pointer"
                    >
                      Process materials now
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredLectures.map((lec) => {
                      const isCurrent = lec.id === selectedLectureId;
                      return (
                        <div
                          key={lec.id}
                          onClick={() => handleSelectLecture(lec.id, 'notes')}
                          className={`glass-card rounded-2xl p-5 border cursor-pointer transition-all ${
                            isCurrent
                              ? "border-indigo-500 bg-indigo-500/[0.04] ring-2 ring-indigo-500/10"
                              : "border-slate-200/50 dark:border-slate-800/60 hover:border-slate-400"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold uppercase tracking-wider">
                              {lec.id === "sample-lecture-1" || lec.id === "sample-lecture-2" ? "Ready Sample" : "User File"}
                            </span>
                            <button
                              onClick={(e) => handleDeleteLecture(lec.id, e)}
                              className="p-1 rounded-sm text-slate-400 hover:text-red-500 transition-colors"
                              title="Delete from database"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <h3 className="font-bold text-slate-850 dark:text-slate-100 text-sm md:text-base mt-2.5 line-clamp-1">
                            {lec.title}
                          </h3>

                          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500 leading-relaxed line-clamp-2">
                            {lec.summaryOneLine || lec.transcript}
                          </p>

                          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {lec.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {lec.duration}
                            </span>
                            <span>{lec.fileSize}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* IF NO ACTIVE LECTURE SELECTED ALERT (Safety Fallback) */}
            {!activeLecture && (
              <div className="glass-card p-8 rounded-2xl text-center">
                <AlertCircle className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-500">Please upload a lecture or select a sample preset from the database history first.</p>
                <div className="mt-4 flex justify-center gap-3">
                  <button onClick={() => handleNavigate('upload')} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white rounded-xl cursor-pointer">
                    Create Applet
                  </button>
                  <button onClick={() => handleSelectLecture("sample-lecture-1", "notes")} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 rounded-xl cursor-pointer">
                    Launch Sample Q&A
                  </button>
                </div>
              </div>
            )}

            {/* ACTIVE LECTURE VIEWS */}
            {activeLecture && (
              <>

                {/* VIEW D: LECTURE NOTES & STRUCTURAL SUMMARIES VIEW */}
                {activeTab === 'notes' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    
                    {/* LEFT PANEL: Fully Structured Markdown Study Notes */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/40 space-y-6">
                        
                        {/* Title block with actions */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200/40 dark:border-slate-800/40">
                          <div>
                            <h2 className="text-lg md:text-xl font-extrabold text-slate-850 dark:text-white">
                              📜 Smart Lecture Notes
                            </h2>
                            <span className="text-xs text-slate-400 block mt-1">Written dynamically by Gemini in structural clear format</span>
                          </div>

                          {/* Downloads layout block */}
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => exportToPdf(activeLecture)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/10 cursor-pointer"
                              title="Export crisp print layout PDF"
                            >
                              <Download className="h-3.5 w-3.5" /> PDF
                            </button>
                            <button
                              onClick={() => exportToDocx(activeLecture)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
                              title="Download MS Word compatible file"
                            >
                              Word CJS
                            </button>
                            <button
                              onClick={() => exportToTxt(activeLecture)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/50 dark:hover:bg-slate-700/50 text-slate-600 dark:text-slate-400 font-bold text-xs cursor-pointer"
                              title="Download layout as text"
                            >
                              TXT
                            </button>
                          </div>
                        </div>

                        {/* Custom render representation for Markdown structured tags */}
                        <div className="prose prose-slate dark:prose-invert max-w-none text-sm md:text-base leading-relaxed space-y-4">
                          {activeLecture.notes.split("\n").map((line, idx) => {
                            const cleanLine = line.trim();
                            if (cleanLine.startsWith("## ")) {
                              return <h2 key={idx} className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mt-6 pt-3 pb-1.5 border-b border-indigo-100/30 dark:border-indigo-950/20">{cleanLine.replace("## ", "")}</h2>;
                            }
                            if (cleanLine.startsWith("### ")) {
                              return <h3 key={idx} className="text-base font-bold text-slate-800 dark:text-slate-200 mt-4">{cleanLine.replace("### ", "")}</h3>;
                            }
                            if (cleanLine.startsWith("* ") || cleanLine.startsWith("- ")) {
                              return (
                                <li key={idx} className="ml-5 list-disc text-slate-600 dark:text-slate-300 py-0.5">
                                  {cleanLine.substring(2)}
                                </li>
                              );
                            }
                            if (cleanLine.startsWith("> ")) {
                              return (
                                <blockquote key={idx} className="p-4 bg-indigo-50/50 dark:bg-indigo-950/10 border-l-4 border-indigo-500 rounded-r-xl italic my-2 text-indigo-900/80 dark:text-slate-300">
                                  {cleanLine.replace("> ", "")}
                                </blockquote>
                              );
                            }
                            if (cleanLine === "") return <div key={idx} className="h-2"></div>;
                            
                            return <p key={idx} className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-sm">{line}</p>;
                          })}
                        </div>

                      </div>
                    </div>

                    {/* RIGHT PANEL: Executive summaries outputs & transcript lookup */}
                    <div className="space-y-6">
                      
                      {/* One line summary tag box */}
                      <div className="glass-card rounded-2xl p-5 border border-indigo-100/50 dark:border-indigo-950/20 bg-indigo-500/[0.02]">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1">Lecture One-Liner Takeaway</span>
                        <p className="text-sm font-semibold italic text-slate-800 dark:text-indigo-200">
                          "{activeLecture.summaryOneLine}"
                        </p>
                      </div>

                      {/* Summaries switch board */}
                      <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/10 space-y-4">
                        <div className="flex items-center gap-2 pb-3 border-b border-slate-200/30 dark:border-slate-800/30">
                          <Volume2 className="h-4.5 w-4.5 text-indigo-500" />
                          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">AI Synopses Scales</h3>
                        </div>

                        <div className="space-y-4 text-xs md:text-sm">
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase block">100-Word Summary</span>
                            <div className="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                              {activeLecture.summary100}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase block">200-Word Summary</span>
                            <div className="p-3 rounded-xl bg-slate-100/50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                              {activeLecture.summary200}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Raw Verified transcript disclosure widget */}
                      <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/10 space-y-3">
                        <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 uppercase tracking-wider">Verbatim Audio Audio Stream Transcript</h4>
                        <div className="p-3.5 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-h-[180px] overflow-y-auto font-mono scrollbar-thin">
                          {activeLecture.transcript}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* VIEW E: FLASHCARD GENERATOR WITH 3D FLIP ANIMATIONS */}
                {activeTab === 'flashcards' && (
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center space-y-2">
                      <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
                        Interactive Flashcards
                      </h1>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Test memory speed and lock down definitions. Click cards to flip.
                      </p>
                    </div>

                    {activeLecture.flashcards.length === 0 ? (
                      <div className="glass-card p-8 rounded-xl text-center">
                        <p className="text-sm font-medium text-slate-500">No generated cards exist for this lecture code.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        
                        {/* Progress tracker bar */}
                        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
                          <span>Card {currentCardIndex + 1} of {activeLecture.flashcards.length}</span>
                          <span>{Math.round(((currentCardIndex + 1) / activeLecture.flashcards.length) * 100)}% Complete</span>
                        </div>

                        {/* Interactive 3D CSS Card structure */}
                        <div
                          onClick={() => handleFlipCard(currentCardIndex)}
                          className="h-80 w-full cursor-pointer perspective-1000 select-none group"
                        >
                          <div
                            className={`relative w-full h-full duration-500 transform-style preserve-3d transition-all ${
                              flippedCards[currentCardIndex] ? "rotate-y-180" : ""
                            }`}
                          >
                            {/* FRONT OF CARD (Question) */}
                            <div className="absolute inset-0 w-full h-full rounded-3xl p-8 flex flex-col justify-between backface-hidden glass-card border-2 border-indigo-400 bg-white dark:bg-slate-900 text-center shadow-lg">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400">Question Front</span>
                              <div className="flex items-center justify-center flex-1 my-4">
                                <p className="text-base sm:text-lg font-extrabold text-slate-800 dark:text-slate-100 leading-normal px-2">
                                  {activeLecture.flashcards[currentCardIndex].question}
                                </p>
                              </div>
                              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold animate-pulse">
                                Click anywhere to Flip for Answer
                              </span>
                            </div>

                            {/* BACK OF CARD (Answer) */}
                            <div className="absolute inset-0 w-full h-full rounded-3xl p-8 flex flex-col justify-between backface-hidden rotate-y-180 glass-card border-2 border-emerald-400 dark:border-emerald-600 bg-linear-to-b from-emerald-500/5 to-transparent dark:bg-slate-900 text-center shadow-lg">
                              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-600 dark:text-emerald-400">Answer Back</span>
                              <div className="flex items-center justify-center flex-1 my-4">
                                <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-700 dark:text-slate-250 px-2">
                                  {activeLecture.flashcards[currentCardIndex].answer}
                                </p>
                              </div>
                              <span className="text-[10px] text-emerald-500 font-bold">
                                Correctly Answered? Use arrows to proceed.
                              </span>
                            </div>

                          </div>
                        </div>

                        {/* Controls Panel */}
                        <div className="flex items-center justify-between">
                          <button
                            disabled={currentCardIndex === 0}
                            onClick={() => {
                              setCurrentCardIndex(prev => prev - 1);
                              setFlippedCards({});
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-300 font-bold transition disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Previous Card
                          </button>

                          {/* Quick export helper */}
                          <button
                            onClick={() => exportToPdf(activeLecture)}
                            className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                          >
                            <Download className="h-4 w-4" /> Export Study Package PDF
                          </button>

                          <button
                            disabled={currentCardIndex === activeLecture.flashcards.length - 1}
                            onClick={() => {
                              setCurrentCardIndex(prev => prev + 1);
                              setFlippedCards({});
                            }}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-bold transition disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
                          >
                            Next Card <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>

                      </div>
                    )}
                  </div>
                )}

                {/* VIEW F: QUIZ ASSESSMENT GRADED PLATFORM */}
                {activeTab === 'quiz' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200/40 dark:border-slate-800/40 pb-5 gap-4">
                      <div>
                        <h1 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                          Knowledge Assessment Quiz (10 MCQs)
                        </h1>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Solve questions to evaluate comprehension and reinforce knowledge maps.
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            setQuizAnswers({});
                            setShowQuizResults(false);
                          }}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-xl leading-none transition duration-150 cursor-pointer"
                        >
                          Reset Quiz Answers
                        </button>
                      </div>
                    </div>

                    {activeLecture.quiz.length === 0 ? (
                      <div className="glass-card p-8 rounded-xl text-center">
                        <p className="text-sm font-medium text-slate-500">No quiz questions formatted yet for this lecture sequence.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        
                        {/* Standard numbered questions catalog */}
                        {activeLecture.quiz.map((q, qIdx) => {
                          const chosenIdx = quizAnswers[qIdx];
                          const isCorrect = chosenIdx === q.correctOption;

                          return (
                            <div
                              key={qIdx}
                              className={`glass-card rounded-2xl p-5 md:p-6 border transition-all ${
                                showQuizResults
                                  ? isCorrect
                                    ? "border-emerald-500/50 dark:border-emerald-500/30 bg-emerald-500/[0.02]"
                                    : "border-rose-500/40 dark:border-rose-500/15 bg-rose-500/[0.01]"
                                  : "border-slate-200/50 dark:border-slate-800/10 hover:border-slate-300"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest block mb-2">
                                  MCQ Question {qIdx + 1}
                                </span>
                                {showQuizResults && (
                                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                                  }`}>
                                    {isCorrect ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                                    {isCorrect ? "Correct" : "Incorrect"}
                                  </span>
                                )}
                              </div>

                              <p className="font-bold text-slate-800 dark:text-slate-100 text-sm md:text-base leading-relaxed mb-4">
                                {q.question}
                              </p>

                              {/* MCQ Option selector cards */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                {q.options.map((opt, optIdx) => {
                                  const letterLabel = String.fromCharCode(65 + optIdx);
                                  const isSelected = chosenIdx === optIdx;
                                  const showAsCorrect = showQuizResults && optIdx === q.correctOption;
                                  const showAsWrongSelection = showQuizResults && isSelected && !isCorrect;

                                  let optionClass = "bg-slate-100/50 dark:bg-slate-900/30 border-slate-250 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800";
                                  if (isSelected && !showQuizResults) {
                                    optionClass = "bg-indigo-600 text-white border-indigo-600";
                                  } else if (showAsCorrect) {
                                    optionClass = "bg-emerald-500/15 text-emerald-900 dark:text-emerald-300 border-emerald-500/50";
                                  } else if (showAsWrongSelection) {
                                    optionClass = "bg-rose-500/10 text-rose-900 dark:text-rose-400 border-rose-500/40";
                                  }

                                  return (
                                    <button
                                      key={optIdx}
                                      onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                                      className={`w-full text-left p-3 rounded-xl border text-xs font-semibold flex items-start gap-2.5 transition duration-150 cursor-pointer ${optionClass}`}
                                    >
                                      <span className={`px-2 py-0.5 rounded-xs font-bold shrink-0 ${
                                        isSelected && !showQuizResults
                                          ? "bg-white text-indigo-700"
                                          : showAsCorrect
                                            ? "bg-emerald-500 text-white"
                                            : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                      }`}>
                                        {letterLabel}
                                      </span>
                                      <span className="flex-1">{opt}</span>
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Detailed scientific explanation disclosure */}
                              {showQuizResults && (
                                <div className="mt-4 p-3 bg-slate-100/50 dark:bg-slate-900/40 rounded-xl text-xs text-slate-500 dark:text-slate-400 leading-relaxed border-l-2 border-slate-400">
                                  <strong>Concept Check:</strong> {q.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Result Scoreboard summary card */}
                        {showQuizResults ? (
                          <div className="glass-card p-6 rounded-2xl border-2 border-indigo-500 bg-indigo-500/[0.02]/30 text-center space-y-4">
                            <span className="inline-block p-3 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 mb-1">
                              <HelpCircle className="h-6 w-6" />
                            </span>
                            <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">Quiz Evaluation Completed</h3>
                            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                              Your overall score: <strong className="text-indigo-600 dark:text-indigo-400 text-lg font-extrabold">{countCorrectQuizAnswers()} / {activeLecture.quiz.length}</strong> Correct Answers! (or {Math.round((countCorrectQuizAnswers() / activeLecture.quiz.length) * 100)}%)
                            </p>
                            <p className="text-xs text-slate-400">
                              Use dynamic reports or export to PDF to review other lectures recursively. Keep reviewing flashcards to lock down weak coordinates.
                            </p>
                            <div className="pt-2 flex justify-center gap-3">
                              <button
                                onClick={() => {
                                  setQuizAnswers({});
                                  setShowQuizResults(false);
                                }}
                                className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-all cursor-pointer"
                              >
                                Retake Quiz
                              </button>
                              <button
                                onClick={() => exportToPdf(activeLecture)}
                                className="px-5 py-[11px] rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all cursor-pointer"
                              >
                                Export Complete Study Pack
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="pt-4 text-center">
                            <button
                              onClick={() => setShowQuizResults(true)}
                              className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/15 cursor-pointer"
                            >
                              Check Answers & Reveal Score
                            </button>
                          </div>
                        )}

                      </div>
                    )}
                  </div>
                )}

                {/* VIEW G: SETTINGS SETUP CONFIG */}
                {activeTab === 'settings' && (
                  <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-800/10 space-y-6">
                    <div className="pb-5 border-b border-slate-200/30 dark:border-slate-800/30">
                      <h2 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
                        <Sliders className="h-5 w-5 text-indigo-500" />
                        AI Pipeline & Project Settings
                      </h2>
                      <p className="text-xs text-slate-400 block mt-1">Configure models environment variables, secrets context parameters and client themes.</p>
                    </div>

                    <div className="space-y-6">
                      
                      {/* Active theme indicators */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Visual Styling Environment Theme</label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setTheme('light')}
                            className={`p-4 rounded-xl border text-center font-bold text-xs flex flex-col items-center justify-center gap-2 cursor-pointer ${
                              theme === 'light'
                                ? "border-indigo-500 bg-indigo-500/5 text-indigo-600"
                                : "border-slate-200 dark:border-slate-800 bg-slate-500/5"
                            }`}
                          >
                            <Sun className="h-5 w-5 text-amber-500" />
                            <span>Elegant Light Theme</span>
                          </button>

                          <button
                            onClick={() => setTheme('dark')}
                            className={`p-4 rounded-xl border text-center font-bold text-xs flex flex-col items-center justify-center gap-2 cursor-pointer ${
                              theme === 'dark'
                                ? "border-indigo-500 bg-indigo-500/5 text-indigo-300"
                                : "border-slate-200 dark:border-slate-800 bg-slate-500/5"
                            }`}
                          >
                            <Moon className="h-5 w-5 text-indigo-400" />
                            <span>Frosted Dark Theme</span>
                          </button>
                        </div>
                      </div>

                      {/* API verification card */}
                      <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/45 border border-slate-200/40 dark:border-slate-800/40 space-y-3">
                        <h3 className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                          Security Key Verification Status
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          The Gemini Model uses your standard secure <strong className="text-indigo-600 dark:text-indigo-400">GEMINI_API_KEY</strong> configured from your personal AI Studio Secrets panel. This remains cached and executed purely server-side.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400">
                            Automatic Server-Side OAuth Active
                          </span>
                          <span className="text-[11px] text-slate-400">
                            Model identifier: <code className="font-mono bg-slate-100 dark:bg-slate-850 px-1.5 py-0.5 rounded text-xs">gemini-3.5-flash</code>
                          </span>
                        </div>
                      </div>

                      {/* Reset initial databases */}
                      <div className="pt-4 border-t border-slate-200/40 dark:border-slate-800/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200">Reset Local Lectures SQLite Cache</h4>
                          <p className="text-xs text-slate-400">Wipes custom logs and rolls back to pristine academic physics templates.</p>
                        </div>
                        <button
                          onClick={() => {
                            if (confirm("Are you sure you want to clear your local memory state and return to default lecture packs?")) {
                              localStorage.removeItem("lecture_notes_db");
                              setLectures(INITIAL_LECTURES);
                              setSelectedLectureId("sample-lecture-1");
                              setActiveTab('dashboard');
                              alert("Local state databases reset to academic physics models successfully.");
                            }
                          }}
                          className="px-4 py-2 bg-red-650 hover:bg-red-600 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm"
                        >
                          Wipe & Restore Defaults
                        </button>
                      </div>

                    </div>
                  </div>
                )}

              </>
            )}

          </div>

          {/* Simple subtle footer */}
          <footer className="mt-auto py-5 border-t border-slate-200/30 dark:border-slate-800/30 text-center text-[11px] text-slate-400">
            Lecture Voice-to-Notes Student study system. Designed with Frosted Glass. Serves at Port 3000.
          </footer>
        </main>

      </div>
    </div>
  );
}
