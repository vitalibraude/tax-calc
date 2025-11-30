
import React from 'react';
import { TaxResult } from '../utils/ukTax';

interface Props {
  result: TaxResult;
}

export const SummaryCard: React.FC<Props> = ({ result }) => {
  const formatGBP = (n: number) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: 2 });
  const formatILS = (n: number) => n.toLocaleString('he-IL', { style: 'currency', currency: 'ILS', minimumFractionDigits: 0 });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
        
        {/* Weekly */}
        <div className="p-6 text-center hover:bg-slate-50 transition-colors flex flex-col justify-center">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Weekly Net</h3>
            <p className="text-2xl font-bold text-slate-800">{formatGBP(result.net / 52)}</p>
            <p className="text-sm font-medium text-slate-400 mt-1">{formatILS(result.netILS / 52)}</p>
        </div>

        {/* Monthly */}
        <div className="p-6 text-center bg-indigo-50/30 hover:bg-indigo-50/50 transition-colors relative flex flex-col justify-center">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-indigo-500 rounded-b-lg"></div>
            <h3 className="text-xs font-semibold text-indigo-500 uppercase tracking-wider mb-2">Monthly Net</h3>
            <p className="text-3xl font-extrabold text-indigo-600">{formatGBP(result.net / 12)}</p>
            <p className="text-lg font-semibold text-indigo-400 mt-1">{formatILS(result.netILS / 12)}</p>
        </div>

        {/* Yearly */}
        <div className="p-6 text-center hover:bg-slate-50 transition-colors flex flex-col justify-center">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Yearly Net</h3>
            <p className="text-2xl font-bold text-slate-800">{formatGBP(result.net)}</p>
            <p className="text-sm font-medium text-slate-400 mt-1">{formatILS(result.netILS)}</p>
        </div>
      </div>
      
      {/* Exchange Rate Footer */}
      <div className="bg-slate-50 border-t border-slate-100 p-2 text-center">
        <p className="text-xs text-slate-500 font-medium">
          Exchange Ratio: 1 GBP = {result.exchangeRate} ILS
        </p>
      </div>
    </div>
  );
};
