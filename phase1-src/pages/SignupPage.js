import { auth } from '../auth.js';

export function SignupPage(container) {
  container.innerHTML = `
    <div class="glow-bg"></div>
    <div class="container flex-center" style="min-height: calc(100vh - var(--navbar-height) - 150px); padding: var(--space-2xl) var(--space-md);">
      <div class="card" style="width: 100%; max-width: 440px; box-shadow: var(--shadow-xl);">
        <div style="text-align: center; margin-bottom: var(--space-xl);">
          <h2 class="text-gradient" style="font-size: 1.75rem; margin-bottom: 8px;">Create Account</h2>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">Integrate once and access all major AI models.</p>
        </div>

        <form id="signup-form">
          <div class="form-group">
            <label class="label" for="signup-name">Full Name</label>
            <input class="input" type="text" id="signup-name" required placeholder="Alice Developer">
          </div>

          <div class="form-group">
            <label class="label" for="signup-email">Email Address</label>
            <input class="input" type="email" id="signup-email" required placeholder="you@company.com">
          </div>

          <div class="form-group" style="margin-bottom: var(--space-xl);">
            <label class="label" for="signup-password">Password</label>
            <input class="input" type="password" id="signup-password" required placeholder="Min 6 characters">
          </div>

          <button class="btn btn-primary" type="submit" id="signup-submit-btn" style="width: 100%;">
            <span>Create Free Account</span>
          </button>
        </form>

        <div style="text-align: center; margin-top: var(--space-xl); font-size: 0.9rem;">
          <span style="color: var(--color-text-muted);">Already have an account?</span>
          <a href="#login" style="color: var(--color-accent); font-weight: 500; margin-left: 4px;">Log In</a>
        </div>
      </div>
    </div>
  `;

  // Submit Handler
  const form = document.getElementById('signup-form');
  const submitBtn = document.getElementById('signup-submit-btn');

  if (form && submitBtn) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      
      const name = document.getElementById('signup-name').value;
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;

      if (password.length < 6) {
        window.showToast('Password must be at least 6 characters.', 'error');
        return;
      }

      // Set Loading State
      submitBtn.disabled = true;
      submitBtn.querySelector('span').innerText = 'Creating Account...';

      try {
        await auth.signup(name, email, password);
        window.showToast('Account successfully registered! Sandbox plan active.', 'success');
        window.location.hash = '#dashboard';
      } catch (err) {
        window.showToast(err.message || 'Registration failed.', 'error');
        submitBtn.disabled = false;
        submitBtn.querySelector('span').innerText = 'Create Free Account';
      }
    };
  }
}
