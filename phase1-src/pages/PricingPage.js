import { pricingPlans } from '../data.js';

export function PricingPage(container) {
  container.innerHTML = `
    <div class="glow-bg"></div>
    <div class="container" style="padding: var(--space-3xl) var(--space-md);">
      
      <!-- Page Header -->
      <div class="section-header" style="margin-bottom: var(--space-3xl); text-align: center;">
        <h1 style="font-size: 2.75rem; margin-bottom: var(--space-md);" class="text-gradient">Predictable Developer Pricing</h1>
        <p style="color: var(--color-text-muted); max-width: 600px; margin: 0 auto;">No hidden client fees, no multi-provider accounts, no API markup. Pay for what you use on the unified grid.</p>
        
        <!-- Monthly/Annual Billing Switcher -->
        <div style="display: inline-flex; align-items: center; background-color: var(--color-card-bg); border: 1px solid var(--color-card-border); padding: 4px; border-radius: 9999px; margin-top: var(--space-2xl);">
          <button class="btn btn-sm btn-primary" id="billing-toggle-monthly" style="border-radius: 9999px; padding: 6px 16px;">Monthly</button>
          <button class="btn btn-sm btn-secondary" id="billing-toggle-yearly" style="border-radius: 9999px; padding: 6px 16px; border-color: transparent;">Yearly (-20%)</button>
        </div>
      </div>

      <!-- Pricing Cards Grid -->
      <div class="metrics-grid" id="pricing-grid-container" style="grid-template-columns: repeat(3, 1fr); max-width: 1000px; margin: 0 auto var(--space-3xl) auto; gap: var(--space-xl);">
        <!-- Injected Dynamically by Toggle JS -->
      </div>

      <!-- Features Comparison Table -->
      <div style="margin-bottom: var(--space-3xl);">
        <h2 style="text-align: center; margin-bottom: var(--space-xl); font-size: 1.75rem;" class="text-gradient">Feature Comparison</h2>
        <div class="card" style="padding: 0; overflow-hidden: true; border-radius: 8px;">
          <table class="params-table" style="margin: 0;">
            <thead>
              <tr>
                <th>Capacity</th>
                <th>Sandbox</th>
                <th>Developer</th>
                <th>Scale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="params-name">Monthly request capacity</td>
                <td>10,000</td>
                <td>500,000</td>
                <td>Unlimited</td>
              </tr>
              <tr>
                <td class="params-name">Downstream fallback routes</td>
                <td>Basic</td>
                <td>Automatic (Latency based)</td>
                <td>Custom Rules Engine</td>
              </tr>
              <tr>
                <td class="params-name">Developer dashboard analytics</td>
                <td>24-hour summary</td>
                <td>7-day request history</td>
                <td>30-day history + Custom S3 Exports</td>
              </tr>
              <tr>
                <td class="params-name">API Keys</td>
                <td>1 Key</td>
                <td>Unlimited Keys</td>
                <td>Unlimited Keys</td>
              </tr>
              <tr>
                <td class="params-name">SLA Uptime Guarantee</td>
                <td>None</td>
                <td>99.9%</td>
                <td>99.99% (Financial credit backed)</td>
              </tr>
              <tr>
                <td class="params-name">Customer Support</td>
                <td>Discord Community</td>
                <td>Email (24-hour SLA)</td>
                <td>Dedicated Account Manager + Slack</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Frequently Asked Questions (FAQ) -->
      <div style="max-width: 800px; margin: 0 auto;">
        <h2 style="text-align: center; margin-bottom: var(--space-xl); font-size: 1.75rem;" class="text-gradient">Frequently Asked Questions</h2>
        
        <div style="display: flex; flex-direction: column; gap: var(--space-md);">
          <details class="card" style="padding: var(--space-md) var(--space-lg); cursor: pointer;" open>
            <summary style="font-family: var(--font-heading); font-weight: 600; font-size: 1rem; color: var(--color-text); outline: none;">Do I need separate accounts with OpenAI or Anthropic?</summary>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-top: var(--space-sm); line-height: 1.6;">No! ShipKit handles all downstream relationships. You sign up, purchase credits on ShipKit, and query all model providers using your single ShipKit balance and token. Alternatively, Enterprise users can bring their own custom provider API keys in settings.</p>
          </details>

          <details class="card" style="padding: var(--space-md) var(--space-lg); cursor: pointer;">
            <summary style="font-family: var(--font-heading); font-weight: 600; font-size: 1rem; color: var(--color-text); outline: none;">How do automatic failovers behave?</summary>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-top: var(--space-sm); line-height: 1.6;">If a request to your primary model (e.g. GPT-4o) fails due to provider downtime, rate limits, or network errors, ShipKit instantly redirects the prompt payload to your specified fallback model (e.g. Claude 3.5 Sonnet) within 50ms. Your app remains fully responsive without throwing errors.</p>
          </details>

          <details class="card" style="padding: var(--space-md) var(--space-lg); cursor: pointer;">
            <summary style="font-family: var(--font-heading); font-weight: 600; font-size: 1rem; color: var(--color-text); outline: none;">Are there any markup charges on token usage?</summary>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-top: var(--space-sm); line-height: 1.6;">None. Token prices match official provider API pricing exactly (e.g. OpenAI GPT-4o input/output costs). Your monthly subscription fee covers fallback hosting infrastructure and routing servers.</p>
          </details>
        </div>
      </div>

    </div>
  `;

  // Attach Toggle Logic
  initPricingToggle();
}

function initPricingToggle() {
  const toggleMonthly = document.getElementById('billing-toggle-monthly');
  const toggleYearly = document.getElementById('billing-toggle-yearly');
  const gridContainer = document.getElementById('pricing-grid-container');

  let activePeriod = 'monthly';

  const renderCards = (period) => {
    const plans = pricingPlans[period];
    gridContainer.innerHTML = plans.map(plan => `
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; border-color: ${plan.popular ? 'var(--color-accent)' : 'var(--color-card-border)'}; position: relative; overflow: hidden;">
        ${plan.popular ? `
          <div style="position: absolute; top: 12px; right: 12px;">
            <span class="badge badge-accent">Popular</span>
          </div>
        ` : ''}
        
        <div>
          <h3 style="font-size: 1.25rem; font-family: var(--font-heading); margin-bottom: var(--space-xs);">${plan.name}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.85rem; margin-bottom: var(--space-lg); min-height: 38px;">${plan.description}</p>
          
          <div style="display: flex; align-items: baseline; gap: 4px; margin-bottom: var(--space-sm);">
            <span style="font-size: 2.25rem; font-family: var(--font-heading); font-weight: 700; color: var(--color-text);">${plan.price}</span>
            <span style="color: var(--color-text-muted); font-size: 0.9rem;">/ ${plan.period}</span>
          </div>
          
          ${plan.billedLabel ? `
            <div style="font-size: 0.75rem; color: var(--color-accent); font-family: var(--font-heading); margin-bottom: var(--space-lg);">${plan.billedLabel}</div>
          ` : `<div style="margin-bottom: var(--space-lg); height: 18px;"></div>`}

          <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-sm); margin-bottom: var(--space-xl);">
            ${plan.features.map(f => `
              <li style="display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: #cbd5e1;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                <span>${f}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <button class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'}" style="width: 100%;" onclick="handleCtaClick('${plan.id}')">
          ${plan.cta}
        </button>
      </div>
    `).join('');
  };

  // Define CTA handler globally
  window.handleCtaClick = (id) => {
    if (id === 'scale') {
      window.showToast('Sales inquiry sent! Our team will contact you shortly.', 'success');
    } else {
      window.location.hash = '#signup';
    }
  };

  const setToggleActive = (period) => {
    if (period === 'monthly') {
      toggleMonthly.className = 'btn btn-sm btn-primary';
      toggleYearly.className = 'btn btn-sm btn-secondary';
      toggleYearly.style.borderColor = 'transparent';
    } else {
      toggleMonthly.className = 'btn btn-sm btn-secondary';
      toggleMonthly.style.borderColor = 'transparent';
      toggleYearly.className = 'btn btn-sm btn-primary';
    }
    activePeriod = period;
    renderCards(period);
  };

  toggleMonthly.onclick = () => setToggleActive('monthly');
  toggleYearly.onclick = () => setToggleActive('yearly');

  // Initial Render
  renderCards('monthly');
}
