import { auth } from '../auth.js';
import { mockLogs } from '../data.js';

export function DashboardPage(container) {
  const user = auth.getCurrentUser();
  if (!user) return;

  // Render Dashboard
  container.innerHTML = `
    <!-- Dashboard Header -->
    <div class="dash-header">
      <div>
        <h1 class="dash-title">Console Console</h1>
        <p class="dash-subtitle">Welcome back, ${user.name}. Here is your API status overview.</p>
      </div>
      <div>
        <span class="badge badge-accent">
          <span class="badge-dot"></span>
          <span>${user.plan.toUpperCase()} PLAN</span>
        </span>
      </div>
    </div>

    <!-- Metrics Grid -->
    <div class="metrics-grid">
      <!-- Card 1 -->
      <div class="card metric-card">
        <span class="metric-label">Monthly Usage</span>
        <span class="metric-value">142,504</span>
        <div class="metric-trend up" style="margin-top: 2px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          <span>28.5% capacity</span>
        </div>
        <div class="metric-sparkline">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0 25 L10 24 L20 22 L30 18 L40 21 L50 15 L60 18 L70 12 L80 14 L90 8 L100 5 V30 H0 Z" fill="rgba(34, 197, 94, 0.08)" stroke="var(--color-accent)" stroke-width="1.5"></path>
          </svg>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="card metric-card">
        <span class="metric-label">Avg Grid Latency</span>
        <span class="metric-value">485ms</span>
        <div class="metric-trend up" style="color: var(--color-success)">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          <span>-12.4% latency</span>
        </div>
        <div class="metric-sparkline">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0 5 L10 8 L20 12 L30 6 L40 10 L50 12 L60 8 L70 14 L80 11 L90 15 L100 18 V30 H0 Z" fill="rgba(34, 197, 94, 0.08)" stroke="var(--color-accent)" stroke-width="1.5"></path>
          </svg>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="card metric-card">
        <span class="metric-label">Success Rate</span>
        <span class="metric-value">99.98%</span>
        <div class="metric-trend up">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
          <span>+0.02% uptime</span>
        </div>
        <div class="metric-sparkline">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0 2 M10 2 L20 2 L30 2 L40 3 L50 2 L60 2 L70 2 L80 2 L90 2 L100 2 V30 H0 Z" fill="rgba(34, 197, 94, 0.08)" stroke="var(--color-accent)" stroke-width="1.5"></path>
          </svg>
        </div>
      </div>

      <!-- Card 4 -->
      <div class="card metric-card">
        <span class="metric-label">Month-to-Date Spend</span>
        <span class="metric-value">$128.42</span>
        <span class="metric-trend" style="color: var(--color-text-muted)">
          Estimated budget: $500.00
        </span>
        <div class="metric-sparkline">
          <svg viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0 28 L10 26 L20 25 L30 22 L40 20 L50 18 L60 17 L70 14 L80 12 L90 10 L100 6 V30 H0 Z" fill="rgba(34, 197, 94, 0.08)" stroke="var(--color-accent)" stroke-width="1.5"></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Dashboard Main Panels Split -->
    <div class="dashboard-panels">
      
      <!-- Left Panel: Request Logs -->
      <div class="card" style="display: flex; flex-direction: column;">
        <div class="panel-header">
          <h3 class="panel-title">Recent API Logs</h3>
          <span style="font-family: var(--font-heading); font-size: 0.75rem; color: var(--color-text-muted)">Live Stream</span>
        </div>

        <div class="logs-table-container">
          <table class="logs-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Request Model</th>
                <th>Status</th>
                <th>Latency</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              ${mockLogs.map(log => `
                <tr>
                  <td style="font-family: var(--font-heading); font-size: 0.8rem; color: var(--color-text-muted)">${log.time}</td>
                  <td style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 500;">
                    ${log.model}
                    ${log.fallback ? `<div style="font-size:0.7rem; color:var(--color-warning); margin-top:2px;">↳ Failed, rerouted: ${log.fallback}</div>` : ''}
                  </td>
                  <td>
                    <span class="log-status-badge status-${log.status}">
                      ${log.status === 200 ? '200 OK' : log.status === 429 ? '429 RateLimit' : '500 Error'}
                    </span>
                  </td>
                  <td style="font-family: var(--font-heading); font-size: 0.85rem;">${log.latency}</td>
                  <td style="font-family: var(--font-heading); font-size: 0.85rem; color: var(--color-text-muted)">${log.cost}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Right Panel: Fallback Provider Routing Controls -->
      <div class="card">
        <div class="panel-header">
          <h3 class="panel-title">Active Failover Nodes</h3>
        </div>
        <p style="color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: var(--space-lg)">Disable fallback servers to simulate direct outages, or toggle fallback preferences.</p>

        <div class="providers-toggle-list">
          <!-- OpenAI Toggle -->
          <div class="provider-toggle-card">
            <div class="provider-info">
              <span class="provider-name">OpenAI Failover</span>
            </div>
            <label class="switch">
              <input type="checkbox" checked class="provider-router-toggle" data-provider="OpenAI">
              <span class="slider"></span>
            </label>
          </div>

          <!-- Anthropic Toggle -->
          <div class="provider-toggle-card">
            <div class="provider-info">
              <span class="provider-name">Anthropic Failover</span>
            </div>
            <label class="switch">
              <input type="checkbox" checked class="provider-router-toggle" data-provider="Anthropic">
              <span class="slider"></span>
            </label>
          </div>

          <!-- Google Toggle -->
          <div class="provider-toggle-card">
            <div class="provider-info">
              <span class="provider-name">Google Gemini Failover</span>
            </div>
            <label class="switch">
              <input type="checkbox" checked class="provider-router-toggle" data-provider="Google Gemini">
              <span class="slider"></span>
            </label>
          </div>

          <!-- Meta Toggle -->
          <div class="provider-toggle-card">
            <div class="provider-info">
              <span class="provider-name">Meta Llama Failover</span>
            </div>
            <label class="switch">
              <input type="checkbox" checked class="provider-router-toggle" data-provider="Meta Llama">
              <span class="slider"></span>
            </label>
          </div>
        </div>
      </div>

    </div>
  `;

  // Attach Toggle Listeners
  const toggles = document.querySelectorAll('.provider-router-toggle');
  toggles.forEach(toggle => {
    toggle.onchange = () => {
      const provider = toggle.getAttribute('data-provider');
      const active = toggle.checked;
      if (active) {
        window.showToast(`${provider} fallback routing enabled on grid.`, 'success');
      } else {
        window.showToast(`${provider} bypass rules configured. Routing disabled.`, 'warning');
      }
    };
  });
}
