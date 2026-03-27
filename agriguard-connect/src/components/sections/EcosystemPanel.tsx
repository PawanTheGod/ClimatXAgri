import { Sprout, Building2, Shield, Leaf } from 'lucide-react';
import { DistrictData } from '@/lib/types';
import { getRiskColor } from '@/lib/data';

interface EcosystemPanelProps {
  data: DistrictData;
  district: string;
}

const nodePositions = [
  { top: '0', left: '50%', transform: 'translate(-50%, 0)' },
  { top: '50%', right: '0', transform: 'translate(0, -50%)' },
  { bottom: '0', left: '50%', transform: 'translate(-50%, 0)' },
  { top: '50%', left: '0', transform: 'translate(0, -50%)' },
];

const nodeEndpoints = [
  { x: 200, y: 35 },
  { x: 365, y: 160 },
  { x: 200, y: 285 },
  { x: 35, y: 160 },
];

export default function EcosystemPanel({ data, district }: EcosystemPanelProps) {
  const riskColor = getRiskColor(data.droughtLevel);

  const nodes = [
    { role: 'Farmer', icon: Sprout, status: data.droughtLevel === 'HIGH' ? `Advisory: Switch to ${data.primaryCrop}` : data.droughtLevel === 'MEDIUM' ? 'Advisory: Monitor' : 'Normal planting' },
    { role: 'NABARD', icon: Building2, status: `KCC flag: ${data.kccRisk} · –${data.kccReduction}%` },
    { role: 'Insurer', icon: Shield, status: data.insuranceTrigger === 'ARMED' ? 'Trigger armed · Payout ready' : data.insuranceTrigger === 'MONITOR' ? 'Monitor · 1 condition met' : 'Clear' },
    { role: 'Supplier', icon: Leaf, status: `Pre-positioning ${data.primaryCrop.split('/')[0].trim()} stock` },
  ];

  const beforeAfter = [
    { role: 'Farmer', icon: Sprout, before: 'No warning, wrong crop', after: 'Advisory 6 months early' },
    { role: 'NABARD', icon: Building2, before: 'Blind KCC lending', after: 'Risk-adjusted credit' },
    { role: 'Insurer', icon: Shield, before: '6–12 month CCE payout', after: '72hr auto-trigger' },
    { role: 'Supplier', icon: Leaf, before: 'Random seed inventory', after: 'Demand-matched stocking' },
  ];

  return (
    <div className="bg-bg-surface border border-bdr rounded-lg p-6">
      <div className="text-center mb-6">
        <div className="section-label mb-2">Ecosystem Interdependency</div>
        <h2 className="text-xl font-semibold text-t-primary">The coordination layer</h2>
        <p className="text-xs text-t-secondary mt-1">How one risk score connects four stakeholders in real time</p>
      </div>

      {/* Visual */}
      <div className="relative h-[300px] mx-auto max-w-[420px]">
        {/* Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full flex flex-col items-center justify-center text-center z-10 border border-brand/30 bg-brand-dim">
          <span className="font-mono text-[8px] text-brand tracking-widest uppercase">KisanSuraksha</span>
          <span className="font-medium text-xs text-t-primary mt-0.5">{district}</span>
          <span className="font-mono text-[10px] mt-0.5" style={{ color: riskColor }}>Risk: {data.drought}%</span>
        </div>

        {/* Dashed ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32">
          <svg viewBox="0 0 128 128" className="w-full h-full">
            <circle cx="64" cy="64" r="62" fill="none" stroke="rgba(88,166,255,0.15)" strokeWidth="1"
              strokeDasharray="4 3" className="animate-dash-flow" />
          </svg>
        </div>

        {/* Lines */}
        <svg className="absolute inset-0 pointer-events-none overflow-visible" viewBox="0 0 400 320">
          {nodeEndpoints.map((ep, i) => (
            <line key={i} x1="200" y1="160" x2={ep.x} y2={ep.y}
              stroke={riskColor} strokeWidth="1" strokeDasharray="4 3" opacity="0.4"
              className="animate-dash-flow" />
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node, i) => {
          const Icon = node.icon;
          const pos = nodePositions[i];
          return (
            <div key={node.role} className="absolute w-32 bg-bg-panel border border-bdr rounded-lg p-2.5 text-center z-10"
              style={{ ...pos, borderColor: `rgba(88,166,255,0.12)` } as React.CSSProperties}>
              <Icon size={16} className="text-brand mx-auto" />
              <div className="font-medium text-xs text-t-primary mt-1">{node.role}</div>
              <div className="text-[9px] text-t-secondary mt-0.5">{node.status}</div>
            </div>
          );
        })}
      </div>

      {/* Before / After */}
      <div className="bg-bg-panel rounded-lg p-4 mt-4">
        <div className="section-label mb-3">Impact Comparison</div>
        <div className="grid grid-cols-4 max-md:grid-cols-2 gap-3">
          {beforeAfter.map(item => {
            const Icon = item.icon;
            return (
              <div key={item.role} className="text-center">
                <Icon size={14} className="mx-auto text-t-secondary mb-1" />
                <div className="text-[11px] font-medium text-t-primary mb-2">{item.role}</div>
                <div className="bg-risk-hbg border border-risk-hb rounded px-2 py-1.5 mb-1.5">
                  <span className="font-mono text-[8px] text-t-dim block">WITHOUT</span>
                  <span className="text-[9px] text-risk-h">{item.before}</span>
                </div>
                <div className="bg-risk-lbg border border-risk-lb rounded px-2 py-1.5">
                  <span className="font-mono text-[8px] text-t-dim block">WITH</span>
                  <span className="text-[9px] text-risk-l">{item.after}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
