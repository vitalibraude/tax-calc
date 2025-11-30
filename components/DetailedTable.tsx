import React from 'react';
import { TaxResult } from '../utils/ukTax';

interface Props {
  result: TaxResult;
}

export const DetailedTable: React.FC<Props> = ({ result }) => {
  const formatGBP = (n: number) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 });
  const formatILS = (n: number) => n.toLocaleString('he-IL', { style: 'currency', currency: 'ILS', minimumFractionDigits: 0 });

  const rows = [
    { label: 'Gross Income', value: result.gross, bold: true },
    { label: 'Taxable Income', value: result.taxableIncome, sub: `Personal Allowance: ${formatGBP(result.personalAllowance)}` },
    { label: 'Income Tax', value: -result.incomeTax, color: 'text-red-500' },
    { label: 'National Insurance', value: -result.nationalInsurance, color: 'text-amber-500' },
    { label: 'Net Pay (GBP)', value: result.net, bold: true, color: 'text-emerald-600' },
    { label: 'Net Pay (ILS)', value: result.netILS, bold: true, color: 'text-indigo-600', isILS: true },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-slate-100 p-4">
        <h4 className="text-sm font-semibold text-slate-900 mb-4 px-2">Detailed Breakdown (Yearly)</h4>
        <div className="space-y-3">
            {rows.map((row, idx) => (
                <div key={idx} className={`flex justify-between items-center px-2 py-2 rounded-lg ${row.bold ? 'bg-slate-50' : ''}`}>
                    <div>
                        <span className={`text-sm ${row.bold ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{row.label}</span>
                        {row.sub && <div className="text-xs text-slate-400 mt-0.5">{row.sub}</div>}
                    </div>
                    <span className={`font-mono text-sm ${row.bold ? 'font-bold' : ''} ${row.color || 'text-slate-800'}`}>
                        {row.isILS ? formatILS(row.value) : formatGBP(row.value)}
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
};