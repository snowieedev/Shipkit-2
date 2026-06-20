export function Footer() {
  const footer = document.getElementById('footer-root');
  if (!footer) return;

  footer.innerHTML = `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#landing" class="logo">
              <svg class="logo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span>ShipKit</span>
            </a>
            <p class="footer-desc">Unified AI infrastructure for modern developers. One API, one SDK, unlimited resilience.</p>
          </div>
          
          <div>
            <h4 class="footer-col-title">Product</h4>
            <ul class="footer-links">
              <li><a href="#landing" class="footer-link">Features</a></li>
              <li><a href="#landing" class="footer-link">Sandbox Sandbox</a></li>
              <li><a href="#pricing" class="footer-link">Pricing Plans</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="footer-col-title">Resources</h4>
            <ul class="footer-links">
              <li><a href="#docs" class="footer-link">Documentation</a></li>
              <li><a href="#docs" class="footer-link">Quick Start Guide</a></li>
              <li><a href="#docs" class="footer-link">System Error Codes</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="footer-col-title">Legal</h4>
            <ul class="footer-links">
              <li><a href="#" class="footer-link">Terms of Service</a></li>
              <li><a href="#" class="footer-link">Privacy Policy</a></li>
              <li><a href="#" class="footer-link">Security Policies</a></li>
            </ul>
          </div>
        </div>
        
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} ShipKit Inc. All rights reserved.</p>
          
          <div class="badge badge-accent">
            <span class="badge-dot"></span>
            <span>API Status: Healthy (99.99% uptime)</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}
