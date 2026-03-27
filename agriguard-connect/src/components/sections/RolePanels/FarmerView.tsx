import { Sprout, ArrowRight, Zap } from 'lucide-react';
import { DistrictData } from '@/lib/types';

interface FarmerViewProps {
  data: DistrictData;
  year: number;
}

const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];

function getMonthColor(i: number): string {
  if (i >= 5 && i <= 8) return 'rgba(77,204,128,0.3)';
  if (i === 3 || i === 4 || i === 9) return 'rgba(245,200,64,0.3)';
  return 'rgba(255,92,74,0.15)';
}

export default function FarmerView({ data, year }: FarmerViewProps) {
  const steps = [
    { month: 'MARCH', title: 'Check district risk score', detail: `${data.drought}% drought → Switch crop` },
    { month: 'APRIL', title: `Choose ${data.primaryCrop}, apply for adjusted KCC`, detail: 'Bank has your district risk flag' },
    { month: 'OCTOBER', title: 'Insurance auto-triggers if threshold breached', detail: 'No waiting 6-12 months' },
  ];

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      {/* Crop Advisory */}
      <div className="bg-bg-surface border border-bdr rounded-[12px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Sprout size={16} className="text-brand" />
          <span className="font-medium text-t-primary text-sm">Crop Advisory</span>
        </div>

        <span className="font-mono text-[10px] text-t-dim uppercase tracking-widest">Recommended</span>
        <div className="font-display italic text-3xl text-brand mt-1">{data.primaryCrop}</div>
        <p className="text-sm text-t-secondary mt-1">Best choice given {data.drought}% drought probability by {year}</p>

        <div className="border-t border-bdr my-4" />

        <div className="space-y-2">
          {data.primaryCrop.split(' / ').map(crop => (
            <div key={crop} className="flex items-center justify-between text-sm">
              <span className="text-t-primary">{crop.trim()}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-risk-lbg text-risk-l border border-risk-lb">DROUGHT SAFE</span>
            </div>
          ))}
          {data.avoidCrops.map(crop => (
            <div key={crop} className="flex items-center justify-between text-sm">
              <span className="text-t-secondary">{crop}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-risk-hbg text-risk-h border border-risk-hb">HIGH WATER NEED</span>
            </div>
          ))}
        </div>

        {/* Sowing Calendar */}
        <div className="mt-4">
          <span className="font-mono text-[10px] text-t-dim uppercase tracking-widest">Sowing Calendar</span>
          <div className="flex gap-1 mt-2">
            {months.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <div className="w-full h-6 rounded-sm" style={{ backgroundColor: getMonthColor(i) }} />
                <span className="text-[9px] font-mono text-t-dim mt-1">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {data.drought > 60 && (
          <div className="border-l-4 border-risk-h bg-risk-hbg rounded-r-lg p-3 mt-4 flex items-start gap-2">
            <Zap size={14} className="text-risk-h mt-0.5 shrink-0" />
            <p className="italic text-sm text-risk-h">{data.advisory}</p>
          </div>
        )}
      </div>

      {/* Farmer Journey */}
      <div className="bg-bg-surface border border-bdr rounded-[12px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight size={16} className="text-brand" />
          <span className="font-medium text-t-primary text-sm">Your journey with KisanSuraksha</span>
        </div>

        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-bdr2" />
          {steps.map((s, i) => (
            <div key={i} className="pl-10 relative mb-6">
              <div className={`absolute left-0 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-mono ${
                i === 0 ? 'bg-brand text-bg-base' : 'border border-t-dim text-t-dim'
              }`}>
                {i + 1}
              </div>
              <span className="font-mono text-[10px] text-t-dim">{s.month}</span>
              <p className="font-medium text-sm text-t-primary">{s.title}</p>
              <p className="text-xs text-t-secondary">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-bdr mt-4 pt-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="font-medium text-lg text-t-primary">{data.drought}%</div>
            <div className="text-[10px] text-t-dim">drought risk</div>
          </div>
          <div>
            <div className="font-medium text-lg text-t-primary">₹0</div>
            <div className="text-[10px] text-t-dim">extra cost</div>
          </div>
          <div>
            <div className="font-medium text-lg text-t-primary">72hr</div>
            <div className="text-[10px] text-t-dim">payout</div>
          </div>
        </div>
      </div>
    </div>
  );
}
