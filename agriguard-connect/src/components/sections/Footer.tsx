export default function Footer() {
  return (
    <footer className="border-t border-bdr px-6 py-4 mt-6">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between text-t-dim">
        <div className="flex items-center gap-3">
          <span className="text-t-secondary text-xs font-medium">KisanSuraksha</span>
          <span className="font-mono text-[9px]">Climate Risk Intelligence Platform</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px]">
          <span>Data: DiCRA · IMD · NASA POWER · Sentinel-2</span>
          <span className="text-t-dim">·</span>
          <span>Model: RF + LSTM · PMFBY Compliant</span>
          <span className="text-t-dim">·</span>
          <span>RSCOE, Pune</span>
        </div>
      </div>
    </footer>
  );
}
