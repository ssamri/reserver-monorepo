import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'reserver-admin-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
    <div class="app-shell">
      <header class="app-header">
        <div class="branding">
          <span class="logo" aria-hidden="true">🛠️</span>
          <span class="brand-text">reserver.ma admin</span>
        </div>
        <nav aria-label="Menu principal">
          <a routerLink="/" class="nav-link" aria-current="page">Traductions</a>
          <a routerLink="/hotels" class="nav-link">Hôtels</a>
          <a routerLink="/utilisateurs" class="nav-link">Utilisateurs</a>
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
