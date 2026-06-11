export function MetricCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className={`metric-card ${tone}`}>
      <div className="metric">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
