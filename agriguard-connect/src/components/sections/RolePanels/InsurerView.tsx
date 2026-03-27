import { Shield, Zap, AlertTriangle, CheckCircle, Waves } from 'lucide-react';
import { DistrictData, TriggerStatus } from '@/lib/types';
import { getRiskColor } from '@/lib/data';
import { useState } from 'react';

interface InsurerViewProps {
  data: DistrictData;
}

function Gauge({ value, max, threshold, unit, label }: { value: number; max: number; threshold: number; unit: string; label: string }) {
  const pct = Math.min(value / max, 1);
  const arcLen = pct * 188.5;
  const belowThreshold = value < threshold;
  const color = belowThreshold ? '#ff5c4a' : '#4dcc80';

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="40" strokeWidth="8" stroke="rgba(255,255,255,0.08)" fill="none"
          strokeDasharray="188.5 251.3" strokeLinecap="round"
          transform="rotate(135 60 60)" />
        <circle cx="60" cy="60" r="40" strokeWidth="8" stroke={color} fill="none"
          strokeDasharray={`${arcLen} 251.3`} strokeLinecap="round"
          transform="rotate(135 60 60)" className="transition-all duration-700" />
        <text x="60" y="58" textAnchor="middle" className="font-mono text-sm" fill="#dfe8dc" fontSize="14">
          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}{unit}
        </text>
        <text x="60" y="74" textAnchor="middle" fill="#445242" fontSize="9" className="font-mono">
          threshold: {threshold}{unit}
        </text>
      </svg>
      <span className="text-[10px] font-mono text-t-dim mt-1">{label}</span>
    </div>
  );
}

function triggerBanner(status: TriggerStatus) {
  switch (status) {
    case 'ARMED': return { bg: 'rgba(255,92,74,0.10)', border: 'rgba(255,92,74,0.25)', icon: Zap, color: '#ff5c4a', text: 'TRIGGER ARMED — Payout ready' };
    case 'MONITOR': return { bg: 'rgba(245,200,64,0.10)', border: 'rgba(245,200,64,0.25)', icon: AlertTriangle, color: '#f5c840', text: 'MONITOR — One condition met' };
    case 'FLOOD_WATCH': return { bg: 'rgba(96,165,250,0.10)', border: 'rgba(96,165,250,0.25)', icon: Waves, color: '#60a5fa', text: 'FLOOD WATCH' };
    default: return { bg: 'rgba(77,204,128,0.10)', border: 'rgba(77,204,128,0.25)', icon: CheckCircle, color: '#4dcc80', text: 'NORMAL — All thresholds clear' };
  }
}

export default function InsurerView({ data }: InsurerViewProps) {
  const [coverage, setCoverage] = useState(10);
  const [crop, setCrop] = useState('Bajra');
  const [season, setSeason] = useState<'Kharif' | 'Rabi'>('Kharif');

  const banner = triggerBanner(data.insuranceTrigger);
  const BannerIcon = banner.icon;

  const riskLoading = Math.min((data.drought / 100) * 15, 15);
  const standardPremium = coverage * 100000 * 0.02;
  const adjusted = Math.round(standardPremium * (1 + riskLoading / 100));

  const beforeAfter = [
    { label: 'Payout timing', before: '6-12 months', after: '72 hours' },
    { label: 'Trigger basis', before: 'Manual CCE survey', after: 'Satellite + soil sensor' },
    { label: 'Basis risk', before: 'High (CCE delay)', after: 'Low (parametric)' },
  ];

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      {/* Trigger Card */}
      <div className="bg-bg-surface border border-bdr rounded-[12px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-amber-400" />
          <span className="font-medium text-t-primary text-sm">PMFBY Parametric Trigger</span>
        </div>

        <div className="rounded-lg p-3 mb-4 flex items-center gap-2" style={{ backgroundColor: banner.bg, border: `1px solid ${banner.border}` }}>
          <BannerIcon size={16} style={{ color: banner.color }} />
          <span className="text-sm font-medium" style={{ color: banner.color }}>{banner.text}</span>
        </div>

        <div className="flex gap-6 justify-center my-4">
          <Gauge value={data.soilMoisture} max={40} threshold={20} unit="%" label="Soil Moisture" />
          <Gauge value={data.ndvi} max={1} threshold={0.30} unit="" label="NDVI Index" />
        </div>

        <div className="space-y-0 mt-4">
          {beforeAfter.map((row, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-bdr text-sm">
              <span className="text-t-secondary w-28">{row.label}</span>
              <span className="text-t-dim italic text-xs">{row.before}</span>
              <span className="text-t-dim mx-2">→</span>
              <span className="text-brand text-xs">{row.after}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Calculator */}
      <div className="bg-bg-surface border border-bdr rounded-[12px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Shield size={16} className="text-amber-400" />
          <span className="font-medium text-t-primary text-sm">Risk-Adjusted Premium Calculator</span>
        </div>

        <div className="space-y-4">
          <div>
            <span className="font-mono text-xs text-t-secondary">Coverage: ₹{coverage} Lakh</span>
            <input type="range" min={1} max={50} value={coverage} onChange={e => setCoverage(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer mt-1"
              style={{ background: `linear-gradient(to right, #58a6ff ${((coverage - 1) / 49) * 100}%, #21262d ${((coverage - 1) / 49) * 100}%)` }} />
          </div>

          <select value={crop} onChange={e => setCrop(e.target.value)}
            className="w-full bg-bg-panel border border-bdr2 text-t-primary rounded-lg px-3 py-2 text-sm font-mono">
            {['Bajra', 'Jowar', 'Sugarcane', 'Cotton', 'Wheat'].map(c => (
              <option key={c} value={c} className="bg-bg-panel">{c}</option>
            ))}
          </select>

          <div className="flex gap-0">
            {(['Kharif', 'Rabi'] as const).map((s, i) => (
              <button key={s} onClick={() => setSeason(s)}
                className={`flex-1 py-1.5 text-sm border transition-colors ${
                  season === s ? 'bg-brand-dim border-brand-border text-brand' : 'bg-transparent border-bdr text-t-secondary'
                } ${i === 0 ? 'rounded-l-lg' : 'rounded-r-lg'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-bg-panel rounded-lg p-4 mt-4 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-t-secondary">Standard premium (2% flat)</span>
            <span className="font-mono text-t-primary">₹{standardPremium.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-t-secondary">Risk loading factor</span>
            <span className="font-mono" style={{ color: riskLoading > 8 ? '#ff5c4a' : '#f5c840' }}>+{riskLoading.toFixed(1)}%</span>
          </div>
          <div className="border-t border-bdr" />
          <div className="flex justify-between items-center">
            <span className="text-t-secondary text-sm">Risk-adjusted premium</span>
            <span className="font-mono text-xl" style={{ color: getRiskColor(data.droughtLevel) }}>₹{adjusted.toLocaleString()}</span>
          </div>
        </div>

        <p className="italic text-xs text-t-secondary mt-3">Premium reflects district-level drought probability applied as a loading factor on base PMFBY rate.</p>
      </div>
    </div>
  );
}
