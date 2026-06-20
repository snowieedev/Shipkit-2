import { auth } from '../auth.js';

export function ApiKeysPage(container) {
  const renderKeys = () => {
    const user = auth.getCurrentUser();
    if (!user) return;

    container.innerHTML = `
      <div class="dash-header">
        <div>
          <h1 class="dash-title">API Key Credentials</h1>
          <p class="dash-subtitle">Generate and manage credentials for your unified AI infrastructure.</p>
        </div>
        <button class="btn btn-primary" id="create-key-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
          Create API Key
        </button>
      </div>

      <div class="card" style="padding: 0; overflow: hidden; margin-bottom: var(--space-xl)">
        <table class="keys-table">
          <thead>
            <tr>
              <th>Label</th>
              <th>Token Credentials</th>
              <th>Created</th>
              <th>Status</th>
              <th style="text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${user.apiKeys.length === 0 ? `
              <tr>
                <td colspan="5" style="text-align: center; color: var(--color-text-muted); padding: 40px 16px;">
                  No active keys. Click "Create API Key" to generate credentials.
                </td>
              </tr>
            ` : user.apiKeys.map(key => `
              <tr id="key-row-${key.id}">
                <td style="font-weight: 600; font-size: 0.95rem;">${key.name}</td>
                <td>
                  <div class="key-value-container">
                    <span class="key-value-masked" id="key-val-display-${key.id}">${key.masked}</span>
                    
                    <button class="code-copy-btn reveal-btn" data-key-id="${key.id}" title="Toggle Visibility">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    
                    <button class="code-copy-btn copy-btn" data-key-val="${key.value}" title="Copy to Clipboard">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    </button>
                  </div>
                </td>
                <td style="font-family: var(--font-heading); font-size: 0.8rem; color: var(--color-text-muted)">${key.created}</td>
                <td><span class="badge badge-accent">${key.status}</span></td>
                <td style="text-align: right;">
                  <button class="btn btn-secondary btn-sm regenerate-btn" data-key-id="${key.id}" style="margin-right: 8px;">Regenerate</button>
                  <button class="btn btn-danger btn-sm revoke-btn" data-key-id="${key.id}">Revoke</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="card" style="border-color: rgba(34, 197, 94, 0.15)">
        <h4 style="font-family: var(--font-heading); font-size: 0.95rem; margin-bottom: var(--space-sm)">Security Advisory</h4>
        <p style="color: var(--color-text-muted); font-size: 0.85rem; line-height: 1.6;">Your API keys carry full access to your integration routing. Never push credentials to git repos, expose them on client-side JS environments, or display them to unauthorized colleagues. All credentials revoke calls apply immediately.</p>
      </div>
    `;

    attachKeyListeners();
  };

  const attachKeyListeners = () => {
    // Generate Key Trigger
    const createBtn = document.getElementById('create-key-btn');
    if (createBtn) {
      createBtn.onclick = async () => {
        const bodyHtml = `
          <div class="form-group">
            <label class="label">API Key Label</label>
            <input class="input" type="text" id="modal-key-name" placeholder="e.g. Production Key" value="Production Key">
          </div>
        `;
        const confirmed = await window.showModal('Create API Key', bodyHtml, 'Generate', 'Cancel');
        if (confirmed) {
          const keyName = document.getElementById('modal-key-name').value;
          await auth.createApiKey(keyName);
          window.showToast(`New API credential "${keyName}" generated.`, 'success');
          renderKeys();
        }
      };
    }

    // Copy Action Trigger
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
      btn.onclick = () => {
        const keyVal = btn.getAttribute('data-key-val');
        navigator.clipboard.writeText(keyVal).then(() => {
          window.showToast('API Key copied to clipboard.', 'success');
        });
      };
    });

    // Reveal/Hide Action Trigger
    const revealBtns = document.querySelectorAll('.reveal-btn');
    revealBtns.forEach(btn => {
      btn.onclick = () => {
        const keyId = btn.getAttribute('data-key-id');
        const display = document.getElementById(`key-val-display-${keyId}`);
        const user = auth.getCurrentUser();
        if (!user || !display) return;

        const key = user.apiKeys.find(k => k.id === keyId);
        if (!key) return;

        const isMasked = display.innerText.includes('...');
        if (isMasked) {
          display.innerText = key.value;
          display.style.color = 'var(--color-accent)';
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>`;
        } else {
          display.innerText = key.masked;
          display.style.color = '';
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`;
        }
      };
    });

    // Revoke Key Trigger
    const revokeBtns = document.querySelectorAll('.revoke-btn');
    revokeBtns.forEach(btn => {
      btn.onclick = async () => {
        const keyId = btn.getAttribute('data-key-id');
        const user = auth.getCurrentUser();
        const key = user?.apiKeys.find(k => k.id === keyId);
        if (!key) return;

        const bodyHtml = `
          <p style="color:var(--color-text-muted); font-size:0.95rem; line-height:1.5;">Are you sure you want to revoke the credential <strong>"${key.name}"</strong>?</p>
          <p style="color:var(--color-error); font-size:0.85rem; margin-top:8px;">Warning: This action is permanent and immediate. Any system query active with this token will fail.</p>
        `;
        const confirmed = await window.showModal('Revoke API Key', bodyHtml, 'Revoke Key', 'Cancel');
        if (confirmed) {
          await auth.revokeApiKey(keyId);
          window.showToast('Credential revoked successfully.', 'success');
          renderKeys();
        }
      };
    });

    // Regenerate Key Trigger
    const regenBtns = document.querySelectorAll('.regenerate-btn');
    regenBtns.forEach(btn => {
      btn.onclick = async () => {
        const keyId = btn.getAttribute('data-key-id');
        const user = auth.getCurrentUser();
        const key = user?.apiKeys.find(k => k.id === keyId);
        if (!key) return;

        const bodyHtml = `
          <p style="color:var(--color-text-muted); font-size:0.95rem; line-height:1.5;">Are you sure you want to regenerate the credential <strong>"${key.name}"</strong>?</p>
          <p style="color:var(--color-warning); font-size:0.85rem; margin-top:8px;">The old key value will cease to function immediately, and a new token will be generated.</p>
        `;
        const confirmed = await window.showModal('Regenerate API Key', bodyHtml, 'Regenerate', 'Cancel');
        if (confirmed) {
          const newKeyObj = await auth.regenerateApiKey(keyId);
          window.showToast('Credential regenerated successfully.', 'success');
          renderKeys();
          
          // Auto reveal the new regenerated key value
          const display = document.getElementById(`key-val-display-${keyId}`);
          if (display) {
            display.innerText = newKeyObj.value;
            display.style.color = 'var(--color-accent)';
          }
        }
      };
    });
  };

  // Initial Draw
  renderKeys();
}
