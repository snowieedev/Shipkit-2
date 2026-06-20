import { auth } from '../auth.js';

export function AccountPage(container) {
  const user = auth.getCurrentUser();
  if (!user) return;

  container.innerHTML = `
    <div class="dash-header">
      <div>
        <h1 class="dash-title">Developer Account</h1>
        <p class="dash-subtitle">Manage your personal profile and developer organization settings.</p>
      </div>
    </div>

    <div style="display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-xl)">
      
      <!-- Left Panel: Edit Profile Details -->
      <div class="card">
        <h3 style="font-size: 1.15rem; margin-bottom: var(--space-lg); font-family: var(--font-heading)">Profile Details</h3>
        
        <form id="profile-form">
          <div class="form-group">
            <label class="label">Full Name</label>
            <input class="input" type="text" id="profile-name" value="${user.name}" required>
          </div>

          <div class="form-group">
            <label class="label">Primary Email (Cannot change)</label>
            <input class="input" type="email" value="${user.email}" disabled style="opacity: 0.6; cursor: not-allowed;">
          </div>

          <div class="form-group" style="margin-bottom: var(--space-xl)">
            <label class="label">Developer Organization</label>
            <input class="input" type="text" id="profile-org" value="${user.organization}" required>
          </div>

          <button class="btn btn-primary" type="submit" id="profile-submit-btn">
            <span>Save Settings</span>
          </button>
        </form>
      </div>

      <!-- Right Panel: Organization Plan details -->
      <div style="display: flex; flex-direction: column; gap: var(--space-xl)">
        <!-- Plan Widget -->
        <div class="card" style="border-color: var(--color-accent);">
          <h4 style="font-family: var(--font-heading); font-size: 0.95rem; margin-bottom: var(--space-xs)">Active Plan</h4>
          <div style="display: flex; align-items: baseline; gap: var(--space-sm); margin-bottom: var(--space-md)">
            <span style="font-size: 1.75rem; font-family: var(--font-heading); font-weight: 700; color: var(--color-accent); text-transform: uppercase;">
              ${user.plan}
            </span>
          </div>

          <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-sm); font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: var(--space-lg)">
            <li style="display: flex; align-items: center; gap: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Uptime SLA: 99.9%</span>
            </li>
            <li style="display: flex; align-items: center; gap: 8px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              <span>Monthly limit: 500k requests</span>
            </li>
          </ul>

          <button class="btn btn-secondary btn-sm" style="width: 100%;" id="change-plan-btn">Change Plan</button>
        </div>

        <!-- Meta info -->
        <div class="card" style="font-size: 0.85rem; color: var(--color-text-muted)">
          <div style="margin-bottom: var(--space-sm)">
            <span style="font-weight: 600; color: var(--color-text)">User ID:</span>
            <code style="display: block; background-color: var(--color-code-bg); padding: 4px; border-radius: 4px; margin-top: 2px;">${user.id}</code>
          </div>
          <div>
            <span style="font-weight: 600; color: var(--color-text)">Organization ID:</span>
            <code style="display: block; background-color: var(--color-code-bg); padding: 4px; border-radius: 4px; margin-top: 2px;">${user.orgId}</code>
          </div>
        </div>
      </div>

    </div>
  `;

  // Profile Form Handler
  const form = document.getElementById('profile-form');
  const submitBtn = document.getElementById('profile-submit-btn');

  if (form && submitBtn) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('profile-name').value;
      const orgName = document.getElementById('profile-org').value;

      submitBtn.disabled = true;
      submitBtn.querySelector('span').innerText = 'Saving...';

      try {
        await auth.updateProfile(name, orgName);
        window.showToast('Profile configuration updated successfully.', 'success');
      } catch (err) {
        window.showToast('Failed to save settings.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.querySelector('span').innerText = 'Save Settings';
      }
    };
  }

  // Plan trigger
  const changePlanBtn = document.getElementById('change-plan-btn');
  if (changePlanBtn) {
    changePlanBtn.onclick = () => {
      window.location.hash = '#pricing';
    };
  }
}
