export interface Flashcard {
  question: string;
  answer: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface Lecture {
  id: string;
  title: string;
  date: string;
  duration: string;
  fileSize: string;
  transcript: string;
  notes: string;
  summary100: string;
  summary200: string;
  summaryOneLine: string;
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export interface Settings {
  theme: 'light' | 'dark';
  geminiModel: string;
}
