import React from 'react';
import { BookOpen, Layers, GraduationCap, FileSearch, ArrowRight, Trophy } from 'lucide-react';
import { cpcModules, allLessons } from '../data/modules';
import { flashcards } from '../data/flashcards';
import { caseStudies } from '../data/caseStudies';
import { CpcProgressState } from '../types';

interface Props {
  progress: CpcProgressState;
  onOpenModule: (moduleId: string) => void;
  onOpenFlashcards: () => void;
  onOpenGlossary: () => void;
  onOpenCaseStudies: () => void;
  onOpenCalculators: () => void;
}

const StatTile: React.FC<{ label: string; value: string; icon: React.ReactNode; accent: string }> = ({ label, value, icon, accent }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${accent}`}>{icon}</div>
    <div>
      <p className="text-2xl font-extrabold text-slate-800">{value}</p>
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
    </div>
  </div>
);

export const CpcDashboard: React.FC<Props> = ({
  progress,
  onOpenModule,
  onOpenFlashcards,
  onOpenGlossary,
  onOpenCaseStudies,
  onOpenCalculators,
}) => {
  const totalLessons = allLessons.length;
  const lessonsDone = progress.lessonsCompleted.length;
  const lessonsPct = totalLessons ? Math.round((lessonsDone / totalLessons) * 100) : 0;

  const flashcardsDone = progress.flashcardsMastered.length;
  const totalFlashcards = flashcards.length;

  const attemptedModules = progress.quizAttempts.length;
  const avgScorePct = attemptedModules
    ? Math.round(
        (progress.quizAttempts.reduce((sum, a) => sum + a.score / a.total, 0) / attemptedModules) * 100
      )
    : null;

  const caseStudiesDone = progress.caseStudiesCompleted.length;

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Your CPC Progress</h2>
        <p className="text-slate-500 text-sm">
          Certificate in Payroll &amp; Compliance — 8 modules, {totalLessons} lessons, quizzes, flashcards and case studies.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatTile label="Lessons Complete" value={`${lessonsDone}/${totalLessons}`} icon={<BookOpen className="w-5 h-5 text-indigo-600" />} accent="bg-indigo-50" />
        <StatTile label="Avg Quiz Score" value={avgScorePct === null ? '—' : `${avgScorePct}%`} icon={<GraduationCap className="w-5 h-5 text-emerald-600" />} accent="bg-emerald-50" />
        <StatTile label="Flashcards Mastered" value={`${flashcardsDone}/${totalFlashcards}`} icon={<Layers className="w-5 h-5 text-purple-600" />} accent="bg-purple-50" />
        <StatTile label="Case Studies Done" value={`${caseStudiesDone}/${caseStudies.length}`} icon={<Trophy className="w-5 h-5 text-amber-600" />} accent="bg-amber-50" />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-slate-600">Overall course completion</h3>
          <span className="text-sm font-bold text-indigo-600">{lessonsPct}%</span>
        </div>
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${lessonsPct}%` }} />
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-4">Modules</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {cpcModules.map((m) => {
          const done = m.lessons.filter((l) => progress.lessonsCompleted.includes(l.id)).length;
          const attempt = progress.quizAttempts.find((a) => a.moduleId === m.id);
          return (
            <button
              key={m.id}
              onClick={() => onOpenModule(m.id)}
              className="text-left bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:border-indigo-200 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">Module {m.order}</p>
                  <h4 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{m.title}</h4>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors mt-1" />
              </div>
              <p className="text-sm text-slate-500 mb-3">{m.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span>{done}/{m.lessons.length} lessons</span>
                {attempt && <span className="text-emerald-600 font-medium">Quiz: {attempt.score}/{attempt.total}</span>}
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button onClick={onOpenFlashcards} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-left hover:border-purple-200 hover:shadow-md transition-all">
          <Layers className="w-5 h-5 text-purple-600 mb-2" />
          <p className="font-bold text-slate-800">Flashcards</p>
          <p className="text-xs text-slate-400">Revise all 93 cards</p>
        </button>
        <button onClick={onOpenGlossary} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-left hover:border-sky-200 hover:shadow-md transition-all">
          <FileSearch className="w-5 h-5 text-sky-600 mb-2" />
          <p className="font-bold text-slate-800">Glossary</p>
          <p className="text-xs text-slate-400">72 key terms, A-Z</p>
        </button>
        <button onClick={onOpenCaseStudies} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 text-left hover:border-amber-200 hover:shadow-md transition-all">
          <Trophy className="w-5 h-5 text-amber-600 mb-2" />
          <p className="font-bold text-slate-800">Case Studies</p>
          <p className="text-xs text-slate-400">3 real-world scenarios</p>
        </button>
      </div>

      <button
        onClick={onOpenCalculators}
        className="mt-4 w-full bg-slate-900 text-white rounded-2xl p-5 text-left hover:bg-slate-800 transition-all flex items-center justify-between"
      >
        <div>
          <p className="font-bold">Practice Calculators</p>
          <p className="text-xs text-slate-300">PAYE, NI, SSP, SMP &amp; redundancy pay tools</p>
        </div>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
