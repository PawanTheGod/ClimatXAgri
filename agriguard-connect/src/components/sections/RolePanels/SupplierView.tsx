import { Leaf, MapPin, AlertTriangle, CheckCircle, Circle } from 'lucide-react';
import { DistrictData } from '@/lib/types';

interface SupplierViewProps {
  data: DistrictData;
  district: string;
}

const seedColors: Record<string, string> = {
  bajra: '#58a6ff', jowar: '#3fb950', cotton: '#d29922', turDal: '#79c0ff', chickpea: '#56d364',
};
const seedNames: Record<string, string> = {
  bajra: 'Bajra', jowar: 'Jowar', cotton: 'Cotton', turDal: 'Tur Dal', chickpea: 'Chickpea',
};

const westernDistricts = ['Pune', 'Nashik', 'Kolhapur'];
const centralDistricts = ['Aurangabad', 'Nanded'];
const marathwadaDistricts = ['Solapur', 'Beed', 'Osmanabad', 'Latur', 'Ahmednagar'];

function getZone(d: string) {
  if (westernDistricts.includes(d)) return 0;
  if (centralDistricts.includes(d)) return 1;
  return 2;
}

export default function SupplierView({ data, district }: SupplierViewProps) {
  const seeds = Object.entries(data.seedDemand);
  const maxVal = Math.max(...seeds.map(([, v]) => v));
  const zone = getZone(district);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
      {/* Seed Demand */}
      <div className="bg-bg-surface border border-bdr rounded-[12px] p-5">
        <div className="flex items-center gap-2 mb-1">
          <Leaf size={16} className="text-brand" />
          <span className="font-medium text-t-primary text-sm">Seed Demand Forecast</span>
        </div>
        <span className="font-mono text-[10px] text-t-dim">Based on district risk × farm population</span>

        <div className="mt-4">
          {seeds.map(([key, val]) => (
            <div key={key} className="flex items-center gap-3 py-2 border-b border-[rgba(255,255,255,0.04)]">
              <span className="text-sm text-t-primary w-24">{seedNames[key]}</span>
              <div className="flex-1 h-3 bg-bg-panel rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(val / maxVal) * 100}%`, backgroundColor: seedColors[key] }} />
              </div>
              <span className="font-mono text-xs text-t-secondary w-24 text-right">{val.toLocaleString()} kg</span>
            </div>
          ))}
        </div>

        {data.drought > 60 && (
          <div className="bg-risk-hbg border border-risk-hb rounded-lg p-3 mt-4 flex items-start gap-2">
            <AlertTriangle size={14} className="text-risk-h mt-0.5 shrink-0" />
            <p className="text-xs text-risk-h">
              Avoid pre-ordering Sugarcane — demand projected -{Math.round(data.drought * 0.6)}% in high-risk zones through 2032
            </p>
          </div>
        )}
      </div>

      {/* Pre-Position Map */}
      <div className="bg-bg-surface border border-bdr rounded-[12px] p-5">
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={16} className="text-brand" />
          <span className="font-medium text-t-primary text-sm">Maharashtra pre-position map</span>
        </div>

        <svg width="100%" height="200" viewBox="0 0 400 200" className="mt-2">
          {/* Western */}
          <rect x="10" y="5" width="380" height="55" rx="6" fill="rgba(77,204,128,0.12)" stroke="rgba(77,204,128,0.4)" strokeWidth="1" />
          <text x="200" y="28" textAnchor="middle" fill="#4dcc80" fontSize="10" className="font-mono">Western · Standard demand</text>
          <text x="200" y="42" textAnchor="middle" fill="#445242" fontSize="9" className="font-mono">Pune · Nashik · Kolhapur</text>

          {/* Central */}
          <rect x="10" y="68" width="380" height="55" rx="6" fill="rgba(245,200,64,0.12)" stroke="rgba(245,200,64,0.4)" strokeWidth="1" />
          <text x="200" y="91" textAnchor="middle" fill="#f5c840" fontSize="10" className="font-mono">Central · Elevated demand</text>
          <text x="200" y="105" textAnchor="middle" fill="#445242" fontSize="9" className="font-mono">Aurangabad · Nanded</text>

          {/* Marathwada */}
          <rect x="10" y="131" width="380" height="64" rx="6" fill="rgba(255,92,74,0.12)" stroke="rgba(255,92,74,0.4)" strokeWidth="1" />
          <text x="200" y="157" textAnchor="middle" fill="#ff5c4a" fontSize="10" className="font-mono">Marathwada · Critical priority</text>
          <text x="200" y="171" textAnchor="middle" fill="#445242" fontSize="9" className="font-mono">Solapur · Beed · Osmanabad · Latur · Ahmednagar</text>

          {/* Pulsing dot */}
          <circle cx={200} cy={zone === 0 ? 32 : zone === 1 ? 95 : 160} r="4"
            fill={zone === 0 ? '#4dcc80' : zone === 1 ? '#f5c840' : '#ff5c4a'} />
          <circle cx={200} cy={zone === 0 ? 32 : zone === 1 ? 95 : 160} r="8"
            fill="none" stroke={zone === 0 ? '#4dcc80' : zone === 1 ? '#f5c840' : '#ff5c4a'}
            strokeWidth="1" opacity="0.5" className="animate-pulse" />
        </svg>

        <div className="space-y-2 mt-4">
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle size={14} className="text-risk-l shrink-0" />
            <span className="text-t-primary">Stock 40% more Bajra in Marathwada depots</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle size={14} className="text-risk-l shrink-0" />
            <span className="text-t-primary">Reduce Sugarcane supply in {district} by {data.kccReduction}%</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Circle size={14} className="text-t-dim shrink-0" />
            <span className="text-t-secondary">Alert state agriculture dept on drought-tolerant subsidies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
