export function MetricCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}