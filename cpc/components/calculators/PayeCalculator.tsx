import React, { useMemo, useState } from 'react';
import { Receipt } from 'lucide-react';

const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const HIGHER_RATE_LIMIT = 125140;

function calcAllowance(gross: number): number {
  if (gross <= 100000) return PERSONAL_ALLOWANCE;
  const reduction = Math.floor((gross - 100000) / 2);
  return Math.max(0, PERSONAL_ALLOWANCE - reduction);
}

function calcIncomeTax(gross: number) {
  const allowance = calcAllowance(gross);
  const taxable = Math.max(0, gross - allowance);

  const basicBand = Math.max(0, Math.min(taxable, BASIC_RATE_LIMIT - allowance));
  const higherBand = Math.max(0, Math.min(taxable - basicBand, HIGHER_RATE_LIMIT - BASIC_RATE_LIMIT));
  const additionalBand = Math.max(0, taxable - basicBand - higherBand);

  const basicTax = basicBand * 0.2;
  const higherTax = higherBand * 0.4;
  const additionalTax = additionalBand * 0.45;

  return {
    allowance,
    taxable,
    basicBand,
    higherBand,
    additionalBand,
    basicTax,
    higherTax,
    additionalTax,
    totalTax: basicTax + higherTax + additionalTax,
  };
}

const fmt = (n: number) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 });

export const PayeCalculator: React.FC = () => {
  const [salary, setSalary] = useState('35000');
  const gross = Math.max(0, parseFloat(salary) || 0);
  const result = useMemo(() => calcIncomeTax(gross), [gross]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-indigo-50 rounded-xl">
          <Receipt className="w-5 h-5 text-indigo-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">PAYE / Income Tax Calculator</h3>
          <p className="text-xs text-slate-400">Rest-of-UK bands, 2024/25 — practice tool for Module 2</p>
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-600 mb-1">Annual gross salary (£)</label>
      <input
        type="number"
        min={0}
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-5"
      />

      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Personal Allowance</p>
          <p className="font-semibold text-slate-700">{fmt(result.allowance)}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Taxable Income</p>
          <p className="font-semibold text-slate-700">{fmt(result.taxable)}</p>
        </div>
      </div>

      <div className="divide-y divide-slate-100 border border-slate-100 rounded-xl overflow-hidden mb-4">
        <div className="flex justify-between p-3 text-sm">
          <span className="text-slate-500">Basic rate (20%) on {fmt(result.basicBand)}</span>
          <span className="font-medium text-slate-700">{fmt(result.basicTax)}</span>
        </div>
        <div className="flex justify-between p-3 text-sm">
          <span className="text-slate-500">Higher rate (40%) on {fmt(result.higherBand)}</span>
          <span className="font-medium text-slate-700">{fmt(result.higherTax)}</span>
        </div>
        <div className="flex justify-between p-3 text-sm">
          <span className="text-slate-500">Additional rate (45%) on {fmt(result.additionalBand)}</span>
          <span className="font-medium text-slate-700">{fmt(result.additionalTax)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center bg-indigo-50/50 rounded-xl p-4">
        <span className="text-sm font-semibold text-indigo-700">Total Income Tax (annual)</span>
        <span className="text-xl font-extrabold text-indigo-600">{fmt(result.totalTax)}</span>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Illustrative only, for CPC learning purposes. Ignores Scottish/Welsh bands, student loans and other adjustments.
      </p>
    </div>
  );
};
