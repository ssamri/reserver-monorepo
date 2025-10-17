import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface MetricCard {
  label: string;
  value: number;
  suffix: string;
  trend: number;
}

@Component({
  selector: 'reserver-extranet-dashboard-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent {
  private readonly metricsSignal = signal<MetricCard[]>([
    { label: 'Réservations à venir', value: 24, suffix: '', trend: 12 },
    { label: 'Taux d\'occupation', value: 78, suffix: '%', trend: 4 },
    { label: 'Revenu par chambre', value: 980, suffix: ' MAD', trend: 8 }
  ]);

  readonly metrics = computed(() => this.metricsSignal());
}
