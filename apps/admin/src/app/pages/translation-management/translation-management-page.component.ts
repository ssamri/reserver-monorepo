import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TranslationRow {
  key: string;
  fr: string;
  en: string;
  es: string;
}

@Component({
  selector: 'reserver-admin-translation-management-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './translation-management-page.component.html',
  styleUrls: ['./translation-management-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TranslationManagementPageComponent {
  readonly rows = signal<TranslationRow[]>([
    { key: 'home.headline', fr: 'Réservez votre séjour', en: 'Book your stay', es: 'Reserva tu estancia' },
    {
      key: 'home.cta',
      fr: 'Lancer une recherche',
      en: 'Start a search',
      es: 'Iniciar una búsqueda'
    },
    {
      key: 'checkout.title',
      fr: 'Confirmation de réservation',
      en: 'Booking confirmation',
      es: 'Confirmación de reserva'
    }
  ]);

  readonly filter = signal('');

  get filteredRows(): TranslationRow[] {
    const query = this.filter().trim().toLowerCase();
    if (!query) {
      return this.rows();
    }
    return this.rows().filter((row) =>
      [row.key, row.fr, row.en, row.es].some((value) => value.toLowerCase().includes(query)),
    );
  }

  updateFilter(value: string) {
    this.filter.set(value);
  }
}
