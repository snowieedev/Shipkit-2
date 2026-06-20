import { docsContent } from '../data.js';

export function DocsPage(container) {
  container.innerHTML = `
    <div class="container">
      <div class="docs-layout">
        
        <!-- 1. Left Sidebar Navigation -->
        <aside class="docs-sidebar">
          <div class="docs-nav-group">
            <h4 class="docs-nav-title">Getting Started</h4>
            <ul class="docs-nav-list">
              <li><button class="docs-nav-item active" data-target="getting-started">Overview</button></li>
              <li><button class="docs-nav-item" data-target="quick-start">Quick Start</button></li>
            </ul>
          </div>

          <div class="docs-nav-group">
            <h4 class="docs-nav-title">Platform Guides</h4>
            <ul class="docs-nav-list">
              <li><button class="docs-nav-item" data-target="authentication">Authentication</button></li>
              <li><button class="docs-nav-item" data-target="api-keys">API Keys Policy</button></li>
              <li><button class="docs-nav-item" data-target="sdk-usage">SDK Configurations</button></li>
            </ul>
          </div>

          <div class="docs-nav-group">
            <h4 class="docs-nav-title">API Reference</h4>
            <ul class="docs-nav-list">
              <li><button class="docs-nav-item" data-target="requests">Requests completions</button></li>
              <li><button class="docs-nav-item" data-target="responses">Responses structure</button></li>
              <li><button class="docs-nav-item" data-target="errors">Errors list</button></li>
            </ul>
          </div>
        </aside>

        <!-- 2. Middle Content Panel -->
        <div class="docs-content" id="docs-body-root">
          <!-- Injected dynamically by selection JS -->
        </div>

        <!-- 3. Right Aside Outline -->
        <aside class="docs-aside">
          <h4 class="aside-title">On This Page</h4>
          <ul class="aside-links" id="docs-outline-list">
            <li class="aside-link active">Overview</li>
            <li class="aside-link">Failover routing</li>
            <li class="aside-link">Cost benefits</li>
          </ul>
          
          <div class="card" style="margin-top: var(--space-xl); padding: var(--space-md); font-size: 0.8rem; border-color: rgba(34, 197, 94, 0.15)">
            <h5 style="margin-bottom: var(--space-sm); font-family: var(--font-heading);">Need Help?</h5>
            <p style="color: var(--color-text-muted); margin-bottom: var(--space-sm)">Stuck with integrations? Join our community.</p>
            <a href="#" class="btn btn-primary btn-sm" style="width: 100%; font-size: 0.75rem;">Discord Channel</a>
          </div>
        </aside>

      </div>
    </div>
  `;

  // Attach dynamic content selector
  initDocsSelector();
}

function initDocsSelector() {
  const navItems = document.querySelectorAll('.docs-nav-item');
  const bodyRoot = document.getElementById('docs-body-root');
  const outlineList = document.getElementById('docs-outline-list');

  let activeDocKey = 'getting-started';

  // Helper to render code block
  const renderCodeBlock = (samples) => {
    if (!samples) return '';
    return `
      <div class="code-block" style="margin-top: var(--space-md);">
        <div class="code-header">
          <div class="code-tabs" id="doc-code-tabs">
            <button class="code-tab active" data-lang="js">Node.js</button>
            <button class="code-tab" data-lang="python">Python</button>
            <button class="code-tab" data-lang="curl">cURL</button>
          </div>
          <button class="code-copy-btn" id="doc-copy-btn" title="Copy code">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </button>
        </div>
        <pre class="code-body"><code id="doc-code-content"></code></pre>
      </div>
    `;
  };

  // Helper to render docs content body
  const renderDocContent = (key) => {
    const doc = docsContent[key];
    if (!doc) return;

    let bodyHtml = `
      <section class="docs-section">
        <h1 class="text-gradient">${doc.title}</h1>
        <div>${doc.description.replace(/\n/g, '<br>')}</div>
    `;

    // Add API Method Badge if endpoints exist
    if (doc.path) {
      bodyHtml += `
        <div class="api-endpoint">
          <span class="endpoint-method ${doc.method.toLowerCase()}">${doc.method}</span>
          <span class="endpoint-path">${doc.path}</span>
        </div>
      `;
    }

    // Add Parameters Table if exist
    if (doc.params) {
      bodyHtml += `
        <h3 style="margin-top: var(--space-lg); font-family: var(--font-heading); font-size: 0.95rem;">Parameters & Codes</h3>
        <div class="card" style="padding: 0; overflow: hidden; margin-top: var(--space-sm);">
          <table class="params-table" style="margin: 0;">
            <thead>
              <tr>
                <th>Field</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${doc.params.map(p => `
                <tr>
                  <td>
                    <span class="params-name">${p.name}</span>
                    ${p.required ? `<span class="params-req">Required</span>` : ''}
                  </td>
                  <td><span class="params-type">${p.type}</span></td>
                  <td class="params-desc">${p.desc}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    // Add Code block container
    if (doc.codeSamples) {
      bodyHtml += renderCodeBlock(doc.codeSamples);
    }

    bodyHtml += `</section>`;
    bodyRoot.innerHTML = bodyHtml;

    // Attach Code Block tab switcher behavior
    if (doc.codeSamples) {
      const codeContent = document.getElementById('doc-code-content');
      const copyBtn = document.getElementById('doc-copy-btn');
      const tabs = document.querySelectorAll('#doc-code-tabs button');
      
      let activeLang = 'js';

      const updateCodeText = (lang) => {
        const text = doc.codeSamples[lang];
        if (codeContent) codeContent.textContent = text;
        activeLang = lang;
      };

      tabs.forEach(tab => {
        tab.onclick = () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          updateCodeText(tab.getAttribute('data-lang'));
        };
      });

      // Copy Action
      if (copyBtn) {
        copyBtn.onclick = () => {
          const textToCopy = doc.codeSamples[activeLang];
          navigator.clipboard.writeText(textToCopy).then(() => {
            window.showToast('Code copied to clipboard.', 'success');
          });
        };
      }

      // Initial populate
      updateCodeText('js');
    }

    // Update Right Outline based on headings
    updateOutline(doc);
  };

  // Helper to construct dynamic on-page outline
  const updateOutline = (doc) => {
    let items = [];
    if (doc.isGeneral) {
      items = ['Overview', 'Failover routing', 'Cost benefits'];
    } else if (doc.codeSamples) {
      items = ['Overview', 'Code Implementation', 'Language Examples'];
    } else if (doc.params) {
      items = ['Overview', 'Endpoint Details', 'Parameter options'];
    } else {
      items = ['Overview', 'Usage Policies'];
    }

    outlineList.innerHTML = items.map((item, index) => `
      <li class="aside-link ${index === 0 ? 'active' : ''}">${item}</li>
    `).join('');
  };

  // Click handlers on navigation
  navItems.forEach(item => {
    item.onclick = () => {
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      activeDocKey = item.getAttribute('data-target');
      renderDocContent(activeDocKey);
    };
  });

  // Initial Content Load
  renderDocContent('getting-started');
}
