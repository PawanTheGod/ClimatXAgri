import { AlertTriangle, ArrowDown, ArrowRight, Sprout, Building2, Shield, Leaf, Database, BarChart3, Cpu } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const problems = [
  {
    num: '01',
    title: 'Farmers get no early warning',
    detail: 'A farmer in Marathwada plants sugarcane in June. By October, drought has destroyed the crop. Nobody told him 6 months ago that his district had an 80% drought probability for this year.',
    impact: '₹33,000 Cr crop loss annually in Maharashtra',
  },
  {
    num: '02',
    title: 'Insurance pays after the damage',
    detail: 'PMFBY (govt crop insurance) waits for crop loss to be measured on ground before paying. Payout takes 6–12 months. Farmer has already taken a moneylender loan at 36% interest by then.',
    impact: '6–12 month average payout delay',
  },
  {
    num: '03',
    title: 'Banks and NABARD lend blindly',
    detail: 'NABARD approves Kisan Credit Card loans without knowing if that district will face drought in 2028 or 2032. When farmers default, crores of public money become NPAs (bad loans).',
    impact: '₹87,000 Cr agri-NPAs nationwide',
  },
];

const stakeholders = [
  { role: 'Farmer', icon: Sprout, without: 'No warning, wrong crop planted', with: 'Advisory 6 months before sowing', output: 'Crop switch recommendation' },
  { role: 'Insurer (PMFBY)', icon: Shield, without: '6–12 month manual CCE payout', with: '72-hour parametric auto-trigger', output: 'Satellite-based payout trigger' },
  { role: 'NABARD', icon: Building2, without: 'Blind KCC loan approvals', with: 'Risk-adjusted credit underwriting', output: 'District risk flag for KCC' },
  { role: 'Supplier', icon: Leaf, without: 'Random seed inventory', with: 'Demand-matched pre-positioning', output: 'Seed demand forecast by zone' },
];

const dataStack = [
  { icon: Database, label: 'DiCRA', detail: 'Soil moisture, NDVI, SOC, vulnerability index' },
  { icon: Database, label: 'IMD', detail: '30-year gridded rainfall (1990–2025)' },
  { icon: Database, label: 'NASA POWER', detail: 'Temperature (Tmax/Tmin), evapotranspiration' },
  { icon: Database, label: 'Sentinel-2', detail: 'NDVI at 10m resolution — vegetation health' },
];

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <div className="animate-fade-slide">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="font-mono text-[10px] tracking-[0.15em] text-t-dim uppercase mb-3">
          National Climate Stack Innovation Challenge 2026 · NABARD × Gates Foundation × Dalberg
        </div>
        <h1 className="text-3xl font-semibold text-t-primary tracking-tight">KisanSuraksha</h1>
        <p className="text-t-secondary text-sm mt-1.5 max-w-2xl leading-relaxed">
          AI-powered district-level climate risk forecasting for Maharashtra — aligning farmers, insurers, lenders, and suppliers through one unified intelligence system.
        </p>
      </div>

      {/* ── Problem Statement ──────────────────────────────────── */}
      <div className="mb-8">
        <div className="section-label mb-4">The Problem — What Happens Today</div>
        <div className="grid grid-cols-3 gap-3">
          {problems.map(p => (
            <div key={p.num} className="bg-bg-surface border border-bdr rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[10px] text-risk-h font-medium">{p.num}</span>
                <AlertTriangle size={12} className="text-risk-h" />
              </div>
              <h3 className="font-medium text-sm text-t-primary mb-2">{p.title}</h3>
              <p className="text-xs text-t-secondary leading-relaxed mb-3">{p.detail}</p>
              <div className="border-t border-bdr pt-2">
                <span className="font-mono text-[10px] text-risk-m">{p.impact}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-bg-surface border border-bdr rounded-lg p-4 mt-3">
          <div className="flex items-start gap-3">
            <div className="w-1 h-full min-h-[40px] bg-risk-h rounded-full flex-shrink-0" />
            <div>
              <div className="font-medium text-sm text-t-primary">Root cause — no credible near-term climate hazard forecast exists</div>
              <p className="text-xs text-t-secondary mt-1">Climate data is fragmented. Models are siloed inside institutions. No one has built a district-level 10–15 year risk score that anyone can access via an open API.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Arrow divider ──────────────────────────────────────── */}
      <div className="flex justify-center my-4">
        <ArrowDown size={16} className="text-t-dim" />
      </div>

      {/* ── Our Solution ───────────────────────────────────────── */}
      <div className="mb-8">
        <div className="section-label mb-4">Our Solution — The Coordination Layer</div>
        <p className="text-xs text-t-secondary mb-5 max-w-2xl">
          One AI risk score per district connects all four stakeholders. Each gets a <span className="text-t-primary">decision tool tailored to their role</span> — all powered by the same Random Forest + LSTM prediction model.
        </p>

        {/* Stakeholder cards */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {stakeholders.map(s => {
            const Icon = s.icon;
            return (
              <div key={s.role} className="bg-bg-surface border border-bdr rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Icon size={14} className="text-brand" />
                  <span className="font-medium text-xs text-t-primary">{s.role}</span>
                </div>
                <div className="space-y-2">
                  <div className="bg-risk-hbg border border-risk-hb rounded px-2.5 py-1.5">
                    <span className="font-mono text-[9px] text-t-dim block mb-0.5">WITHOUT</span>
                    <span className="text-[10px] text-risk-h">{s.without}</span>
                  </div>
                  <div className="bg-risk-lbg border border-risk-lb rounded px-2.5 py-1.5">
                    <span className="font-mono text-[9px] text-t-dim block mb-0.5">WITH KISANSURAKSHA</span>
                    <span className="text-[10px] text-risk-l">{s.with}</span>
                  </div>
                </div>
                <div className="border-t border-bdr mt-3 pt-2">
                  <span className="font-mono text-[9px] text-t-dim">Output:</span>
                  <span className="text-[10px] text-brand ml-1">{s.output}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Technical foundation ───────────────────────────────── */}
      <div className="mb-8">
        <div className="section-label mb-4">Technical Foundation</div>
        <div className="grid grid-cols-2 gap-3">
          {/* Data stack */}
          <div className="bg-bg-surface border border-bdr rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Database size={13} className="text-brand" />
              <span className="text-xs font-medium text-t-primary">Data Sources</span>
            </div>
            <div className="space-y-2">
              {dataStack.map(d => (
                <div key={d.label} className="flex items-start gap-2">
                  <span className="font-mono text-[10px] text-brand w-20 flex-shrink-0 pt-0.5">{d.label}</span>
                  <span className="text-[11px] text-t-secondary">{d.detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Model */}
          <div className="bg-bg-surface border border-bdr rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Cpu size={13} className="text-brand" />
              <span className="text-xs font-medium text-t-primary">AI/ML Pipeline</span>
            </div>
            <div className="space-y-2.5">
              <div>
                <span className="font-mono text-[10px] text-brand">Random Forest Classifier</span>
                <p className="text-[11px] text-t-secondary mt-0.5">Input: DiCRA soil moisture + NDVI + rainfall deficit + Tmax → Output: Risk class HIGH/MEDIUM/LOW</p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand">LSTM Time-Series</span>
                <p className="text-[11px] text-t-secondary mt-0.5">Input: 30-yr IMD rainfall + temperature anomalies → Output: Drought probability 2025–2040</p>
              </div>
              <div>
                <span className="font-mono text-[10px] text-brand">Validation</span>
                <p className="text-[11px] text-t-secondary mt-0.5">Hindcasted against Marathwada droughts: 2012, 2015, 2016, 2018 — precision/recall verified</p>
              </div>
            </div>
          </div>
        </div>

        {/* System flow */}
        <div className="bg-bg-surface border border-bdr rounded-lg p-4 mt-3">
          <div className="section-label mb-3">System Flow</div>
          <div className="flex items-center gap-1.5">
            {[
              { label: 'DiCRA + Data', sub: 'Soil, NDVI, Rain' },
              { label: 'AI Model', sub: 'RF + LSTM' },
              { label: 'Risk Score', sub: 'Per District' },
              { label: 'Decision Output', sub: '4 Stakeholders' },
              { label: 'REST API', sub: 'Open Access' },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-1.5 flex-1">
                <div className="bg-bg-panel border border-bdr2 rounded px-3 py-2 text-center flex-1">
                  <div className="font-mono text-[10px] text-t-primary font-medium">{step.label}</div>
                  <div className="text-[9px] text-t-dim mt-0.5">{step.sub}</div>
                </div>
                {i < 4 && <ArrowRight size={12} className="text-t-dim flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <button
        onClick={onGetStarted}
        className="w-full bg-brand text-bg-base font-medium rounded-lg py-3 text-sm hover:bg-brand/90 transition-colors"
      >
        Explore Live Dashboard →
      </button>

      <p className="text-center font-mono text-[10px] text-t-dim mt-3">
        10 Maharashtra districts · 3 hazard types · 4 stakeholder views · REST API
      </p>
    </div>
  );
}
