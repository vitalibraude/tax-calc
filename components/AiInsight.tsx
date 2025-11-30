import React, { useState } from 'react';
import { Sparkles, FileText, Loader2, Scale } from 'lucide-react';
import { getTaxExplanation } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface Props {
  grossSalary: number;
}

export const AiInsight: React.FC<Props> = ({ grossSalary }) => {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    const text = await getTaxExplanation(grossSalary);
    setExplanation(text);
    setLoading(false);
  };

  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Scale className="w-6 h-6 text-indigo-300" />
            </div>
            <h2 className="text-xl font-bold">Ask Gemini: Legal Tax Breakdown</h2>
        </div>
        
        <p className="text-indigo-200 text-sm mb-6 leading-relaxed">
            Want to know exactly how British Law applies to this salary? 
            Ask our AI to read the Finance Act 2024 and explain the tax bands, 
            allowances, and NI contributions for your specific Bruto amount.
        </p>

        {!explanation && (
            <button
                onClick={handleGenerate}
                disabled={loading || grossSalary <= 0}
                className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-indigo-900 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing UK Legislation...
                    </>
                ) : (
                    <>
                        <Sparkles className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                        Generate Legal Tax Report
                    </>
                )}
            </button>
        )}

        {explanation && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10 animate-fade-in">
                <div className="flex items-center gap-2 mb-3 text-indigo-300 text-xs uppercase tracking-wider font-semibold">
                    <FileText className="w-4 h-4" />
                    AI Analysis Report
                </div>
                <div className="prose prose-invert prose-sm max-w-none text-slate-100">
                    <ReactMarkdown>{explanation}</ReactMarkdown>
                </div>
                <button 
                  onClick={() => setExplanation(null)}
                  className="mt-4 text-xs text-indigo-300 hover:text-white underline underline-offset-2"
                >
                  Clear and ask again
                </button>
            </div>
        )}
      </div>
    </div>
  );
};