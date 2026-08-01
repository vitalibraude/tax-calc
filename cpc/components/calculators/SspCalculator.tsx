import React, { useMemo, useState } from 'react';
import { HeartPulse } from 'lucide-react';

const SSP_WEEKLY_RATE = 116.75;
const WAITING_DAYS = 3;

function calcSsp(qualifyingDays: number) {
  const payableDays = Math.max(0, qualifyingDays - WAITING_DAYS);
  const dailyRate = SSP_WEEKLY_RATE / 7;
  const total = payableDays * dailyRate;
  return { payableDays, dailyRate, total };
}

const fmt = (n: number) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 });

export const SspCalculator: React.FC = () => {
  const [days, setDays] = useState('10');
  const qualifyingDays = Math.max(0, Math.round(parseFloat(days) || 0));
  const result = useMemo(() => calcSsp(qualifyingDays), [qualifyingDays]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-rose-50 rounded-xl">
          <HeartPulse className="w-5 h-5 text-rose-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Statutory Sick Pay Calculator</h3>
          <p className="text-xs text-slate-400">2024/25 rate — practice tool for Module 4</p>
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-600 mb-1">Total qualifying days of sickness</label>
      <input
        type="number"
        min={0}
        value={days}
        onChange={(e) => setDays(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 mb-5"
      />
      <p className="text-xs text-slate-400 -mt-3 mb-5">
        Qualifying days = the days the employee would normally have worked, within this spell of sickness.
      </p>

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Waiting Days (unpaid)</p>
          <p className="font-semibold text-slate-700">{Math.min(qualifyingDays, WAITING_DAYS)} days</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Payable Days</p>
          <p className="font-semibold text-slate-700">{result.payableDays} days</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-rose-50/60 rounded-xl p-4">
        <span className="text-sm font-semibold text-rose-700">Total SSP due</span>
        <span className="text-xl font-extrabold text-rose-600">{fmt(result.total)}</span>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Based on the flat 2024/25 rate of {fmt(SSP_WEEKLY_RATE)}/week ({fmt(result.dailyRate)}/qualifying day), assuming a 7-day qualifying week and no linked prior spell.
        SSP is subject to Income Tax and NI like ordinary pay.
      </p>
    </div>
  );
};
