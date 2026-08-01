import React, { useMemo, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const PRIMARY_THRESHOLD = 12570;
const SECONDARY_THRESHOLD = 9100;
const UEL = 50270;

function calcNi(gross: number) {
  const eeBand1 = Math.max(0, Math.min(gross, UEL) - PRIMARY_THRESHOLD);
  const eeBand2 = Math.max(0, gross - UEL);
  const employeeNi = eeBand1 * 0.08 + eeBand2 * 0.02;

  const erBand = Math.max(0, gross - SECONDARY_THRESHOLD);
  const employerNi = erBand * 0.138;

  return { eeBand1, eeBand2, employeeNi, erBand, employerNi };
}

const fmt = (n: number) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 });

export const NiCalculator: React.FC = () => {
  const [salary, setSalary] = useState('35000');
  const gross = Math.max(0, parseFloat(salary) || 0);
  const result = useMemo(() => calcNi(gross), [gross]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-emerald-50 rounded-xl">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <h3 className="font-bold text-slate-800">National Insurance Calculator</h3>
          <p className="text-xs text-slate-400">Category A, 2024/25 — practice tool for Module 3</p>
        </div>
      </div>

      <label className="block text-sm font-medium text-slate-600 mb-1">Annual gross salary (£)</label>
      <input
        type="number"
        min={0}
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-5"
      />

      <div className="border border-slate-100 rounded-xl overflow-hidden mb-4">
        <div className="p-3 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Employee NIC</p>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="flex justify-between p-3 text-sm">
            <span className="text-slate-500">8% on {fmt(result.eeBand1)} (PT to UEL)</span>
            <span className="font-medium text-slate-700">{fmt(result.eeBand1 * 0.08)}</span>
          </div>
          <div className="flex justify-between p-3 text-sm">
            <span className="text-slate-500">2% on {fmt(result.eeBand2)} (above UEL)</span>
            <span className="font-medium text-slate-700">{fmt(result.eeBand2 * 0.02)}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-emerald-50/60 rounded-xl p-4 mb-4">
        <span className="text-sm font-semibold text-emerald-700">Total Employee NIC (annual)</span>
        <span className="text-xl font-extrabold text-emerald-600">{fmt(result.employeeNi)}</span>
      </div>

      <div className="border border-slate-100 rounded-xl overflow-hidden mb-4">
        <div className="p-3 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Employer NIC</p>
        </div>
        <div className="flex justify-between p-3 text-sm">
          <span className="text-slate-500">13.8% on {fmt(result.erBand)} (above ST)</span>
          <span className="font-medium text-slate-700">{fmt(result.employerNi)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-50 rounded-xl p-4">
        <span className="text-sm font-semibold text-slate-700">Total Employer NIC (annual)</span>
        <span className="text-xl font-extrabold text-slate-800">{fmt(result.employerNi)}</span>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        Illustrative only. Assumes standard category A and even pay across the year, ignoring Employment Allowance.
      </p>
    </div>
  );
};
