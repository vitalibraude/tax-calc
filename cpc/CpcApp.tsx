import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, Layers, FileSearch, Trophy, Calculator, GraduationCap } from 'lucide-react';
import { useProgress } from './hooks/useProgress';
import { cpcModules, getModuleById, getLessonById } from './data/modules';
import { getQuestionsForModule } from './data/questions';
import { CpcDashboard } from './components/CpcDashboard';
import { ModuleView } from './components/ModuleView';
import { LessonView } from './components/LessonView';
import { QuizView } from './components/QuizView';
import { FlashcardDeck } from './components/FlashcardDeck';
import { GlossaryBrowser } from './components/GlossaryBrowser';
import { CaseStudiesView } from './components/CaseStudiesView';
import { CalculatorsHub } from './components/CalculatorsHub';

type Screen =
  | { name: 'dashboard' }
  | { name: 'module'; moduleId: string }
  | { name: 'lesson'; lessonId: string }
  | { name: 'quiz'; moduleId: string }
  | { name: 'flashcards' }
  | { name: 'glossary' }
  | { name: 'case-studies' }
  | { name: 'calculators' };

const NAV_ITEMS: { key: Screen['name']; label: string; icon: React.ReactNode }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: 'flashcards', label: 'Flashcards', icon: <Layers className="w-4 h-4" /> },
  { key: 'glossary', label: 'Glossary', icon: <FileSearch className="w-4 h-4" /> },
  { key: 'case-studies', label: 'Case Studies', icon: <Trophy className="w-4 h-4" /> },
  { key: 'calculators', label: 'Calculators', icon: <Calculator className="w-4 h-4" /> },
];

export default function CpcApp() {
  const [screen, setScreen] = useState<Screen>({ name: 'dashboard' });
  const { progress, markLessonComplete, recordQuizAttempt, toggleFlashcardMastered, markCaseStudyComplete } = useProgress();

  const goToDashboard = () => setScreen({ name: 'dashboard' });
  const goToModule = (moduleId: string) => setScreen({ name: 'module', moduleId });
  const goToLesson = (lessonId: string) => setScreen({ name: 'lesson', lessonId });
  const goToQuiz = (moduleId: string) => setScreen({ name: 'quiz', moduleId });

  const renderNavButton = (key: Screen['name'], label: string, icon: React.ReactNode) => {
    const active = screen.name === key || (key === 'dashboard' && (screen.name === 'module' || screen.name === 'lesson' || screen.name === 'quiz'));
    return (
      <button
        key={key}
        onClick={() => setScreen({ name: key } as Screen)}
        className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
          active ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' : 'text-slate-500 hover:bg-slate-100'
        }`}
      >
        {icon}
        {label}
      </button>
    );
  };

  let content: React.ReactNode = null;

  if (screen.name === 'dashboard') {
    content = (
      <CpcDashboard
        progress={progress}
        onOpenModule={goToModule}
        onOpenFlashcards={() => setScreen({ name: 'flashcards' })}
        onOpenGlossary={() => setScreen({ name: 'glossary' })}
        onOpenCaseStudies={() => setScreen({ name: 'case-studies' })}
        onOpenCalculators={() => setScreen({ name: 'calculators' })}
      />
    );
  } else if (screen.name === 'module') {
    const cpcModule = getModuleById(screen.moduleId);
    if (cpcModule) {
      const attempt = progress.quizAttempts.find((a) => a.moduleId === cpcModule.id);
      content = (
        <ModuleView
          cpcModule={cpcModule}
          completedLessonIds={progress.lessonsCompleted}
          quizAttempt={attempt}
          onBack={goToDashboard}
          onOpenLesson={goToLesson}
          onStartQuiz={goToQuiz}
        />
      );
    }
  } else if (screen.name === 'lesson') {
    const lesson = getLessonById(screen.lessonId);
    const cpcModule = lesson ? getModuleById(lesson.moduleId) : undefined;
    if (lesson && cpcModule) {
      content = (
        <LessonView
          lesson={lesson}
          cpcModule={cpcModule}
          isComplete={progress.lessonsCompleted.includes(lesson.id)}
          onBack={() => goToModule(cpcModule.id)}
          onMarkComplete={markLessonComplete}
          onNavigateLesson={goToLesson}
          onStartQuiz={goToQuiz}
        />
      );
    }
  } else if (screen.name === 'quiz') {
    const cpcModule = getModuleById(screen.moduleId);
    if (cpcModule) {
      const questions = getQuestionsForModule(cpcModule.id);
      content = (
        <QuizView
          cpcModule={cpcModule}
          questions={questions}
          onBack={() => goToModule(cpcModule.id)}
          onComplete={(score, total) => recordQuizAttempt({ moduleId: cpcModule.id, score, total, completedAt: new Date().toISOString() })}
        />
      );
    }
  } else if (screen.name === 'flashcards') {
    content = <FlashcardDeck masteredIds={progress.flashcardsMastered} onBack={goToDashboard} onToggleMastered={toggleFlashcardMastered} />;
  } else if (screen.name === 'glossary') {
    content = <GlossaryBrowser onBack={goToDashboard} />;
  } else if (screen.name === 'case-studies') {
    content = <CaseStudiesView completedIds={progress.caseStudiesCompleted} onBack={goToDashboard} onComplete={markCaseStudyComplete} />;
  } else if (screen.name === 'calculators') {
    content = <CalculatorsHub onBack={goToDashboard} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-12 pb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">CPC Interactive Learning</h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Certificate in Payroll &amp; Compliance — 8 modules, 35 lessons, 203 practice questions and more.
          </p>
        </div>

        <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 border-b border-slate-200">
          {NAV_ITEMS.map((item) => renderNavButton(item.key, item.label, item.icon))}
        </nav>

        {content}
      </div>
    </div>
  );
}
