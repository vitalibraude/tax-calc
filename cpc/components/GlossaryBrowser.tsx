import React, { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { glossary } from '../data/glossary';

interface Props {
  onBack: () => void;
}

export const GlossaryBrowser: React.FC<Props> = ({ onBack }) => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return glossary;
    return glossary.filter((g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Glossary</h2>
        <p className="text-slate-500 text-sm">{glossary.length} key UK payroll &amp; compliance terms</p>
      </div>

      <div className="relative mb-6 max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
        {filtered.length === 0 && (
          <p className="p-5 text-sm text-slate-400">No terms match "{search}".</p>
        )}
        {filtered.map((g) => (
          <div key={g.id} className="p-4 sm:p-5">
            <p className="font-bold text-slate-800 text-sm mb-1">{g.term}</p>
            <p className="text-sm text-slate-500 leading-relaxed">{g.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
