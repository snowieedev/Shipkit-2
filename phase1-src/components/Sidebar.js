import { auth } from '../auth.js';

export function Sidebar() {
  const user = auth.getCurrentUser();
  if (!user) return '';

  const currentHash = window.location.hash || '#dashboard';

  // Helper to determine active CSS class
  const activeClass = (hash) => currentHash === hash ? 'active' : '';

  const overviewSvg = `
    <svg class="dash-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  `;

  const keySvg = `
    <svg class="dash-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3M20 12l2-2"/>
    </svg>
  `;

  const userSvg = `
    <svg class="dash-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  `;

  const settingsSvg = `
    <svg class="dash-nav-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  `;

  return `
    <aside class="dash-sidebar">
      <ul class="dash-nav">
        <li>
          <a href="#dashboard" class="dash-nav-item ${activeClass('#dashboard')}">
            ${overviewSvg}
            <span>Overview</span>
          </a>
        </li>
        <li>
          <a href="#dashboard/keys" class="dash-nav-item ${activeClass('#dashboard/keys')}">
            ${keySvg}
            <span>API Keys</span>
          </a>
        </li>
        <li>
          <a href="#dashboard/account" class="dash-nav-item ${activeClass('#dashboard/account')}">
            ${userSvg}
            <span>Account Profile</span>
          </a>
        </li>
        <li>
          <a href="#dashboard/settings" class="dash-nav-item ${activeClass('#dashboard/settings')}">
            ${settingsSvg}
            <span>Console Settings</span>
          </a>
        </li>
      </ul>
      
      <div class="dash-sidebar-footer">
        <div class="org-indicator">
          <span class="org-name">${user.organization}</span>
          <span class="org-id">${user.orgId}</span>
        </div>
      </div>
    </aside>
  `;
}
