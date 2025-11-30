
import React, { useState, useEffect } from 'react';
import { calculateUKTax, TaxResult, DEFAULT_EXCHANGE_RATE } from './utils/ukTax';
import { InputSection } from './components/InputSection';
import { SummaryCard } from './components/SummaryCard';
import { DistributionChart } from './components/DistributionChart';
import { DetailedTable } from './components/DetailedTable';
import { AiInsight } from './components/AiInsight';
import { Calculator } from 'lucide-react';

export default function App() {
  const [grossInput, setGrossInput] = useState<string>('50000');
  const [rateInput, setRateInput] = useState<string>(DEFAULT_EXCHANGE_RATE.toString());
  const [result, setResult] = useState<TaxResult | null>(null);

  useEffect(() => {
    const gross = parseFloat(grossInput);
    const rate = parseFloat(rateInput);
    
    // Only calculate if gross is valid. Use default rate if rate input is invalid but calculation is desired.
    const effectiveRate = !isNaN(rate) && rate > 0 ? rate : 0;

    if (!isNaN(gross) && gross >= 0) {
      setResult(calculateUKTax(gross, effectiveRate));
    } else {
      setResult(null);
    }
  }, [grossInput, rateInput]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 mb-4">
                <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                UK Tax Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Instant Bruto to Neto conversion updated for the <span className="text-indigo-600 font-semibold">2024/25 Tax Year</span>.
            </p>
        </div>

        {/* Input */}
        <InputSection 
          grossValue={grossInput} 
          onGrossChange={setGrossInput}
          rateValue={rateInput}
          onRateChange={setRateInput}
        />

        {/* Results Area */}
        {result && (
          <div className="animate-fade-in-up space-y-6">
            
            {/* Main Summary Cards */}
            <SummaryCard result={result} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Chart Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4 w-full text-left">Where your money goes</h3>
                    <DistributionChart data={result} />
                </div>

                {/* Detailed Table Section */}
                <DetailedTable result={result} />
            </div>

            {/* AI Integration */}
            <AiInsight grossSalary={result.gross} />

            <p className="text-center text-xs text-slate-400 mt-8">
                Disclaimer: This calculation is for illustrative purposes. 
                Actual tax may vary based on tax code, student loans, and pension contributions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
