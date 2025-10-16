import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MetricCard } from './metric-card';

describe('MetricCard', () => {
  it('renders label and value', () => {
    render(<MetricCard label="Réservations" value="24" trend={8} trendLabel="vs. semaine passée" />);
    expect(screen.getByText('Réservations')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText(/semaine passée/)).toBeInTheDocument();
  });
});
