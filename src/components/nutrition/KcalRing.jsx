export function KcalRing({ value, max = 4000, size = 192, stroke = 12, label = "kcal" }) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(value / max, 1);
  const offset = circ - circ * pct;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--color-primary-container)"
          strokeWidth={stroke}
          opacity={0.35}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="var(--color-primary)"
          strokeWidth={stroke}
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 600ms ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-4xl font-bold text-primary tabular-nums">
          {value.toLocaleString("es-AR")}
        </span>
        <span className="text-sm text-on-primary-container/70">{label}</span>
      </div>
    </div>
  );
}
