import { Droplets, Waves, Thermometer } from 'lucide-react';
import { DistrictData, Hazard, RiskLevel } from '@/lib/types';
import { getRiskColor, getRiskBg, getRiskBorder } from '@/lib/data';
import { useCountAnimation } from '@/hooks/useCountAnimation';

interface RiskScoreStripProps {
  data: DistrictData;
  hazard: Hazard;
  district: string;
  onHazardChange: (h: Hazard) => void;
}

function RiskCard({ label, icon: Icon, pct, level, isActive, onClick, district }: {
  label: string; icon: typeof Droplets; pct: number; level: RiskLevel; isActive: boolean; onClick: () => void; district: string;
}) {
  const color = getRiskColor(level);
  const animatedValue = useCountAnimation(pct, 500);

  return (
    <div
      onClick={onClick}
      className={`bg-bg-surface border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
        isActive ? 'border-brand/30 ring-1 ring-brand/10' : 'border-bdr hover:border-bdr2'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <Icon size={13} style={{ color }} />
          <span className="font-mono text-[10px] tracking-wider text-t-dim uppercase">{label}</span>
        </div>
        <span
          className="font-mono text-[9px] px-1.5 py-0.5 rounded border"
          style={{ color, backgroundColor: getRiskBg(level), borderColor: getRiskBorder(level) }}
        >
          {level}
        </span>
      </div>

      <div key={district + label} className="animate-count">
        <span className="text-4xl font-semibold tabular-nums tracking-tight" style={{ color }}>
          {animatedValue}
        </span>
        <span className="text-lg text-t-dim ml-0.5">%</span>
      </div>

      <div className="text-[10px] text-t-dim mt-1 font-mono">probability by forecast year</div>

      <div className="h-[2px] bg-bg-hover rounded-full mt-3">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function RiskScoreStrip({ data, hazard, district, onHazardChange }: RiskScoreStripProps) {
  const cards: { key: Hazard; label: string; icon: typeof Droplets; pct: number; level: RiskLevel }[] = [
    { key: 'drought', label: 'Drought', icon: Droplets, pct: data.drought, level: data.droughtLevel },
    { key: 'flood', label: 'Flood', icon: Waves, pct: data.flood, level: data.floodLevel },
    { key: 'heat', label: 'Heat Wave', icon: Thermometer, pct: data.heat, level: data.heatLevel },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {cards.map(c => (
        <RiskCard
          key={c.key} label={c.label} icon={c.icon} pct={c.pct} level={c.level}
          isActive={hazard === c.key} onClick={() => onHazardChange(c.key)} district={district}
        />
      ))}
    </div>
  );
}
