import { TrendingUp, Database, MapPin } from 'lucide-react';
import { DistrictData, Hazard } from '@/lib/types';
import { YEARS, MH_AVERAGE, getRiskColor } from '@/lib/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ReferenceLine, Tooltip, ResponsiveContainer } from 'recharts';

interface SharedDataPanelsProps {
  data: DistrictData;
  district: string;
  hazard: Hazard;
  year: number;
  isLive: boolean;
}

export default function SharedDataPanels({ data, district, hazard, year, isLive }: SharedDataPanelsProps) {
  const trendArray = hazard === 'drought' ? data.trend : hazard === 'flood' ? data.floodTrend : data.heatTrend;
  const riskLevel = hazard === 'drought' ? data.droughtLevel : hazard === 'flood' ? data.floodLevel : data.heatLevel;
  const riskColor = getRiskColor(riskLevel);
  const hazardLabel = hazard === 'drought' ? 'Drought' : hazard === 'flood' ? 'Flood' : 'Heat Wave';

  const chartData = YEARS.map((y, i) => ({ year: y, district: trendArray[i], mhAvg: MH_AVERAGE[i] }));

  const dicraBars: { label: string; value: string; pct: number; color: string }[] = [
    { label: 'Soil Organic Carbon', value: `${data.soc}%`, pct: data.soc * 100, color: '#58a6ff' },
    { label: 'NDVI Index', value: `${data.ndvi}`, pct: data.ndvi * 100, color: '#3fb950' },
    { label: 'Soil Moisture', value: `${data.soilMoisture}%`, pct: Math.min(data.soilMoisture * 2.5, 100), color: data.soilMoisture < 20 ? '#f85149' : data.soilMoisture < 30 ? '#d29922' : '#3fb950' },
    { label: 'Crop Fire Risk', value: `${data.cropFire}%`, pct: data.cropFire, color: data.cropFire > 60 ? '#f85149' : data.cropFire > 30 ? '#d29922' : '#3fb950' },
    { label: 'Agricultural Land', value: `${data.landUse}%`, pct: data.landUse, color: '#58a6ff' },
    { label: 'Vulnerability Index', value: `${data.vulnIndex}`, pct: data.vulnIndex * 100, color: data.vulnIndex > 0.6 ? '#f85149' : data.vulnIndex > 0.4 ? '#d29922' : '#3fb950' },
  ];

  const profileCells = [
    { label: 'Population', value: data.pop, sub: 'est. 2024' },
    { label: 'Agri. area', value: data.agri, sub: 'cultivated' },
    { label: 'Annual rain', value: data.rain, sub: 'baseline avg' },
    { label: 'Primary crops', value: data.crops, sub: 'kharif season' },
  ];

  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
      {/* Trend Chart */}
      <div className="bg-bg-surface border border-bdr rounded-lg p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <TrendingUp size={13} className="text-brand" />
            <span className="text-xs font-medium text-t-primary">{hazardLabel} trajectory</span>
          </div>
          <span className="font-mono text-[9px] text-t-dim">2025–2040</span>
        </div>
        <div className="flex gap-3 mb-2">
          <span className="flex items-center gap-1 text-[9px] font-mono text-t-secondary">
            <span className="w-3 h-[1.5px] rounded inline-block" style={{ backgroundColor: riskColor }} /> {district}
          </span>
          <span className="flex items-center gap-1 text-[9px] font-mono text-t-dim">
            <span className="w-3 h-[1.5px] rounded inline-block bg-t-dim opacity-40" style={{ borderTop: '1px dashed' }} /> MH Avg
          </span>
        </div>
        <ResponsiveContainer width="100%" height={190}>
          <LineChart data={chartData}>
            <CartesianGrid horizontal vertical={false} stroke="rgba(240,246,252,0.03)" />
            <XAxis dataKey="year" tick={{ fontSize: 9, fill: '#484f58', fontFamily: 'IBM Plex Mono' }} axisLine={false} tickLine={false}
              tickFormatter={(v: number, i: number) => i % 3 === 0 ? String(v) : ''} />
            <YAxis tick={{ fontSize: 9, fill: '#484f58', fontFamily: 'IBM Plex Mono' }} width={32} axisLine={false} tickLine={false}
              tickFormatter={(v: number) => `${v}%`} />
            <ReferenceLine x={year} stroke="rgba(88,166,255,0.25)" strokeDasharray="3 3"
              label={{ value: String(year), position: 'insideTopLeft', fill: '#58a6ff', fontSize: 9, fontFamily: 'IBM Plex Mono' }} />
            <Line type="monotone" dataKey="district" stroke={riskColor} strokeWidth={1.5} dot={false} animationDuration={400} />
            <Line type="monotone" dataKey="mhAvg" stroke="#484f58" strokeWidth={1} strokeDasharray="3 3" dot={false} animationDuration={400} />
            <Tooltip
              contentStyle={{ backgroundColor: '#161b22', border: '1px solid rgba(240,246,252,0.08)', borderRadius: '6px', padding: '8px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
              labelStyle={{ color: '#8b949e', fontSize: 9, fontFamily: 'IBM Plex Mono', marginBottom: 3 }}
              itemStyle={{ fontSize: 11, padding: '1px 0' }}
              formatter={(value: number, name: string) => [`${value}%`, name === 'district' ? district : 'MH Average']}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* DiCRA Data */}
      <div className="bg-bg-surface border border-bdr rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Database size={13} className="text-brand" />
            <span className="text-xs font-medium text-t-primary">DiCRA indicators</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[9px] text-t-dim">{district}</span>
            <span className={`font-mono text-[9px] px-1.5 py-0.5 rounded ${isLive ? 'bg-risk-lbg text-risk-l' : 'bg-bg-panel text-t-dim'}`}>
              {isLive ? 'LIVE' : 'CACHED'}
            </span>
          </div>
        </div>
        <div className="space-y-3">
          {dicraBars.map(b => (
            <div key={b.label}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-t-secondary">{b.label}</span>
                <span className="font-mono text-[11px] text-t-primary">{b.value}</span>
              </div>
              <div className="h-[2px] bg-bg-panel rounded-full">
                <div className="h-full rounded-full transition-all duration-400 ease-out" style={{ width: `${Math.min(b.pct, 100)}%`, backgroundColor: b.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* District Profile */}
      <div className="bg-bg-surface border border-bdr rounded-lg p-4">
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={13} className="text-brand" />
          <span className="text-xs font-medium text-t-primary">{district} district</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {profileCells.map(c => (
            <div key={c.label} className="bg-bg-panel rounded p-3">
              <span className="section-label block">{c.label}</span>
              <div className="text-lg font-semibold text-t-primary mt-1 tabular-nums">{c.value}</div>
              <span className="text-[9px] text-t-dim">{c.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
