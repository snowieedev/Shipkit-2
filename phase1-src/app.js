import { auth } from './auth.js';
import { Navbar } from './components/Navbar.js';
import { Footer } from './components/Footer.js';
import { Sidebar } from './components/Sidebar.js';

import { LandingPage } from './pages/LandingPage.js';
import { PricingPage } from './pages/PricingPage.js';
import { DocsPage } from './pages/DocsPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { SignupPage } from './pages/SignupPage.js';
import { DashboardPage } from './pages/DashboardPage.js';
import { ApiKeysPage } from './pages/ApiKeysPage.js';
import { AccountPage } from './pages/AccountPage.js';
import { SettingsPage } from './pages/SettingsPage.js';

// Global toast notifier helper
window.showToast = (message, type = 'success') => {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') toast.style.borderLeftColor = 'var(--color-error)';
  if (type === 'warning') toast.style.borderLeftColor = 'var(--color-warning)';

  toast.innerHTML = `
    <span>${message}</span>
    <button style="background:none;border:none;color:var(--color-text-muted);cursor:pointer;font-size:12px;margin-left:12px;" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);
  
  // Trigger transition
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Global modal overlay helpers
let activeModalResolve = null;

window.showModal = (title, bodyHtml, confirmText = 'Confirm', cancelText = 'Cancel') => {
  return new Promise((resolve) => {
    activeModalResolve = resolve;
    const overlay = document.getElementById('modal-container');
    if (!overlay) return;

    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>${title}</h3>
          <button class="modal-close-btn" onclick="window.closeModal(false)">✕</button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" onclick="window.closeModal(false)">${cancelText}</button>
          <button class="btn btn-primary btn-sm" id="modal-confirm-btn" onclick="window.closeModal(true)">${confirmText}</button>
        </div>
      </div>
    `;

    overlay.classList.add('show');
  });
};

window.closeModal = (result) => {
  const overlay = document.getElementById('modal-container');
  if (overlay) {
    overlay.classList.remove('show');
  }
  if (activeModalResolve) {
    activeModalResolve(result);
    activeModalResolve = null;
  }
};

// Central Client-Side Router
async function router() {
  const hash = window.location.hash || '#landing';
  const root = document.getElementById('root');
  
  // Always sync Navbar
  Navbar();
  
  // Route Guards: Redirect unauthenticated requests away from #dashboard
  if (hash.startsWith('#dashboard')) {
    const user = auth.getCurrentUser();
    if (!user) {
      window.location.hash = '#login';
      window.showToast('Please sign in to access your developer console.', 'warning');
      return;
    }
  }

  // Handle route page transitions
  root.style.opacity = '0';
  root.style.transform = 'translateY(8px)';
  
  setTimeout(async () => {
    // 1. Dashboard View Area
    if (hash.startsWith('#dashboard')) {
      // Clear marketing footer
      const footerRoot = document.getElementById('footer-root');
      if (footerRoot) footerRoot.innerHTML = '';

      // Inject Dashboard Layout
      root.innerHTML = `
        <div class="dashboard-layout">
          ${Sidebar()}
          <div class="dashboard-main-content" id="dashboard-content-root"></div>
        </div>
      `;

      const dashContentRoot = document.getElementById('dashboard-content-root');

      // Sub-route Dispatcher
      if (hash === '#dashboard') {
        DashboardPage(dashContentRoot);
      } else if (hash === '#dashboard/keys') {
        ApiKeysPage(dashContentRoot);
      } else if (hash === '#dashboard/account') {
        AccountPage(dashContentRoot);
      } else if (hash === '#dashboard/settings') {
        SettingsPage(dashContentRoot);
      } else {
        dashContentRoot.innerHTML = `<div class="card"><h2 style="color:var(--color-error)">404 Panel Not Found</h2><p>The console view you requested does not exist.</p></div>`;
      }
    } 
    // 2. Public / Frontend View Area
    else {
      // Sync Footer
      Footer();

      if (hash === '#landing') {
        LandingPage(root);
      } else if (hash === '#pricing') {
        PricingPage(root);
      } else if (hash === '#docs') {
        DocsPage(root);
      } else if (hash === '#login') {
        LoginPage(root);
      } else if (hash === '#signup') {
        SignupPage(root);
      } else {
        root.innerHTML = `
          <div class="container" style="padding: 100px 20px; text-align: center;">
            <h1 style="font-size: 3rem; margin-bottom: 20px;" class="text-gradient">404 Page Not Found</h1>
            <p style="color: var(--color-text-muted); margin-bottom: 30px;">The resource you requested is missing or has been moved.</p>
            <a href="#landing" class="btn btn-primary">Return Home</a>
          </div>
        `;
      }
    }

    // Finish Page Transition
    root.style.transition = 'opacity var(--transition-fast) ease, transform var(--transition-fast) ease';
    root.style.opacity = '1';
    root.style.transform = 'translateY(0)';
  }, 100);
}

// Global Auth Events listener to update active page state
window.addEventListener('auth-change', () => {
  Navbar();
  const hash = window.location.hash || '#landing';
  if (hash.startsWith('#dashboard') || hash === '#login' || hash === '#signup') {
    router();
  }
});

// Event Triggers
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
