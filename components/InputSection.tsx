
import React from 'react';
import { PoundSterling, RefreshCcw, Settings2 } from 'lucide-react';

interface InputSectionProps {
  grossValue: string;
  onGrossChange: (val: string) => void;
  rateValue: string;
  onRateChange: (val: string) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({ 
  grossValue, 
  onGrossChange,
  rateValue,
  onRateChange
}) => {
  const grossNum = parseFloat(grossValue);
  const rateNum = parseFloat(rateValue);
  const approximateILS = (!isNaN(grossNum) && !isNaN(rateNum)) ? grossNum * rateNum : 0;
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Main Gross Input */}
          <div className="flex-1">
            <label htmlFor="gross-salary" className="block text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">
              Annual Gross Income (Bruto)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <PoundSterling className="h-6 w-6 text-slate-400" />
              </div>
              <input
                type="number"
                id="gross-salary"
                className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-3xl font-bold text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="0"
                value={grossValue}
                onChange={(e) => onGrossChange(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-slate-400 font-medium">GBP</span>
              </div>
            </div>
          </div>

          {/* Exchange Rate Input */}
          <div className="w-full md:w-48">
             <label htmlFor="exchange-rate" className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2 uppercase tracking-wide">
              <RefreshCcw className="w-3 h-3" />
              GBP to ILS Ratio
            </label>
            <div className="relative">
              <input
                type="number"
                id="exchange-rate"
                step="0.01"
                className="block w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-xl font-bold text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                placeholder="4.78"
                value={rateValue}
                onChange={(e) => onRateChange(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-xs text-slate-400 font-medium bg-slate-100 px-2 py-1 rounded">1 £ = ? ₪</span>
              </div>
            </div>
          </div>

        </div>

        {/* Live Estimation Footer */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-slate-400">
            Based on 2024/2025 Tax Year
          </p>
          <p className="text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full mt-2 sm:mt-0">
            Gross ≈ {approximateILS.toLocaleString('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </div>
  );
};
