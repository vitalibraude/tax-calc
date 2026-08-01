import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, ChevronRight } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import { CaseStudy } from '../types';

interface Props {
  completedIds: string[];
  onBack: () => void;
  onComplete: (caseStudyId: string) => void;
}

const CaseStudyDetail: React.FC<{ cs: CaseStudy; onBack: () => void; onComplete: (id: string) => void }> = ({ cs, onBack, onComplete }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = cs.questions.reduce((sum, q, i) => sum + (answers[i] === q.correctIndex ? 1 : 0), 0);
  const allAnswered = cs.questions.every((_, i) => answers[i] !== undefined);

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete(cs.id);
  };

  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Case Studies
      </button>

      <h2 className="text-2xl font-extrabold text-slate-900 mb-4">{cs.title}</h2>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-6 space-y-3">
        {cs.scenario.map((p, i) => (
          <p key={i} className="text-slate-700 leading-relaxed">{p}</p>
        ))}
      </div>

      {submitted && (
        <div className="bg-amber-50/60 rounded-2xl p-5 mb-6">
          <p className="font-bold text-amber-700">Score: {score} / {cs.questions.length}</p>
        </div>
      )}

      <div className="space-y-5">
        {cs.questions.map((q, qi) => {
          const selected = answers[qi];
          return (
            <div key={qi} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
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
                      onClick={() => setAnswers((prev) => ({ ...prev, [qi]: oi }))}
                      className={`w-full text-left text-sm px-4 py-2.5 rounded-xl border transition-colors flex items-center justify-between gap-2 ${cls} disabled:cursor-default`}
                    >
                      <span className="text-slate-700">{opt}</span>
                      {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                      {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                    </button>
                  );
                })}
              </div>
              {submitted && <p className="text-xs text-slate-500 mt-3 bg-slate-50 rounded-lg p-3">{q.explanation}</p>}
            </div>
          );
        })}
      </div>

      {!submitted && (
        <button
          disabled={!allAnswered}
          onClick={handleSubmit}
          className="mt-6 w-full bg-amber-600 hover:bg-amber-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {allAnswered ? 'Submit Answers' : `Answer all ${cs.questions.length} questions to submit`}
        </button>
      )}
    </div>
  );
};

export const CaseStudiesView: React.FC<Props> = ({ completedIds, onBack, onComplete }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = caseStudies.find((c) => c.id === openId);

  if (open) {
    return <CaseStudyDetail cs={open} onBack={() => setOpenId(null)} onComplete={onComplete} />;
  }

  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Case Studies</h2>
        <p className="text-slate-500 text-sm">Apply what you've learned to realistic, multi-module payroll scenarios.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {caseStudies.map((cs) => {
          const done = completedIds.includes(cs.id);
          return (
            <button
              key={cs.id}
              onClick={() => setOpenId(cs.id)}
              className="text-left bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:border-amber-200 hover:shadow-md transition-all flex items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className={`w-4 h-4 ${done ? 'text-amber-500' : 'text-slate-300'}`} />
                  <h4 className="font-bold text-slate-800">{cs.title}</h4>
                </div>
                <p className="text-sm text-slate-500">{cs.questions.length} questions · {cs.scenario.length} scenario paragraphs</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
