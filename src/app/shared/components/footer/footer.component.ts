import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <span class="brand-name">Gujarat</span>
          <span class="brand-sub">Tourism Platform</span>
        </div>

        <nav class="footer-nav">
          <a routerLink="/">Home</a>
          <a routerLink="/places">Explore</a>
        </nav>

        <p class="footer-copy">© {{ year }} Gujarat Tourism. All rights reserved.</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--brown);
      border-top: 1px solid rgba(250, 247, 242, 0.08);
      padding: 2.5rem var(--page-margin);
    }

    .footer-inner {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      flex-wrap: wrap;
    }

    .footer-brand {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
      margin-right: auto;

      .brand-name {
        font-family: var(--font-display);
        font-size: 1.4rem;
        font-weight: 600;
        font-style: italic;
        color: var(--ivory);
        line-height: 1;
      }

      .brand-sub {
        font-size: 0.65rem;
        font-weight: 500;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--gold);
      }
    }

    .footer-nav {
      display: flex;
      gap: 1.75rem;

      a {
        font-size: 0.8rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: rgba(250, 247, 242, 0.45);
        text-decoration: none;
        transition: color 0.2s;

        &:hover { color: var(--ivory); }
      }
    }

    .footer-copy {
      font-size: 0.75rem;
      color: rgba(250, 247, 242, 0.2);
      margin: 0;
      letter-spacing: 0.03em;
    }

    @media (max-width: 600px) {
      .footer-inner { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
      .footer-brand { margin-right: 0; }
    }
  `],
})
export class FooterComponent {
  year = new Date().getFullYear();
}
