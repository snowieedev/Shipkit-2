import { auth } from '../auth.js';

export function Navbar() {
  const user = auth.getCurrentUser();
  const currentHash = window.location.hash || '#landing';

  // Helper to check if a link is active
  const isActive = (hash) => currentHash.startsWith(hash) ? 'active' : '';

  const header = document.getElementById('header-root');
  if (!header) return;

  const logoSvg = `
    <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  `;

  header.innerHTML = `
    <nav class="navbar">
      <div class="container">
        <a href="#landing" class="logo">
          ${logoSvg}
          <span>ShipKit</span>
        </a>

        <ul class="nav-links" id="nav-menu">
          <li><a href="#landing" class="nav-link ${currentHash === '#landing' ? 'active' : ''}">Features</a></li>
          <li><a href="#docs" class="nav-link ${isActive('#docs')}">Docs</a></li>
          <li><a href="#pricing" class="nav-link ${isActive('#pricing')}">Pricing</a></li>
          ${user ? `
            <li class="mobile-only-link"><a href="#dashboard" class="nav-link ${isActive('#dashboard')}">Dashboard</a></li>
          ` : ''}
        </ul>

        <div class="nav-actions">
          ${user ? `
            <a href="#dashboard" class="btn btn-secondary btn-sm dashboard-link" style="display: inline-flex; align-items: center; gap: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
              Dashboard
            </a>
            <button class="btn btn-secondary btn-sm" id="logout-btn">Log Out</button>
          ` : `
            <a href="#login" class="nav-link ${isActive('#login')}" style="font-size: 0.95rem; font-weight: 500;">Log In</a>
            <a href="#signup" class="btn btn-primary btn-sm">Sign Up</a>
          `}
          
          <button class="menu-btn" id="menu-toggle" aria-label="Toggle Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  `;

  // Attach Event Listeners
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.onclick = () => {
      navMenu.classList.toggle('mobile-open');
    };
  }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.onclick = async () => {
      await auth.logout();
      window.location.hash = '#landing';
    };
  }
}
