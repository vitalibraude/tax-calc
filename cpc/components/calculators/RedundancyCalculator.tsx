import React, { useMemo, useState } from 'react';
import { FileX } from 'lucide-react';

const WEEKLY_PAY_CAP = 700; // 2024/25
const MAX_YEARS = 20;

function calcRedundancy(age: number, yearsOfService: number, weeklyPay: number) {
  const cappedWeeklyPay = Math.min(weeklyPay, WEEKLY_PAY_CAP);
  const years = Math.min(Math.floor(yearsOfService), MAX_YEARS);

  // Walk backwards from the redundancy date, counting each full year of
  // service at the age band the employee was in during that year.
  let weeksOwed = 0;
  let under22 = 0;
  let band22to40 = 0;
  let band41plus = 0;

  for (let i = 0; i < years; i++) {
    const ageDuringYear = age - i;
    if (ageDuringYear >= 41) {
      weeksOwed += 1.5;
      band41plus++;
    } else if (ageDuringYear >= 22) {
      weeksOwed += 1;
      band22to40++;
    } else {
      weeksOwed += 0.5;
      under22++;
    }
  }

  return { cappedWeeklyPay, years, weeksOwed, under22, band22to40, band41plus, total: weeksOwed * cappedWeeklyPay };
}

const fmt = (n: number) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 });

export const RedundancyCalculator: React.FC = () => {
  const [age, setAge] = useState('45');
  const [years, setYears] = useState('12');
  const [weeklyPay, setWeeklyPay] = useState('900');

  const ageNum = Math.max(16, parseFloat(age) || 0);
  const yearsNum = Math.max(0, parseFloat(years) || 0);
  const weeklyPayNum = Math.max(0, parseFloat(weeklyPay) || 0);

  const result = useMemo(() => calcRedundancy(ageNum, yearsNum, weeklyPayNum), [ageNum, yearsNum, weeklyPayNum]);
  const eligible = yearsNum >= 2;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-amber-50 rounded-xl">
          <FileX className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">Statutory Redundancy Pay Calculator</h3>
          <p className="text-xs text-slate-400">2024/25 cap — practice tool for Module 7</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Age</label>
          <input type="number" min={16} value={age} onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Full years' service</label>
          <input type="number" min={0} value={years} onChange={(e) => setYears(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Weekly pay (£)</label>
          <input type="number" min={0} value={weeklyPay} onChange={(e) => setWeeklyPay(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500" />
        </div>
      </div>

      {!eligible ? (
        <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-500">
          Not eligible for statutory redundancy pay — a minimum of 2 years' continuous service is required.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 text-sm mb-4">
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Under 22</p>
              <p className="font-semibold text-slate-700">{result.under22} yrs × 0.5</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">22-40</p>
              <p className="font-semibold text-slate-700">{result.band22to40} yrs × 1</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">41+</p>
              <p className="font-semibold text-slate-700">{result.band41plus} yrs × 1.5</p>
            </div>
          </div>

          <div className="flex justify-between p-3 text-sm border border-slate-100 rounded-xl mb-4">
            <span className="text-slate-500">{result.weeksOwed} weeks' pay × capped weekly pay of {fmt(result.cappedWeeklyPay)}</span>
          </div>

          <div className="flex justify-between items-center bg-amber-50/60 rounded-xl p-4">
            <span className="text-sm font-semibold text-amber-700">Statutory redundancy pay (tax-free)</span>
            <span className="text-xl font-extrabold text-amber-600">{fmt(result.total)}</span>
          </div>
        </>
      )}
      <p className="text-xs text-slate-400 mt-3">
        Weekly pay is capped at {fmt(WEEKLY_PAY_CAP)} (2024/25) and service is capped at {MAX_YEARS} years, counted back from the redundancy date.
      </p>
    </div>
  );
};
