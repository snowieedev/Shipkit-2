import { auth } from '../auth.js';

export function SettingsPage(container) {
  const user = auth.getCurrentUser();
  if (!user) return;

  container.innerHTML = `
    <div class="dash-header">
      <div>
        <h1 class="dash-title">Console Settings</h1>
        <p class="dash-subtitle">Configure developer webhooks, credentials, and budget alert policies.</p>
      </div>
    </div>

    <div class="settings-grid">
      
      <!-- Card 1: Custom API Credentials (Bring your own keys) -->
      <div class="card">
        <div class="settings-card-header">
          <h3 class="settings-card-title">Downstream Provider Credentials</h3>
          <p class="settings-card-desc">Optional: Provide custom API keys to bypass ShipKit credit billing and query downstream endpoints directly.</p>
        </div>

        <form id="credentials-form">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-lg); margin-bottom: var(--space-xl);">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="label">OpenAI API Key</label>
              <input class="input" type="password" id="key-openai" placeholder="sk-proj-••••••••••••" value="${user.customKeys?.openai || ''}">
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="label">Anthropic API Key</label>
              <input class="input" type="password" id="key-anthropic" placeholder="sk-ant-••••••••••••" value="${user.customKeys?.anthropic || ''}">
            </div>

            <div class="form-group" style="margin-bottom: 0; grid-column: span 2;">
              <label class="label">Google Gemini API Key</label>
              <input class="input" type="password" id="key-google" placeholder="AIzaSy••••••••••••" value="${user.customKeys?.google || ''}">
            </div>
          </div>

          <button class="btn btn-primary" type="submit" id="credentials-submit-btn">
            <span>Save Credentials</span>
          </button>
        </form>
      </div>

      <!-- Card 2: Alerts & Webhooks -->
      <div class="card">
        <div class="settings-card-header">
          <h3 class="settings-card-title">Budget Alerts & Webhooks</h3>
          <p class="settings-card-desc">Configure alerts to avoid unexpected token expenditure spikes.</p>
        </div>

        <form id="alerts-form">
          <div class="form-group" style="display: flex; align-items: center; gap: var(--space-md); margin-bottom: var(--space-lg);">
            <label class="switch" style="flex-shrink: 0;">
              <input type="checkbox" id="setting-alert-active" ${user.settings?.budgetAlert ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
            <div>
              <span style="font-weight: 600; font-size: 0.95rem; display: block; color: var(--color-text);">Enable Budget Alerts</span>
              <span style="font-size: 0.8rem; color: var(--color-text-muted);">Notify administrators when organization spend exceeds thresholds.</span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: var(--space-lg); margin-bottom: var(--space-xl)">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="label">Spend Threshold (USD)</label>
              <input class="input" type="number" id="setting-alert-threshold" value="${user.settings?.threshold || 100}" min="1">
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="label">Notification Webhook URL</label>
              <input class="input" type="url" id="setting-alert-webhook" placeholder="https://api.yourdomain.com/webhooks/shipkit" value="${user.settings?.webhookUrl || ''}">
            </div>
          </div>

          <button class="btn btn-primary" type="submit" id="alerts-submit-btn">
            <span>Save Alert Rules</span>
          </button>
        </form>
      </div>

    </div>
  `;

  // Credentials Submit Handler
  const credsForm = document.getElementById('credentials-form');
  const credsBtn = document.getElementById('credentials-submit-btn');

  if (credsForm && credsBtn) {
    credsForm.onsubmit = async (e) => {
      e.preventDefault();
      const o = document.getElementById('key-openai').value;
      const a = document.getElementById('key-anthropic').value;
      const g = document.getElementById('key-google').value;

      credsBtn.disabled = true;
      credsBtn.querySelector('span').innerText = 'Saving...';

      try {
        await auth.updateCustomKeys(o, a, g);
        window.showToast('Provider credential tokens saved successfully.', 'success');
      } catch (err) {
        window.showToast('Error updating credentials.', 'error');
      } finally {
        credsBtn.disabled = false;
        credsBtn.querySelector('span').innerText = 'Save Credentials';
      }
    };
  }

  // Alerts Submit Handler
  const alertsForm = document.getElementById('alerts-form');
  const alertsBtn = document.getElementById('alerts-submit-btn');

  if (alertsForm && alertsBtn) {
    alertsForm.onsubmit = async (e) => {
      e.preventDefault();
      const active = document.getElementById('setting-alert-active').checked;
      const threshold = parseFloat(document.getElementById('setting-alert-threshold').value);
      const webhook = document.getElementById('setting-alert-webhook').value;

      alertsBtn.disabled = true;
      alertsBtn.querySelector('span').innerText = 'Saving...';

      try {
        await auth.updateSettings(active, threshold, webhook);
        window.showToast('Webhook and budget parameters saved successfully.', 'success');
      } catch (err) {
        window.showToast('Error saving settings.', 'error');
      } finally {
        alertsBtn.disabled = false;
        alertsBtn.querySelector('span').innerText = 'Save Alert Rules';
      }
    };
  }
}
