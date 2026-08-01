import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, ListChecks } from 'lucide-react';
import { Lesson, CpcModule } from '../types';

interface Props {
  lesson: Lesson;
  cpcModule: CpcModule;
  isComplete: boolean;
  onBack: () => void;
  onMarkComplete: (lessonId: string) => void;
  onNavigateLesson: (lessonId: string) => void;
  onStartQuiz: (moduleId: string) => void;
}

export const LessonView: React.FC<Props> = ({ lesson, cpcModule, isComplete, onBack, onMarkComplete, onNavigateLesson, onStartQuiz }) => {
  useEffect(() => {
    // Mark complete automatically once the learner opens a lesson.
    onMarkComplete(lesson.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  const index = cpcModule.lessons.findIndex((l) => l.id === lesson.id);
  const prev = index > 0 ? cpcModule.lessons[index - 1] : null;
  const next = index < cpcModule.lessons.length - 1 ? cpcModule.lessons[index + 1] : null;

  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to {cpcModule.title}
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
            Module {cpcModule.order} · Lesson {lesson.order} of {cpcModule.lessons.length}
          </p>
          {isComplete && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Read
            </span>
          )}
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4">{lesson.title}</h2>
        <p className="text-slate-500 mb-6 italic">{lesson.summary}</p>

        <div className="space-y-4 text-slate-700 leading-relaxed">
          {lesson.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-8 bg-slate-50 rounded-xl p-5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <ListChecks className="w-4 h-4" /> Key Points
          </p>
          <ul className="space-y-2">
            {lesson.keyPoints.map((kp, i) => (
              <li key={i} className="text-sm text-slate-600 flex gap-2">
                <span className="text-indigo-400 font-bold">•</span>
                <span>{kp}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          disabled={!prev}
          onClick={() => prev && onNavigateLesson(prev.id)}
          className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        {next ? (
          <button
            onClick={() => onNavigateLesson(next.id)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shadow-sm shadow-indigo-200"
          >
            Next Lesson <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => onStartQuiz(cpcModule.id)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm shadow-emerald-200"
          >
            Take Module Quiz <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
