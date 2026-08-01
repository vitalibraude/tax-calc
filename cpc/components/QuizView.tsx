import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { CpcModule, Question } from '../types';

interface Props {
  cpcModule: CpcModule;
  questions: Question[];
  onBack: () => void;
  onComplete: (score: number, total: number) => void;
}

export const QuizView: React.FC<Props> = ({ cpcModule, questions, onBack, onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = questions.reduce((sum, q) => sum + (answers[q.id] === q.correctIndex ? 1 : 0), 0);

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete(score, questions.length);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to {cpcModule.title}
      </button>

      <div className="mb-6">
        <p className="text-xs font-semibold text-indigo-500 uppercase tracking-wide mb-1">Module {cpcModule.order} Quiz</p>
        <h2 className="text-2xl font-extrabold text-slate-900">{cpcModule.title}</h2>
        <p className="text-slate-500 text-sm mt-1">{questions.length} questions</p>
      </div>

      {submitted && (
        <div className="bg-indigo-50/60 rounded-2xl p-5 mb-6 flex items-center justify-between">
          <div>
            <p className="font-bold text-indigo-700">Score: {score} / {questions.length}</p>
            <p className="text-xs text-slate-500">{Math.round((score / questions.length) * 100)}% correct</p>
          </div>
          <button
            onClick={handleRetake}
            className="inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake
          </button>
        </div>
      )}

      <div className="space-y-5">
        {questions.map((q, qi) => {
          const selected = answers[q.id];
          return (
            <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
              <p className="font-semibold text-slate-800 mb-3 text-sm">{qi + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isSelected = selected === oi;
                  const isCorrect = q.correctIndex === oi;
                  let cls = 'border-slate-200 hover:bg-slate-50';
                  if (submitted) {
                    if (isCorrect) cls = 'border-emerald-300 bg-emerald-50';
                    else if (isSelected && !isCorrect) cls = 'border-rose-300 bg-rose-50';
                  } else if (isSelected) {
                    cls = 'border-indigo-400 bg-indigo-50';
                  }
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: oi }))}
                      className={`w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-colors flex items-center justify-between gap-2 ${cls} disabled:cursor-default`}
                    >
                      <span className="text-slate-700">{opt}</span>
                      {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className="text-xs text-slate-500 mt-3 bg-slate-50 rounded-lg p-3">{q.explanation}</p>
              )}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          disabled={!allAnswered}
          onClick={handleSubmit}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {allAnswered ? 'Submit Quiz' : `Answer all ${questions.length} questions to submit`}
        </button>
      )}
    </div>
  );
};
