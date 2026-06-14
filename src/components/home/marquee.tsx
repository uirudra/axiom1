"use client";

const TICKERS = [
  { sym: "SPY", price: "528.74", chg: "+0.42%" },
  { sym: "QQQ", price: "447.19", chg: "+0.71%" },
  { sym: "BTC", price: "67,420", chg: "+2.15%" },
  { sym: "ETH", price: "3,812", chg: "+1.87%" },
  { sym: "AAPL", price: "189.84", chg: "+0.34%" },
  { sym: "TSLA", price: "248.23", chg: "-1.22%" },
  { sym: "AMZN", price: "186.77", chg: "+0.93%" },
  { sym: "NVDA", price: "875.39", chg: "+3.41%" },
  { sym: "GLD", price: "223.15", chg: "+0.18%" },
  { sym: "TLT", price: "96.42", chg: "-0.28%" },
];

const DOUBLE = [...TICKERS, ...TICKERS];

function TickerItem({ sym, price, chg }: { sym: string; price: string; chg: string }) {
  const pos = chg.startsWith("+");
  return (
    <div className="flex items-center gap-3 px-6 border-r border-rim/40">
      <span className="font-mono text-sm font-medium text-fore">{sym}</span>
      <span className="font-mono text-sm text-dim">{price}</span>
      <span
        className="font-mono text-xs font-semibold"
        style={{ color: pos ? "#00d68f" : "#f72585" }}
      >
        {chg}
      </span>
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative py-4 border-y border-rim/40 overflow-hidden bg-hull/40 backdrop-blur-sm">
      {/* Fade edges */}
      <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />

      <div
        className="flex whitespace-nowrap"
        style={{ animation: "marquee 40s linear infinite" }}
      >
        {DOUBLE.map((t, i) => (
          <TickerItem key={i} {...t} />
        ))}
      </div>
    </div>
  );
}
