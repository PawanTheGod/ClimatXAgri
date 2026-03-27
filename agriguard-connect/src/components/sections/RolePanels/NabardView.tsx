import { Building2 } from 'lucide-react';
import { DistrictData } from '@/lib/types';
import { DISTRICTS_DATA, getRiskColor } from '@/lib/data';
import { useState } from 'react';

interface NabardViewProps {
  data: DistrictData;
  district: string;
  year: number;
}

export default function NabardView({ data, district, year }: NabardViewProps) {
  const [portfolio, setPortfolio] = useState(100);

  const flagColor = getRiskColor(data.kccRisk);
  const flagText = data.kccRisk === 'HIGH' ? 'HIGH RISK ZONE' : data.kccRisk === 'MEDIUM' ? 'MODERATE RISK' : 'LOW RISK';

  const atRisk = (portfolio * data.drought / 100 * 0.4).toFixed(1);
  const saved = (portfolio * data.drought / 100 * 0.4 * data.kccReduction / 100).toFixed(1);

  // Sort all districts by drought DESC
  const sorted = Object.entries(DISTRICTS_DATA).sort(([, a], [, b]) => b.drought - a.drought);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      {/* KCC Risk Assessment */}
      <div className="bg-bg-surface border border-bdr rounded-[12px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={16} className="text-blue-400" />
          <span className="font-medium text-t-primary text-sm">Kisan Credit Card Risk Assessment</span>
        </div>

        <div className="font-display italic text-4xl" style={{ color: flagColor }}>{flagText}</div>
        <p className="text-sm text-t-secondary mt-1">Based on {year - 2025 + 10}-year projection</p>

        <div className="bg-bg-panel border border-bdr rounded-lg p-4 mt-4">
          <span className="font-mono text-[10px] tracking-widest text-t-dim uppercase">Recommended KCC Adjustments</span>
          {[
            { label: 'KCC ceiling reduction', value: `${data.kccReduction}%`, color: data.kccReduction > 20 ? '#ff5c4a' : data.kccReduction > 10 ? '#f5c840' : '#4dcc80' },
            { label: 'Crop diversification', value: data.kccReduction > 15 ? 'REQUIRED' : 'OPTIONAL', color: data.kccReduction > 15 ? '#f5c840' : '#445242' },
            { label: 'Climate stress buffer', value: `+${data.stressBuffer}%`, color: '#f5c840' },
            { label: 'Review cycle', value: data.kccRisk === 'HIGH' ? 'Annual' : 'Biannual', color: '#7d8f7a' },
          ].map((row, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b border-bdr text-sm">
              <span className="text-t-secondary">{row.label}</span>
              <span className="font-mono text-xs" style={{ color: row.color }}>{row.value}</span>
            </div>
          ))}
        </div>

        <div className="bg-bg-panel rounded-lg p-4 mt-4">
          <span className="font-mono text-xs text-t-secondary">Portfolio exposure calculator</span>
          <div className="mt-2">
            <span className="font-mono text-xs text-t-dim">Portfolio: ₹{portfolio} Cr</span>
            <input
              type="range" min={10} max={500} step={10} value={portfolio}
              onChange={e => setPortfolio(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer mt-1"
              style={{ background: `linear-gradient(to right, #58a6ff ${((portfolio - 10) / 490) * 100}%, #21262d ${((portfolio - 10) / 490) * 100}%)` }}
            />
          </div>
          <div className="flex gap-3 mt-3 flex-wrap">
            <span className="bg-[rgba(255,255,255,0.04)] rounded-lg px-3 py-1.5 text-xs font-mono text-t-primary">₹{portfolio} Cr total</span>
            <span className="bg-risk-hbg rounded-lg px-3 py-1.5 text-xs font-mono text-risk-h">₹{atRisk} Cr at risk</span>
            <span className="bg-risk-lbg rounded-lg px-3 py-1.5 text-xs font-mono text-risk-l">₹{saved} Cr saved</span>
          </div>
        </div>
      </div>

      {/* District Rankings */}
      <div className="bg-bg-surface border border-bdr rounded-[12px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={16} className="text-blue-400" />
          <span className="font-medium text-t-primary text-sm">District Rankings</span>
        </div>

        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="font-mono text-[10px] text-t-dim uppercase tracking-wider">
                <th className="text-left py-1 pr-2">#</th>
                <th className="text-left py-1">District</th>
                <th className="text-left py-1">Drought</th>
                <th className="text-left py-1">KCC Flag</th>
                <th className="text-left py-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(([name, d], i) => {
                const isSelected = name === district;
                const bgRow = d.droughtLevel === 'HIGH' ? 'rgba(255,92,74,0.04)' : d.droughtLevel === 'MEDIUM' ? 'rgba(245,200,64,0.04)' : 'transparent';
                return (
                  <tr key={name} className={`text-sm ${isSelected ? 'border-l-2 border-brand font-medium' : ''}`} style={{ backgroundColor: bgRow }}>
                    <td className="py-1.5 pr-2 text-t-dim font-mono text-xs">{i + 1}</td>
                    <td className="py-1.5 text-t-primary">{name}</td>
                    <td className="py-1.5 font-mono text-xs" style={{ color: getRiskColor(d.droughtLevel) }}>{d.drought}%</td>
                    <td className="py-1.5">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ color: getRiskColor(d.kccRisk), backgroundColor: d.kccRisk === 'HIGH' ? 'rgba(255,92,74,0.1)' : d.kccRisk === 'MEDIUM' ? 'rgba(245,200,64,0.1)' : 'rgba(77,204,128,0.1)' }}>
                        {d.kccRisk}
                      </span>
                    </td>
                    <td className="py-1.5 text-xs text-t-secondary">-{d.kccReduction}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
