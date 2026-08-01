// Shared types for the CPC (Certificate in Payroll & Compliance) Interactive Learning module.

export interface Lesson {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  summary: string;
  /** Paragraphs of body content, rendered in order. */
  content: string[];
  /** Short bulleted takeaways shown at the end of the lesson. */
  keyPoints: string[];
}

export interface CpcModule {
  id: string;
  order: number;
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
  lessons: Lesson[];
}

export interface Question {
  id: string;
  moduleId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  id: string;
  moduleId: string;
  front: string;
  back: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
}

export interface CaseStudyQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  moduleIds: string[];
  scenario: string[];
  questions: CaseStudyQuestion[];
}

export interface QuizAttempt {
  moduleId: string;
  score: number;
  total: number;
  completedAt: string; // ISO date
}

export interface CpcProgressState {
  lessonsCompleted: string[]; // lesson ids
  quizAttempts: QuizAttempt[]; // best/most recent kept per module by caller
  flashcardsMastered: string[]; // flashcard ids
  caseStudiesCompleted: string[]; // case study ids
}
