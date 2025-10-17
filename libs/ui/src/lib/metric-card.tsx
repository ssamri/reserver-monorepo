import clsx from 'clsx';

export type MetricCardProps = {
  label: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  className?: string;
};

export function MetricCard({ label, value, trend, trendLabel, className }: MetricCardProps) {
  const trendPositive = typeof trend === 'number' ? trend >= 0 : undefined;
  return (
    <article className={clsx('rounded-4 bg-white p-4 shadow-sm h-100', className)}>
      <p className="text-secondary text-uppercase small fw-semibold mb-2">{label}</p>
      <p className="display-6 fw-bold mb-3">{value}</p>
      {typeof trend === 'number' ? (
        <p className={clsx('fw-semibold', trendPositive ? 'text-success' : 'text-danger')}>
          <span aria-hidden="true">{trendPositive ? '▲' : '▼'}</span> {Math.abs(trend)}%
          {trendLabel ? <span className="ms-2 text-secondary fw-normal">{trendLabel}</span> : null}
        </p>
      ) : null}
    </article>
  );
}
