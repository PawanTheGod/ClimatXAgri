import { Droplets, Waves, Thermometer, Sprout, Building2, Shield, Leaf } from 'lucide-react';
import { Role, Hazard } from '@/lib/types';
import { DISTRICT_NAMES } from '@/lib/data';

interface ControlBarProps {
  district: string;
  year: number;
  hazard: Hazard;
  role: Role;
  onDistrictChange: (d: string) => void;
  onYearChange: (y: number) => void;
  onHazardChange: (h: Hazard) => void;
  onRoleChange: (r: Role) => void;
}

const hazards: { key: Hazard; icon: typeof Droplets; label: string }[] = [
  { key: 'drought', icon: Droplets, label: 'Drought' },
  { key: 'flood', icon: Waves, label: 'Flood' },
  { key: 'heat', icon: Thermometer, label: 'Heat Wave' },
];

const roles: { key: Role; icon: typeof Sprout; label: string }[] = [
  { key: 'farmer', icon: Sprout, label: 'Farmer' },
  { key: 'nabard', icon: Building2, label: 'NABARD' },
  { key: 'insurer', icon: Shield, label: 'Insurer' },
  { key: 'supplier', icon: Leaf, label: 'Supplier' },
];

export default function ControlBar({ district, year, hazard, role, onDistrictChange, onYearChange, onHazardChange, onRoleChange }: ControlBarProps) {
  return (
    <div className="sticky top-12 z-40 bg-bg-surface border-b border-bdr px-6 py-2.5 flex gap-5 items-center flex-wrap">
      {/* District */}
      <div>
        <span className="section-label block mb-1">District</span>
        <select
          value={district}
          onChange={e => onDistrictChange(e.target.value)}
          className="bg-bg-panel border border-bdr2 text-t-primary rounded px-2.5 py-1.5 text-xs font-mono focus:border-brand focus:outline-none appearance-none cursor-pointer min-w-[150px]"
        >
          {DISTRICT_NAMES.map(d => (
            <option key={d} value={d} className="bg-bg-panel">{d}</option>
          ))}
        </select>
      </div>

      {/* Year */}
      <div>
        <div className="flex items-center gap-2">
          <span className="section-label">Forecast</span>
          <span className="font-mono text-xs text-brand font-medium">{year}</span>
        </div>
        <input
          type="range" min={2025} max={2039} step={1} value={year}
          onChange={e => onYearChange(Number(e.target.value))}
          className="w-[140px] h-1 rounded-full appearance-none cursor-pointer mt-1"
          style={{ background: `linear-gradient(to right, #58a6ff ${((year - 2025) / 14) * 100}%, #21262d ${((year - 2025) / 14) * 100}%)` }}
        />
      </div>

      {/* Hazard */}
      <div>
        <span className="section-label block mb-1">Hazard Type</span>
        <div className="flex">
          {hazards.map((h, i) => {
            const active = hazard === h.key;
            const Icon = h.icon;
            return (
              <button
                key={h.key}
                onClick={() => onHazardChange(h.key)}
                className={`flex items-center gap-1 px-2.5 py-1 text-xs border ${
                  i === 0 ? 'rounded-l' : i === 2 ? 'rounded-r' : ''
                } ${
                  active ? 'bg-brand-dim border-brand-border text-brand' : 'bg-transparent border-bdr text-t-secondary hover:text-t-primary'
                } ${i > 0 ? '-ml-px' : ''}`}
              >
                <Icon size={12} />
                {h.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stakeholder */}
      <div>
        <span className="section-label block mb-1">Stakeholder View</span>
        <div className="flex gap-1.5">
          {roles.map(r => {
            const active = role === r.key;
            const Icon = r.icon;
            return (
              <button
                key={r.key}
                onClick={() => onRoleChange(r.key)}
                className={`flex items-center gap-1 rounded px-2.5 py-1 text-xs ${
                  active ? 'bg-brand text-bg-base font-medium' : 'bg-bg-panel border border-bdr2 text-t-secondary hover:text-t-primary'
                }`}
              >
                <Icon size={12} />
                {r.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
