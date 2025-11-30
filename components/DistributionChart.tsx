import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TaxResult } from '../utils/ukTax';

interface Props {
  data: TaxResult;
}

const COLORS = ['#10b981', '#ef4444', '#f59e0b']; // Green (Net), Red (Tax), Amber (NI)

export const DistributionChart: React.FC<Props> = ({ data }) => {
  const chartData = [
    { name: 'Net Pay', value: data.net },
    { name: 'Income Tax', value: data.incomeTax },
    { name: 'National Insurance', value: data.nationalInsurance },
  ].filter(d => d.value > 0);

  const formatCurrency = (val: number) => `£${Math.round(val).toLocaleString()}`;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};