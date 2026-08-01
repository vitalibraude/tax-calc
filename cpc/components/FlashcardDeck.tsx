import React, { useMemo, useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Star, Shuffle } from 'lucide-react';
import { flashcards } from '../data/flashcards';
import { cpcModules } from '../data/modules';

interface Props {
  masteredIds: string[];
  onBack: () => void;
  onToggleMastered: (flashcardId: string) => void;
}

export const FlashcardDeck: React.FC<Props> = ({ masteredIds, onBack, onToggleMastered }) => {
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [order, setOrder] = useState<number[]>([]);

  const filtered = useMemo(
    () => (moduleFilter === 'all' ? flashcards : flashcards.filter((f) => f.moduleId === moduleFilter)),
    [moduleFilter]
  );

  const indices = order.length === filtered.length ? order : filtered.map((_, i) => i);
  const card = filtered[indices[Math.min(index, indices.length - 1)]];

  const goTo = (i: number) => {
    setIndex(Math.max(0, Math.min(filtered.length - 1, i)));
    setFlipped(false);
  };

  const shuffle = () => {
    const shuffled = filtered.map((_, i) => i).sort(() => Math.random() - 0.5);
    setOrder(shuffled);
    setIndex(0);
    setFlipped(false);
  };

  const handleModuleChange = (id: string) => {
    setModuleFilter(id);
    setOrder([]);
    setIndex(0);
    setFlipped(false);
  };

  if (!card) {
    return (
      <div className="animate-fade-in-up">
        <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 mb-4">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <p className="text-slate-500">No flashcards available.</p>
      </div>
    );
  }

  const isMastered = masteredIds.includes(card.id);

  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Flashcards</h2>
          <p className="text-slate-500 text-sm">{masteredIds.length}/{flashcards.length} mastered overall</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={moduleFilter}
            onChange={(e) => handleModuleChange(e.target.value)}
            className="text-sm rounded-xl border border-slate-200 px-3 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All modules</option>
            {cpcModules.map((m) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
          <button onClick={shuffle} className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors" title="Shuffle">
            <Shuffle className="w-4 h-4 text-slate-500" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => setFlipped((f) => !f)}
          className="w-full max-w-xl min-h-[220px] bg-white rounded-2xl shadow-sm border border-slate-100 p-8 flex items-center justify-center text-center cursor-pointer hover:shadow-md transition-shadow"
        >
          <div>
            <p className="text-xs font-semibold text-purple-400 uppercase tracking-wide mb-4">
              {flipped ? 'Answer' : 'Question'} · Card {index + 1} of {filtered.length}
            </p>
            <p className="text-lg font-semibold text-slate-800">{flipped ? card.back : card.front}</p>
            <p className="text-xs text-slate-400 mt-4">Click card to flip</p>
          </div>
        </button>
      </div>

      <div className="flex items-center justify-between max-w-xl mx-auto">
        <button onClick={() => goTo(index - 1)} disabled={index === 0} className="p-2.5 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors">
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        <button
          onClick={() => onToggleMastered(card.id)}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl border transition-colors ${
            isMastered ? 'bg-amber-50 border-amber-200 text-amber-600' : 'border-slate-200 text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Star className={`w-4 h-4 ${isMastered ? 'fill-amber-400 text-amber-400' : ''}`} />
          {isMastered ? 'Mastered' : 'Mark Mastered'}
        </button>

        <button onClick={() => goTo(index + 1)} disabled={index === filtered.length - 1} className="p-2.5 rounded-xl border border-slate-200 disabled:opacity-40 hover:bg-slate-50 transition-colors">
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>
    </div>
  );
};
