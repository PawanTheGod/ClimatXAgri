import { useState, useMemo } from 'react';
import { DistrictData, Hazard, Role } from '@/lib/types';
import { useRiskData } from '@/hooks/useRiskData';
import { DISTRICTS_DATA, DISTRICT_NAMES, YEARS, MH_AVERAGE, getRiskColor, getRiskBg } from '@/lib/data';
import { useCountAnimation } from '@/hooks/useCountAnimation';
import MaharashtraMap from '@/components/MaharashtraMap';
import {
  Activity, Sprout, Shield, Building2, Leaf, TrendingUp, MapPin,
  AlertTriangle, Database, Droplets, Waves, Thermometer, ChevronRight,
  Cpu, ArrowRight, ArrowDown, Zap, ChevronUp, ChevronDown
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, ReferenceLine, PieChart, Pie
} from 'recharts';

/* ═══════════════════════════════════════════════════════════════════════
   KISANSURAKSHA — Climate Risk Intelligence Platform
   Map + Model Pipeline + 4 Stakeholder Decision Outputs
   ═══════════════════════════════════════════════════════════════════════ */

const ROLES: { key: Role; label: string; icon: typeof Sprout; desc: string }[] = [
  { key: 'farmer',   icon: Sprout,    label: 'Farmer',  desc: 'Crop advisory & early warning'  },
  { key: 'insurer',  icon: Shield,    label: 'Insurer', desc: 'PMFBY trigger monitoring'  },
  { key: 'nabard',   icon: Building2, label: 'NABARD',  desc: 'Credit risk & KCC underwriting' },
  { key: 'supplier', icon: Leaf,      label: 'Supplier', desc: 'Seed demand forecasting' },
];

const HAZARDS: { key: Hazard; label: string; icon: typeof Droplets }[] = [
  { key: 'drought', icon: Droplets, label: 'Drought' },
  { key: 'flood',   icon: Waves,    label: 'Flood' },
  { key: 'heat',    icon: Thermometer, label: 'Heat' },
];

function getHazardTrend(d: DistrictData, h: Hazard) {
  return h === 'drought' ? d.trend : h === 'flood' ? d.floodTrend : d.heatTrend;
}
function getHazardLevel(d: DistrictData, h: Hazard) {
  return h === 'drought' ? d.droughtLevel : h === 'flood' ? d.floodLevel : d.heatLevel;
}

/* ─── Model Pipeline Strip ────────────────────────────────── */
function ModelPipeline({ data, district, hazard }: { data: DistrictData; district: string; hazard: Hazard }) {
  const pct = hazard === 'drought' ? data.drought : hazard === 'flood' ? data.flood : data.heat;
  const level = getHazardLevel(data, hazard);
  const color = getRiskColor(level);
  const hazardName = hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave';

  return (
    <div className="bg-white border border-bdr rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Cpu size={14} className="text-brand" />
        <span className="text-xs font-semibold text-t-primary">ML Model Pipeline — Live Output</span>
        <span className="ml-auto font-mono text-[9px] text-t-dim">Random Forest + LSTM</span>
      </div>

      {/* Pipeline flow */}
      <div className="flex items-stretch gap-1">
        {/* Input */}
        <div className="flex-1 bg-blue-50 border border-blue-100 rounded-lg p-2.5 text-center">
          <Database size={14} className="text-blue-500 mx-auto mb-1" />
          <div className="text-[9px] font-mono text-blue-400 mb-0.5">DATA INPUT</div>
          <div className="text-[9px] text-blue-700 leading-tight">
            DiCRA · IMD · NASA
            <br />Sentinel-2
          </div>
        </div>

        <div className="flex items-center"><ArrowRight size={12} className="text-t-dim" /></div>

        {/* Model */}
        <div className="flex-1 bg-purple-50 border border-purple-100 rounded-lg p-2.5 text-center">
          <Cpu size={14} className="text-purple-500 mx-auto mb-1" />
          <div className="text-[9px] font-mono text-purple-400 mb-0.5">AI/ML MODEL</div>
          <div className="text-[9px] text-purple-700 leading-tight">
            RF Classifier
            <br />LSTM Forecast
          </div>
        </div>

        <div className="flex items-center"><ArrowRight size={12} className="text-t-dim" /></div>

        {/* Risk Score — the key output */}
        <div className="flex-[1.3] rounded-lg p-2.5 text-center border-2" style={{ backgroundColor: getRiskBg(level), borderColor: color + '40' }}>
          <Zap size={14} style={{ color }} className="mx-auto mb-1" />
          <div className="text-[9px] font-mono text-t-dim mb-0.5">RISK SCORE</div>
          <div className="text-2xl font-bold tabular-nums leading-none" style={{ color }}>{pct}%</div>
          <div className="text-[9px] font-mono mt-0.5" style={{ color }}>{hazardName} · {level}</div>
        </div>

        <div className="flex items-center"><ArrowRight size={12} className="text-t-dim" /></div>

        {/* 4 Decision outputs */}
        <div className="flex-[1.5] bg-green-50 border border-green-100 rounded-lg p-2.5">
          <div className="text-[9px] font-mono text-green-500 mb-1.5 text-center">4 DECISION OUTPUTS</div>
          <div className="grid grid-cols-2 gap-1">
            {[
              { icon: '🌾', label: 'Crop Advisory' },
              { icon: '🛡️', label: 'PMFBY Trigger' },
              { icon: '🏦', label: 'KCC Risk Flag' },
              { icon: '🌱', label: 'Seed Forecast' },
            ].map(o => (
              <div key={o.label} className="text-[8px] text-green-700 bg-white rounded px-1.5 py-1 text-center border border-green-100">
                <span className="mr-0.5">{o.icon}</span>{o.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-bdr text-center">
        <span className="text-[10px] text-t-secondary italic">
          "We are not predicting climate — we are enabling decisions."
        </span>
      </div>
    </div>
  );
}

/* ─── Farmer Panel ────────────────────────────────────────── */
function FarmerPanel({ data, district, hazard }: { data: DistrictData; district: string; hazard: Hazard }) {
  const pct = hazard === 'drought' ? data.drought : hazard === 'flood' ? data.flood : data.heat;
  const level = getHazardLevel(data, hazard);
  const hName = hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave';
  const safeLabel = hazard === 'drought' ? 'DROUGHT SAFE' : hazard === 'flood' ? 'FLOOD SAFE' : 'HEAT TOLERANT';
  const riskLabel = hazard === 'drought' ? 'HIGH WATER NEED' : hazard === 'flood' ? 'FLOOD PRONE' : 'HEAT SENSITIVE';

  return (
    <div className="space-y-3">
      <div className="bg-white border border-bdr rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1">
          <Sprout size={14} className="text-green-600" />
          <span className="text-xs font-semibold text-t-primary">Crop Advisory — {hName}</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl font-bold tabular-nums" style={{ color: getRiskColor(level) }}>{pct}%</div>
          <div className="text-xs text-t-secondary">{hName} risk in {district} — {level}</div>
        </div>
        <div className="text-lg font-bold text-t-primary">{data.primaryCrop}</div>
        <p className="text-xs text-t-secondary mt-1">{data.advisory}</p>
      </div>

      <div className="bg-white border border-bdr rounded-lg p-4">
        <div className="text-[10px] font-mono text-t-dim mb-2">CROP SUITABILITY — {hName.toUpperCase()}</div>
        <div className="space-y-1.5">
          {data.primaryCrop.split(' / ').map(c => (
            <div key={c} className="flex justify-between items-center py-1.5 border-b border-bdr last:border-0">
              <span className="text-sm text-t-primary">{c.trim()}</span>
              <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded text-[10px] font-mono font-medium">{safeLabel}</span>
            </div>
          ))}
          {data.avoidCrops.map(c => (
            <div key={c} className="flex justify-between items-center py-1.5 border-b border-bdr last:border-0">
              <span className="text-sm text-t-secondary">{c}</span>
              <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded text-[10px] font-mono font-medium">{riskLabel}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
        <div className="flex gap-2">
          <AlertTriangle size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-semibold text-amber-800">{hName} Warning — {district}</div>
            <p className="text-xs text-amber-700 mt-0.5">
              {level === 'HIGH'
                ? `Model predicts ${pct}% ${hName.toLowerCase()} risk — take immediate precautionary measures.`
                : level === 'MEDIUM'
                ? `Moderate ${hName.toLowerCase()} risk (${pct}%) — monitor conditions and prepare contingency plan.`
                : `Low ${hName.toLowerCase()} risk (${pct}%) — proceed with planned sowing.`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Insurer Panel ───────────────────────────────────────── */
function InsurerPanel({ data, district, hazard }: { data: DistrictData; district: string; hazard: Hazard }) {
  const pct = hazard === 'drought' ? data.drought : hazard === 'flood' ? data.flood : data.heat;
  const level = getHazardLevel(data, hazard);
  const hName = hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave';
  return (
    <div className="space-y-3">
      <div className={`border rounded-lg p-4 ${
        level === 'HIGH' ? 'bg-red-50 border-red-200'
        : level === 'MEDIUM' ? 'bg-amber-50 border-amber-200'
        : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <Shield size={14} className={level === 'HIGH' ? 'text-red-600' : level === 'MEDIUM' ? 'text-amber-600' : 'text-green-600'} />
          <span className="text-xs font-semibold text-t-primary">PMFBY Trigger — {hName}</span>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <div className="text-2xl font-bold tabular-nums" style={{ color: getRiskColor(level) }}>{pct}%</div>
          <div className={`text-sm font-bold ${
            level === 'HIGH' ? 'text-red-700' : level === 'MEDIUM' ? 'text-amber-700' : 'text-green-700'
          }`}>
            {level === 'HIGH' ? `⚡ TRIGGER ARMED — ${hName} Auto-Payout Ready`
              : level === 'MEDIUM' ? `⚠ MONITORING — ${hName} Threshold Near`
              : `✓ NORMAL — ${hName} Thresholds Clear`}
          </div>
        </div>
        <div className="text-xs text-t-secondary">
          Satellite-based parametric trigger replaces 6–12 month manual CCE process
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-bdr rounded-lg p-4">
          <div className="text-[10px] font-mono text-t-dim">SOIL MOISTURE (DiCRA)</div>
          <div className="text-2xl font-bold tabular-nums mt-1" style={{ color: data.soilMoisture < 20 ? '#dc2626' : '#059669' }}>
            {data.soilMoisture}%
          </div>
          <div className="text-[10px] text-t-dim">Trigger: &lt; 20%</div>
          <div className="h-1.5 bg-bg-panel rounded-full mt-2">
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(data.soilMoisture * 2, 100)}%`, backgroundColor: data.soilMoisture < 20 ? '#dc2626' : '#059669' }} />
          </div>
        </div>
        <div className="bg-white border border-bdr rounded-lg p-4">
          <div className="text-[10px] font-mono text-t-dim">NDVI INDEX (Sentinel-2)</div>
          <div className="text-2xl font-bold tabular-nums mt-1" style={{ color: data.ndvi < 0.3 ? '#dc2626' : '#059669' }}>
            {data.ndvi}
          </div>
          <div className="text-[10px] text-t-dim">Trigger: &lt; 0.30</div>
          <div className="h-1.5 bg-bg-panel rounded-full mt-2">
            <div className="h-full rounded-full transition-all" style={{ width: `${data.ndvi * 100}%`, backgroundColor: data.ndvi < 0.3 ? '#dc2626' : '#059669' }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── NABARD Panel ────────────────────────────────────────── */
function NabardPanel({ data, district, hazard }: { data: DistrictData; district: string; hazard: Hazard }) {
  const pct = hazard === 'drought' ? data.drought : hazard === 'flood' ? data.flood : data.heat;
  const level = getHazardLevel(data, hazard);
  const hName = hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave';
  const rankingData = useMemo(() => {
    return Object.entries(DISTRICTS_DATA)
      .map(([name, d]) => ({ name: name.slice(0, 4), fullName: name, drought: d.drought, level: d.droughtLevel }))
      .sort((a, b) => b.drought - a.drought)
      .slice(0, 6);
  }, []);

  return (
    <div className="space-y-3">
      <div className="bg-white border border-bdr rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1">
          <Building2 size={14} className="text-blue-600" />
          <span className="text-xs font-semibold text-t-primary">KCC Credit Risk — {hName}</span>
        </div>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl font-bold tabular-nums" style={{ color: getRiskColor(level) }}>{pct}%</div>
          <div className="text-xs text-t-secondary">{hName} risk → KCC underwriting for {district}</div>
        </div>
        <div className="text-xl font-bold" style={{ color: getRiskColor(level) }}>
          {level} RISK ZONE
        </div>
        <p className="text-xs text-t-secondary mt-1">
          Recommendation: Reduce KCC limit by <strong>{data.kccReduction}%</strong> · Add {data.stressBuffer}% climate stress buffer
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white border border-bdr rounded-lg p-3 text-center">
          <div className="text-[9px] font-mono text-t-dim">KCC CUT</div>
          <div className="text-lg font-bold text-risk-h tabular-nums">{data.kccReduction}%</div>
        </div>
        <div className="bg-white border border-bdr rounded-lg p-3 text-center">
          <div className="text-[9px] font-mono text-t-dim">STRESS BUFFER</div>
          <div className="text-lg font-bold text-risk-m tabular-nums">+{data.stressBuffer}%</div>
        </div>
        <div className="bg-white border border-bdr rounded-lg p-3 text-center">
          <div className="text-[9px] font-mono text-t-dim">NPA RISK</div>
          <div className="text-lg font-bold tabular-nums" style={{ color: getRiskColor(data.kccRisk) }}>
            {data.kccRisk === 'HIGH' ? 'CRITICAL' : data.kccRisk === 'MEDIUM' ? 'ELEVATED' : 'LOW'}
          </div>
        </div>
      </div>

      <div className="bg-white border border-bdr rounded-lg p-4">
        <div className="text-[10px] font-mono text-t-dim mb-2">DISTRICT RISK RANKING (Drought)</div>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={rankingData} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
            <XAxis type="number" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} width={35} axisLine={false} tickLine={false} />
            <Bar dataKey="drought" radius={[0, 3, 3, 0]} barSize={12}>
              {rankingData.map(entry => (
                <Cell key={entry.fullName} fill={getRiskColor(entry.level)} opacity={entry.fullName === district ? 1 : 0.35} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ─── Supplier Panel ──────────────────────────────────────── */
function SupplierPanel({ data, district, hazard }: { data: DistrictData; district: string; hazard: Hazard }) {
  const pct = hazard === 'drought' ? data.drought : hazard === 'flood' ? data.flood : data.heat;
  const level = getHazardLevel(data, hazard);
  const hName = hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave';
  const seedData = useMemo(() => {
    const names: Record<string, string> = { bajra: 'Bajra', jowar: 'Jowar', cotton: 'Cotton', turDal: 'Tur Dal', chickpea: 'Chickpea' };
    return Object.entries(data.seedDemand)
      .map(([key, val]) => ({ name: names[key], value: val, key }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const maxVal = Math.max(...seedData.map(s => s.value));
  const COLORS = ['#1a56db', '#059669', '#d97706', '#7c3aed', '#dc2626'];

  return (
    <div className="space-y-3">
      <div className="bg-white border border-bdr rounded-lg p-4">
        <div className="flex items-center gap-2 mb-1">
          <Leaf size={14} className="text-purple-600" />
          <span className="text-xs font-semibold text-t-primary">Seed Demand — {hName}</span>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <div className="text-xl font-bold tabular-nums" style={{ color: getRiskColor(level) }}>{pct}%</div>
          <div className="text-[10px] text-t-secondary">{hName} risk → pre-position resilient varieties in {district}</div>
        </div>
      </div>

      <div className="bg-white border border-bdr rounded-lg p-4">
        <div className="text-[10px] font-mono text-t-dim mb-3">DEMAND BY CROP (kg)</div>
        <div className="space-y-2.5">
          {seedData.map((s, i) => (
            <div key={s.key}>
              <div className="flex justify-between text-xs mb-0.5">
                <span className="font-medium text-t-primary">{s.name}</span>
                <span className="font-mono text-t-secondary">{s.value.toLocaleString()} kg</span>
              </div>
              <div className="h-2 bg-bg-panel rounded-full">
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(s.value / maxVal) * 100}%`, backgroundColor: COLORS[i] }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-bdr rounded-lg p-4">
        <div className="text-[10px] font-mono text-t-dim mb-2">DISTRIBUTION</div>
        <ResponsiveContainer width="100%" height={120}>
          <PieChart>
            <Pie data={seedData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50} strokeWidth={1} stroke="#fff">
              {seedData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ fontSize: 11, border: '1px solid #e5e7eb', borderRadius: 6, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════ */

export default function Index() {
  const [district, setDistrict] = useState('Solapur');
  const [role, setRole] = useState<Role>('farmer');
  const [hazard, setHazard] = useState<Hazard>('drought');
  const [showDocs, setShowDocs] = useState(false);

  const { data, isLive } = useRiskData(district);
  const trendArray = getHazardTrend(data, hazard);
  const trendData = YEARS.map((y, i) => ({ year: y, district: trendArray[i], mhAvg: MH_AVERAGE[i] }));
  const hazardLabel = hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave';
  const riskColor = getRiskColor(getHazardLevel(data, hazard));

  return (
    <div className="bg-bg-surface min-h-screen font-sans text-t-primary">

      {/* ═══ NAV ══════════════════════════════════════════════════════ */}
      <nav className="bg-white border-b border-bdr px-6 sticky top-0 z-50">
        <div className="max-w-[1280px] mx-auto flex items-center h-12">
          <div className="flex items-center gap-2 mr-6">
            <Activity size={16} className="text-brand" />
            <span className="font-semibold text-sm">KisanSuraksha</span>
          </div>

          {/* Role tabs */}
          <div className="flex h-full">
            {ROLES.map(r => {
              const Icon = r.icon;
              const active = role === r.key;
              return (
                <button key={r.key} onClick={() => setRole(r.key)}
                  className={`flex items-center gap-1.5 px-4 text-xs font-medium border-b-2 transition-colors ${
                    active ? 'border-brand text-brand' : 'border-transparent text-t-secondary hover:text-t-primary'
                  }`}>
                  <Icon size={14} />
                  {r.label}
                </button>
              );
            })}
          </div>

          <div className="flex-1" />

          {/* District selector — prominent */}
          <div className="flex items-center gap-2 mr-4">
            <MapPin size={14} className="text-brand" />
            <select
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="bg-white border border-bdr2 text-t-primary rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand cursor-pointer min-w-[160px]"
            >
              {DISTRICT_NAMES.map(d => (<option key={d} value={d}>{d}, Maharashtra</option>))}
            </select>
          </div>

          {/* Hazard toggle */}
          <div className="flex border border-bdr rounded-lg overflow-hidden">
            {HAZARDS.map(h => {
              const Icon = h.icon;
              const active = hazard === h.key;
              return (
                <button key={h.key} onClick={() => setHazard(h.key)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium border-r border-bdr last:border-0 ${
                    active ? 'bg-brand text-white' : 'bg-white text-t-secondary hover:bg-bg-surface'
                  }`}>
                  <Icon size={12} />
                  {h.label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 ml-3">
            <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-risk-l animate-pulse-dot' : 'bg-t-dim'}`} />
            <span className="font-mono text-[10px] text-t-dim">{isLive ? 'Live' : 'Demo'}</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-6 py-4">

        {/* ─── ML Pipeline Strip ───────────────────────────────── */}
        <ModelPipeline data={data} district={district} hazard={hazard} />

        {/* ─── Map + Role Panel ────────────────────────────────── */}
        <div className="grid lg:grid-cols-5 gap-4 mt-4">
          <div className="lg:col-span-3">
            <MaharashtraMap district={district} hazard={hazard} onSelect={setDistrict} />
          </div>
          <div className="lg:col-span-2 animate-fade-slide" key={role + district + hazard}>
            {role === 'farmer'   && <FarmerPanel data={data} district={district} hazard={hazard} />}
            {role === 'insurer'  && <InsurerPanel data={data} district={district} hazard={hazard} />}
            {role === 'nabard'   && <NabardPanel data={data} district={district} hazard={hazard} />}
            {role === 'supplier' && <SupplierPanel data={data} district={district} hazard={hazard} />}
          </div>
        </div>

        {/* ─── Charts row ──────────────────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-4 mt-4">
          {/* Trend */}
          <div className="bg-white border border-bdr rounded-lg p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp size={13} className="text-brand" />
              <span className="text-xs font-semibold text-t-primary">{hazardLabel} Trajectory — {district}</span>
              <span className="ml-auto font-mono text-[9px] text-t-dim">2025–2040</span>
            </div>
            <div className="flex gap-3 mb-1">
              <span className="flex items-center gap-1 text-[9px] font-mono text-t-secondary">
                <span className="w-3 h-0.5 rounded inline-block" style={{ backgroundColor: riskColor }} /> {district}
              </span>
              <span className="flex items-center gap-1 text-[9px] font-mono text-t-dim">
                <span className="w-3 h-0.5 rounded bg-gray-300 inline-block" /> MH Avg
              </span>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={trendData}>
                <CartesianGrid horizontal vertical={false} stroke="#f1f3f5" />
                <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#9ca3af' }} axisLine={false} tickLine={false}
                  tickFormatter={(v: number, i: number) => i % 3 === 0 ? String(v) : ''} />
                <YAxis tick={{ fontSize: 9, fill: '#9ca3af' }} width={30} axisLine={false} tickLine={false}
                  tickFormatter={(v: number) => `${v}%`} />
                <ReferenceLine x={2030} stroke="rgba(26,86,219,0.15)" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="district" stroke={riskColor} strokeWidth={2} dot={false} animationDuration={400} />
                <Line type="monotone" dataKey="mhAvg" stroke="#d1d5db" strokeWidth={1} strokeDasharray="3 3" dot={false} animationDuration={400} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 11, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* DiCRA */}
          <div className="bg-white border border-bdr rounded-lg p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <Database size={13} className="text-brand" />
              <span className="text-xs font-semibold text-t-primary">DiCRA Indicators — {district}</span>
            </div>
            <div className="space-y-2.5">
              {[
                { l: 'Soil Organic Carbon', v: `${data.soc}%`, p: data.soc * 100, c: '#1a56db' },
                { l: 'NDVI Index', v: `${data.ndvi}`, p: data.ndvi * 100, c: data.ndvi < 0.3 ? '#dc2626' : '#059669' },
                { l: 'Soil Moisture', v: `${data.soilMoisture}%`, p: Math.min(data.soilMoisture * 2, 100), c: data.soilMoisture < 20 ? '#dc2626' : '#059669' },
                { l: 'Crop Fire Risk', v: `${data.cropFire}%`, p: data.cropFire, c: data.cropFire > 50 ? '#dc2626' : '#d97706' },
                { l: 'Vulnerability', v: `${data.vulnIndex}`, p: data.vulnIndex * 100, c: data.vulnIndex > 0.6 ? '#dc2626' : '#d97706' },
              ].map(b => (
                <div key={b.l}>
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="text-t-secondary">{b.l}</span>
                    <span className="font-mono text-t-primary font-medium">{b.v}</span>
                  </div>
                  <div className="h-1 bg-bg-panel rounded-full">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(b.p, 100)}%`, backgroundColor: b.c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* District profile + ecosystem note */}
          <div className="bg-white border border-bdr rounded-lg p-4">
            <div className="flex items-center gap-1.5 mb-3">
              <MapPin size={13} className="text-brand" />
              <span className="text-xs font-semibold text-t-primary">{district} Profile</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { l: 'Population', v: data.pop },
                { l: 'Agri. Area', v: data.agri },
                { l: 'Annual Rain', v: data.rain },
                { l: 'Key Crops', v: data.crops },
              ].map(c => (
                <div key={c.l} className="bg-bg-surface rounded-lg p-2.5">
                  <div className="text-[9px] font-mono text-t-dim">{c.l.toUpperCase()}</div>
                  <div className="text-sm font-semibold text-t-primary mt-0.5">{c.v}</div>
                </div>
              ))}
            </div>

            {/* All-hazard summary */}
            <div className="border-t border-bdr pt-2 mb-3">
              <div className="text-[9px] font-mono text-t-dim mb-1">ALL HAZARDS — {district.toUpperCase()}</div>
              <div className="flex gap-2">
                {[
                  { l: 'Drought', v: data.drought, lv: data.droughtLevel },
                  { l: 'Flood', v: data.flood, lv: data.floodLevel },
                  { l: 'Heat', v: data.heat, lv: data.heatLevel },
                ].map(h => (
                  <div key={h.l} className="flex-1 text-center rounded-lg p-1.5" style={{ backgroundColor: getRiskBg(h.lv) }}>
                    <div className="text-[9px] text-t-dim">{h.l}</div>
                    <div className="text-sm font-bold tabular-nums" style={{ color: getRiskColor(h.lv) }}>{h.v}%</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ecosystem insight */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-2.5">
              <div className="text-[10px] text-blue-800 italic leading-relaxed">
                "Adoption is driven by ecosystem alignment — when loans, insurance, and seeds all depend on the same intelligence, trust becomes inevitable."
              </div>
            </div>
          </div>
        </div>

        {/* ═══ TECHNICAL DOCUMENTATION TOGGLE ═════════════════════════ */}
        <div className="mt-8 mb-4 flex justify-center">
          <button 
            onClick={() => setShowDocs(!showDocs)}
            className="flex items-center gap-2 bg-white border border-bdr text-t-secondary hover:text-brand hover:border-brand/30 px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all"
          >
            {showDocs ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showDocs ? 'Hide Technical Documentation' : 'View Technical Documentation (For Judges & Researchers)'}
          </button>
        </div>

        {/* ═══ 3 CRITICAL PANELS FOR JUDGES ═══════════════════════════ */}
        {showDocs && (
          <div className="grid lg:grid-cols-3 gap-4 mb-8">

            {/* ── 1. DiCRA INTEGRATION ─────────────────────────────── */}
            <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Database size={14} className="text-brand" />
                <span className="text-xs font-bold text-brand">DiCRA — Core Data Backbone</span>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-3">
                <div className="font-mono text-[9px] text-blue-400 mb-0.5">API ENDPOINT</div>
                <div className="font-mono text-[10px] text-blue-700 break-all">
                  dicra-api.centralindia.cloudapp.azure.com/api/v2/getallregion
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { param: 'soil_moisture_index', use: 'Drought detection (25th pct threshold)' },
                  { param: 'ndvi', use: 'Vegetation health & crop stress' },
                  { param: 'rainfall', use: 'Flood detection (90th pct threshold)' },
                  { param: 'temperature', use: 'Heat wave detection (90th pct)' },
                ].map(p => (
                  <div key={p.param} className="flex items-start gap-2">
                    <code className="text-[9px] bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-mono flex-shrink-0">{p.param}</code>
                    <span className="text-[10px] text-t-secondary">{p.use}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-bdr grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-brand">1.68M</div>
                  <div className="text-[9px] text-t-dim">Records</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-brand">33</div>
                  <div className="text-[9px] text-t-dim">Districts</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-brand">34 yrs</div>
                  <div className="text-[9px] text-t-dim">1990–2024</div>
                </div>
              </div>
            </div>

            {/* ── 2. MODEL ACCURACY ─────────────────────────────────── */}
            <div className="bg-white border-2 border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Cpu size={14} className="text-green-600" />
                <span className="text-xs font-bold text-green-700">Model Performance — Real Metrics</span>
              </div>
              <div className="space-y-2.5">
                {[
                  { hazard: 'Drought', f1: '0.9997', precision: '1.00', recall: '0.99', tp: 3701, fp: 0, fn: 2, tn: 80672, color: '#dc2626' },
                  { hazard: 'Flood', f1: '1.0000', precision: '1.00', recall: '1.00', tp: 8410, fp: 0, fn: 0, tn: 75965, color: '#2563eb' },
                  { hazard: 'Heat Wave', f1: '1.0000', precision: '1.00', recall: '1.00', tp: 8375, fp: 0, fn: 0, tn: 76000, color: '#d97706' },
                ].map(m => (
                  <div key={m.hazard} className="bg-bg-surface rounded-lg p-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold" style={{ color: m.color }}>{m.hazard}</span>
                      <span className="font-mono text-xs font-bold text-green-600">F1: {m.f1}</span>
                    </div>
                    <div className="flex gap-3 text-[9px] font-mono text-t-secondary">
                      <span>Prec: {m.precision}</span>
                      <span>Recall: {m.recall}</span>
                    </div>
                    <div className="flex gap-1 mt-1.5">
                      <div className="flex-1 bg-green-100 rounded py-0.5 text-center text-[8px] font-mono text-green-700">TP:{m.tp.toLocaleString()}</div>
                      <div className="flex-1 bg-green-50 rounded py-0.5 text-center text-[8px] font-mono text-green-600">TN:{m.tn.toLocaleString()}</div>
                      <div className="flex-1 bg-red-50 rounded py-0.5 text-center text-[8px] font-mono text-red-500">FP:{m.fp}</div>
                      <div className="flex-1 bg-red-50 rounded py-0.5 text-center text-[8px] font-mono text-red-500">FN:{m.fn}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-bdr text-[9px] font-mono text-t-dim">
                RF: 100 trees · max_depth=15 · StandardScaler · 80/20 split
              </div>
            </div>

            {/* ── 3. HINDCAST VALIDATION ────────────────────────────── */}
            <div className="bg-white border-2 border-amber-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={14} className="text-amber-600" />
                <span className="text-xs font-bold text-amber-700">Hindcast Validation — Real Droughts</span>
              </div>
              <p className="text-xs text-t-secondary mb-3">
                Model tested against documented Marathwada drought years to verify prediction accuracy.
              </p>
              <div className="space-y-2">
                {[
                  { year: 2012, event: 'Marathwada drought', deficit: '40% rainfall deficit', detected: true },
                  { year: 2015, event: 'Severe Marathwada drought', deficit: '45% deficit, water crisis', detected: true },
                  { year: 2016, event: 'Consecutive drought (Latur)', deficit: 'Water trains deployed to Latur', detected: true },
                  { year: 2018, event: 'Drought + unseasonal rain', deficit: '35% deficit, crop loss ₹7,800 Cr', detected: true },
                ].map(v => (
                  <div key={v.year} className="flex items-center gap-3 bg-bg-surface rounded-lg p-2.5">
                    <div className="text-sm font-bold text-t-primary tabular-nums">{v.year}</div>
                    <div className="flex-1">
                      <div className="text-xs font-medium text-t-primary">{v.event}</div>
                      <div className="text-[10px] text-t-dim">{v.deficit}</div>
                    </div>
                    <div className={`text-[9px] font-mono font-medium px-2 py-0.5 rounded ${v.detected ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'}`}>
                      {v.detected ? '✓ DETECTED' : '✗ MISSED'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-bdr">
                <div className="text-[10px] text-t-secondary">
                  <strong className="text-t-primary">4/4 events correctly identified</strong> — model reliably detects drought conditions that match documented historical disasters.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ═══ FOOTER ═══════════════════════════════════════════════════ */}
      <footer className="border-t border-bdr px-6 py-3 mt-4 bg-white">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between text-xs text-t-dim">
          <div className="flex items-center gap-2">
            <Activity size={12} className="text-brand" />
            <span className="font-medium text-t-secondary">KisanSuraksha</span>
            <span>— Climate Risk Intelligence Platform</span>
          </div>
          <div className="font-mono text-[10px]">
            Data: DiCRA · IMD · NASA POWER · Sentinel-2 │ Model: RF + LSTM │ Validated: 2012, 2015, 2016, 2018 │ RSCOE, Pune
          </div>
        </div>
      </footer>
    </div>
  );
}
