import React, { useMemo, useState } from 'react';
import { PiggyBank } from 'lucide-react';

const SMP_FLAT_WEEKLY_RATE = 184.03;

function calcSmp(awe: number) {
  const higherRateWeekly = awe * 0.9;
  const first6WeeksTotal = higherRateWeekly * 6;

  const remainingWeekly = Math.min(SMP_FLAT_WEEKLY_RATE, higherRateWeekly);
  const remaining33WeeksTotal = remainingWeekly * 33;

  return {
    higherRateWeekly,
    first6WeeksTotal,
    remainingWeekly,
    remaining33WeeksTotal,
    grandTotal: first6WeeksTotal + remaining33WeeksTotal,
  };
}

const fmt = (n: number) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 });

export const SmpCalculator: React.FC = () => {
  const [awe, setAwe] = useState('500');
  const averageWeeklyEarnings = Math.max(0, parseFloat(awe) || 0);
  const result = useMemo(() => calcSmp(averageWeeklyEarnings), [averageWeeklyEarnings]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-50 rounded-xl">
          <PiggyBank className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Statutory Maternity Pay Calculator</h3>
          <p className="text-xs text-slate-400">2024/25 rate — practice tool for Module 4</p>
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-600 mb-1">Average weekly earnings (£)</label>
      <input
        type="number"
        min={0}
        value={awe}
        onChange={(e) => setAwe(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-5"
      />

      <div className="border border-slate-100 rounded-xl overflow-hidden mb-4 divide-y divide-slate-100">
        <div className="p-3 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-slate-500">Weeks 1-6 — 90% of AWE ({fmt(result.higherRateWeekly)}/wk)</span>
            <span className="font-medium text-slate-700">{fmt(result.first6WeeksTotal)}</span>
          </div>
        </div>
        <div className="p-3 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-slate-500">Weeks 7-39 — lower of flat rate or 90% AWE ({fmt(result.remainingWeekly)}/wk)</span>
            <span className="font-medium text-slate-700">{fmt(result.remaining33WeeksTotal)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-purple-50/60 rounded-xl p-4">
        <span className="text-sm font-semibold text-purple-700">Total SMP over 39 weeks</span>
        <span className="text-xl font-extrabold text-purple-600">{fmt(result.grandTotal)}</span>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Flat statutory rate used: {fmt(SMP_FLAT_WEEKLY_RATE)}/week (2024/25). SMP is taxed and NI'd as normal pay through payroll.
      </p>
    </div>
  );
};
