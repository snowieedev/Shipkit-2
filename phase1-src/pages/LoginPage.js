import { auth } from '../auth.js';

export function LoginPage(container) {
  container.innerHTML = `
    <div class="glow-bg"></div>
    <div class="container flex-center" style="min-height: calc(100vh - var(--navbar-height) - 150px); padding: var(--space-2xl) var(--space-md);">
      <div class="card" style="width: 100%; max-width: 420px; box-shadow: var(--shadow-xl);">
        <div style="text-align: center; margin-bottom: var(--space-xl);">
          <h2 class="text-gradient" style="font-size: 1.75rem; margin-bottom: 8px;">Welcome Back</h2>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">Enter your developer credentials to enter console.</p>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label class="label" for="login-email">Email Address</label>
            <input class="input" type="email" id="login-email" required placeholder="you@company.com">
          </div>

          <div class="form-group" style="margin-bottom: var(--space-xl);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-sm);">
              <label class="label" for="login-password" style="margin-bottom: 0;">Password</label>
              <a href="#" style="font-size: 0.8rem; color: var(--color-accent);">Forgot Password?</a>
            </div>
            <input class="input" type="password" id="login-password" required placeholder="••••••••">
          </div>

          <button class="btn btn-primary" type="submit" id="login-submit-btn" style="width: 100%;">
            <span>Log In</span>
          </button>
        </form>

        <div style="text-align: center; margin-top: var(--space-xl); font-size: 0.9rem;">
          <span style="color: var(--color-text-muted);">New to ShipKit?</span>
          <a href="#signup" style="color: var(--color-accent); font-weight: 500; margin-left: 4px;">Create an Account</a>
        </div>
      </div>
    </div>
  `;

  // Submit Handler
  const form = document.getElementById('login-form');
  const submitBtn = document.getElementById('login-submit-btn');

  if (form && submitBtn) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      // Set Loading state
      submitBtn.disabled = true;
      submitBtn.querySelector('span').innerText = 'Authenticating...';

      try {
        await auth.login(email, password);
        window.showToast('Login successful. Welcome to the console!', 'success');
        window.location.hash = '#dashboard';
      } catch (err) {
        window.showToast(err.message || 'Authentication failed.', 'error');
        submitBtn.disabled = false;
        submitBtn.querySelector('span').innerText = 'Log In';
      }
    };
  }
}
