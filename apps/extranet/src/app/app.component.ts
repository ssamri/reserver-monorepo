import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'reserver-extranet-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <div class="branding">
          <span class="logo" aria-hidden="true">🏨</span>
          <span class="brand-text">reserver.ma extranet</span>
        </div>
        <nav aria-label="Menu principal">
          <a routerLink="/" class="nav-link" aria-current="page">Tableau de bord</a>
          <a routerLink="/tarifs" class="nav-link">Tarifs</a>
          <a routerLink="/disponibilites" class="nav-link">Disponibilités</a>
        </nav>
      </header>
      <main class="app-main">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
