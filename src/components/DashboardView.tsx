import { Lecture } from "../types";
import { BookOpen, HelpCircle, Layers, FileText, PlusCircle, Sparkles, Clock, Calendar } from "lucide-react";
import { motion } from "motion/react";

interface DashboardViewProps {
  lectures: Lecture[];
  onNavigate: (tab: 'dashboard' | 'upload' | 'history' | 'notes' | 'flashcards' | 'quiz' | 'settings') => void;
  onSelectLecture: (id: string, tab?: 'notes' | 'flashcards' | 'quiz') => void;
}

export default function DashboardView({ lectures, onNavigate, onSelectLecture }: DashboardViewProps) {
  // Stats Calculators
  const totalLectures = lectures.length;
  const totalNotes = lectures.filter(l => l.notes).length;
  const totalFlashcards = lectures.reduce((acc, curr) => acc + (curr.flashcards?.length || 0), 0);
  const totalQuizQuestions = lectures.reduce((acc, curr) => acc + (curr.quiz?.length || 0), 0);

  // Latest 3 Lectures
  const recentLectures = [...lectures]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const stats = [
    { id: "stat-lectures", label: "Total Lectures", value: totalLectures, icon: BookOpen, color: "from-blue-500 to-indigo-500 text-blue-500" },
    { id: "stat-notes", label: "Smart Study Notes", value: totalNotes, icon: FileText, color: "from-teal-500 to-emerald-500 text-teal-500" },
    { id: "stat-flashcards", label: "Active Flashcards", value: totalFlashcards, icon: Layers, color: "from-purple-500 to-pink-500 text-purple-500" },
    { id: "stat-quizzes", label: "MCQs Generated", value: totalQuizQuestions, icon: HelpCircle, color: "from-amber-500 to-orange-500 text-amber-500" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-900 via-blue-900 to-slate-900 p-8 text-white shadow-xl md:p-10">
        <div className="absolute right-0 bottom-0 left-0 top-0 opacity-15">
          <div className="absolute -right-16 -top-16 h-80 w-80 rounded-full bg-indigo-400 blur-3xl aurora-1"></div>
          <div className="absolute -left-16 -bottom-16 h-80 w-80 rounded-full bg-teal-400 blur-3xl aurora-2"></div>
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-medium backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>AI Study Pack Co-Pilot Active</span>
            </div>
          </motion.div>
          
          <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl text-white">
            Lecture Voice-to-Notes Generator
          </h1>
          <p className="mt-3 text-base text-indigo-100/80 leading-relaxed">
            Transform high-velocity classroom lectures into elegant structured study packs, summaries, flashcards, and practice quizzes in seconds.
          </p>
          
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate("upload")}
              className="inline-flex items-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-950 transition-all hover:bg-indigo-50 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-black/10 cursor-pointer"
            >
              <PlusCircle className="h-4 w-4" />
              Analyze New Lecture
            </button>
            <button
              onClick={() => onNavigate("settings")}
              className="inline-flex items-center gap-2.5 rounded-xl bg-white/10 border border-white/15 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15 active:scale-[0.98] backdrop-blur-sm cursor-pointer"
            >
              Configure Settings
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between transition-all hover:scale-[1.01] hover:shadow-md"
            >
              <div>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
                  {stat.label}
                </span>
                <span className="text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                  {stat.value}
                </span>
              </div>
              <div className={`p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/40 text-slate-600 dark:text-slate-400`}>
                <Icon className="h-6 w-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Activity Area */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Lectures */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Recent Lecture Materials
            </h2>
            <button
              onClick={() => onNavigate("history")}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              View Full History ({lectures.length})
            </button>
          </div>

          <div className="space-y-3.5">
            {recentLectures.length === 0 ? (
              <div className="glass-card rounded-2xl p-8 text-center border border-slate-100 dark:border-slate-800">
                <FileText className="h-10 w-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No lecture files processed yet.</p>
                <button
                  onClick={() => onNavigate("upload")}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <PlusCircle className="h-3.5 w-3.5" /> Start by uploading audio
                </button>
              </div>
            ) : (
              recentLectures.map((lec) => (
                <div
                  key={lec.id}
                  className="glass-card rounded-2xl p-5 border border-slate-100 dark:border-slate-800/60 transition-all hover:border-indigo-200 dark:hover:border-indigo-950 flex flex-col md:flex-row justify-between md:items-center gap-4"
                >
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-sm md:text-base text-slate-800 dark:text-slate-100 line-clamp-1">
                      {lec.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 dark:text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {lec.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {lec.duration}
                      </span>
                      <span>{lec.fileSize}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2 md:pt-0 border-t border-slate-100 dark:border-slate-800/60 md:border-none">
                    <button
                      onClick={() => onSelectLecture(lec.id, "notes")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition cursor-pointer"
                    >
                      <FileText className="h-3.5 w-3.5" /> Notes
                    </button>
                    <button
                      onClick={() => onSelectLecture(lec.id, "flashcards")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/40 px-3 py-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition cursor-pointer"
                    >
                      <Layers className="h-3.5 w-3.5" /> Cards
                    </button>
                    <button
                      onClick={() => onSelectLecture(lec.id, "quiz")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 px-3 py-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/40 transition cursor-pointer"
                    >
                      <HelpCircle className="h-3.5 w-3.5" /> Quiz
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Study Dashboard Sidebar */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Study Quick Guide
          </h2>
          <div className="glass-card rounded-2xl p-5 border border-slate-100 dark:border-slate-800 space-y-4 text-xs md:text-sm text-slate-500 dark:text-slate-400">
            <div className="flex gap-3">
              <div className="h-7 w-7 rounded-sm bg-blue-100 dark:bg-blue-950 flex items-center justify-center text-blue-600 shrink-0 text-xs font-bold leading-none">
                1
              </div>
              <div>
                <h4 className="font-bold text-slate-700 dark:text-slate-300">Fast Audio Capture</h4>
                <p className="mt-1 leading-relaxed">Directly upload MP3/WAV files or use your live microphone to capture the speaker's voice stream.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-7 w-7 rounded-sm bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 shrink-0 text-xs font-bold leading-none">
                2
              </div>
              <div>
                <h4 className="font-bold text-slate-700 dark:text-slate-300">Generate Key Items</h4>
                <p className="mt-1 leading-relaxed">Our unified AI pipeline turns transcripts into complete notes, executive summaries, flip cards, and interactive quizzes.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="h-7 w-7 rounded-sm bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-600 shrink-0 text-xs font-bold leading-none">
                3
              </div>
              <div>
                <h4 className="font-bold text-slate-700 dark:text-slate-300">Export Anywhere</h4>
                <p className="mt-1 leading-relaxed">Easily back up lectures to standard PDF prints, download simple TXT files, or import elegant DOCX files to MS Word.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
