import { useCallback, useEffect, useState } from 'react';
import { CpcProgressState, QuizAttempt } from '../types';

const STORAGE_KEY = 'cpc-progress-v1';

function loadInitial(): CpcProgressState {
  if (typeof window === 'undefined') {
    return { lessonsCompleted: [], quizAttempts: [], flashcardsMastered: [], caseStudiesCompleted: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        lessonsCompleted: parsed.lessonsCompleted ?? [],
        quizAttempts: parsed.quizAttempts ?? [],
        flashcardsMastered: parsed.flashcardsMastered ?? [],
        caseStudiesCompleted: parsed.caseStudiesCompleted ?? [],
      };
    }
  } catch {
    // ignore corrupt storage and start fresh
  }
  return { lessonsCompleted: [], quizAttempts: [], flashcardsMastered: [], caseStudiesCompleted: [] };
}

/**
 * Tracks a learner's progress through the CPC module (lessons read, quiz
 * scores, flashcards mastered, case studies completed), persisted to
 * localStorage so it survives a page refresh.
 */
export function useProgress() {
  const [progress, setProgress] = useState<CpcProgressState>(loadInitial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // storage may be unavailable (e.g. private browsing quota) — fail silently
    }
  }, [progress]);

  const markLessonComplete = useCallback((lessonId: string) => {
    setProgress((prev) =>
      prev.lessonsCompleted.includes(lessonId)
        ? prev
        : { ...prev, lessonsCompleted: [...prev.lessonsCompleted, lessonId] }
    );
  }, []);

  const recordQuizAttempt = useCallback((attempt: QuizAttempt) => {
    setProgress((prev) => {
      const others = prev.quizAttempts.filter((a) => a.moduleId !== attempt.moduleId);
      return { ...prev, quizAttempts: [...others, attempt] };
    });
  }, []);

  const toggleFlashcardMastered = useCallback((flashcardId: string) => {
    setProgress((prev) => {
      const already = prev.flashcardsMastered.includes(flashcardId);
      return {
        ...prev,
        flashcardsMastered: already
          ? prev.flashcardsMastered.filter((id) => id !== flashcardId)
          : [...prev.flashcardsMastered, flashcardId],
      };
    });
  }, []);

  const markCaseStudyComplete = useCallback((caseStudyId: string) => {
    setProgress((prev) =>
      prev.caseStudiesCompleted.includes(caseStudyId)
        ? prev
        : { ...prev, caseStudiesCompleted: [...prev.caseStudiesCompleted, caseStudyId] }
    );
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ lessonsCompleted: [], quizAttempts: [], flashcardsMastered: [], caseStudiesCompleted: [] });
  }, []);

  return {
    progress,
    markLessonComplete,
    recordQuizAttempt,
    toggleFlashcardMastered,
    markCaseStudyComplete,
    resetProgress,
  };
}
