import { Activity } from 'lucide-react';

interface HeaderProps {
  isLive: boolean;
}

export default function Header({ isLive }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-12 z-50 bg-bg-base border-b border-bdr flex items-center px-6">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Activity size={14} className="text-brand" />
          <span className="font-semibold text-t-primary text-[13px] tracking-tight">KisanSuraksha</span>
        </div>
        <span className="text-t-dim text-[10px]">|</span>
        <span className="font-mono text-[10px] text-t-secondary tracking-wide">Climate Risk Intelligence Platform</span>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full inline-block ${isLive ? 'bg-risk-l animate-pulse-dot' : 'bg-t-dim'}`} />
          <span className="font-mono text-[10px] text-t-secondary">{isLive ? 'Live' : 'Demo'}</span>
        </div>
        <div className="h-3 w-px bg-bdr2" />
        <div className="flex gap-2">
          {['DiCRA', 'IMD', 'NASA POWER'].map(s => (
            <span key={s} className="font-mono text-[9px] text-t-dim px-1.5 py-0.5 border border-bdr rounded">{s}</span>
          ))}
        </div>
      </div>
    </header>
  );
}
