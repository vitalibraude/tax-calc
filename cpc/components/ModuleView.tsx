import React from 'react';
import { ArrowLeft, CheckCircle2, Circle, GraduationCap, ChevronRight } from 'lucide-react';
import { CpcModule } from '../types';

interface Props {
  cpcModule: CpcModule;
  completedLessonIds: string[];
  quizAttempt?: { score: number; total: number };
  onBack: () => void;
  onOpenLesson: (lessonId: string) => void;
  onStartQuiz: (moduleId: string) => void;
}

export const ModuleView: React.FC<Props> = ({ cpcModule, completedLessonIds, quizAttempt, onBack, onOpenLesson, onStartQuiz }) => {
  const doneCount = cpcModule.lessons.filter((l) => completedLessonIds.includes(l.id)).length;

  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="mb-6">
        <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">Module {cpcModule.order} of 8</p>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">{cpcModule.title}</h2>
        <p className="text-slate-500">{cpcModule.description}</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 mb-6 overflow-hidden">
        {cpcModule.lessons.map((lesson) => {
          const done = completedLessonIds.includes(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => onOpenLesson(lesson.id)}
              className="w-full text-left p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
            >
              {done ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> : <Circle className="w-5 h-5 text-slate-300 shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{lesson.order}. {lesson.title}</p>
                <p className="text-xs text-slate-400 truncate">{lesson.summary}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between bg-indigo-50/60 rounded-2xl p-5">
        <div>
          <p className="font-bold text-indigo-700 flex items-center gap-2"><GraduationCap className="w-5 h-5" /> Module Quiz</p>
          <p className="text-xs text-slate-500 mt-1">
            {doneCount}/{cpcModule.lessons.length} lessons read
            {quizAttempt ? ` · Best attempt: ${quizAttempt.score}/${quizAttempt.total}` : ' · Not attempted yet'}
          </p>
        </div>
        <button
          onClick={() => onStartQuiz(cpcModule.id)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-indigo-200"
        >
          {quizAttempt ? 'Retake Quiz' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
};
