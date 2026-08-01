import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PayeCalculator } from './calculators/PayeCalculator';
import { NiCalculator } from './calculators/NiCalculator';
import { SspCalculator } from './calculators/SspCalculator';
import { SmpCalculator } from './calculators/SmpCalculator';
import { RedundancyCalculator } from './calculators/RedundancyCalculator';

interface Props {
  onBack: () => void;
}

export const CalculatorsHub: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="animate-fade-in-up">
      <button onClick={onBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Practice Calculators</h2>
        <p className="text-slate-500 text-sm">Five interactive tools to reinforce the calculations behind the CPC syllabus.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PayeCalculator />
        <NiCalculator />
        <SspCalculator />
        <SmpCalculator />
        <div className="lg:col-span-2">
          <RedundancyCalculator />
        </div>
      </div>
    </div>
  );
};
