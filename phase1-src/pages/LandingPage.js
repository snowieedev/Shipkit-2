import { sandboxModels } from '../data.js';

export function LandingPage(container) {
  // Brand SVGs
  const openaiSvg = `<svg viewBox="0 0 256 260"><path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z\"/></svg>`;
  
  const anthropicSvg = `<svg fill-rule="evenodd" viewBox="0 0 24 24"><path d="M13.827 3.52h3.603L24 20h-3.603l-6.57-16.48zm-7.258 0h3.767L16.906 20h-3.674l-1.343-3.461H5.017l-1.344 3.46H0L6.57 3.522zm4.132 9.959L8.453 7.687 6.205 13.48H10.7z\"></path></svg>`;
  
  const googleSvg = `<svg viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z\"/></svg>`;
  
  const metaSvg = `<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.188L2 22l4.906-1.375C8.37 21.503 10.12 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm1.094 14.594c-.28.188-.625.313-1 .313s-.72-.125-1-.313c-2.313-1.5-3.656-3.875-3.656-6.438C7.438 8.094 9.47 6 12 6s4.563 2.094 4.563 4.156c0 2.563-1.344 4.938-3.469 6.438z\"/></svg>`;
  
  const cohereSvg = `<svg viewBox="0 0 75 75"><path d="M24.3 44.7c2 0 6-.1 11.6-2.4 6.5-2.7 19.3-7.5 28.6-12.5 6.5-3.5 9.3-8.1 9.3-14.3C73.8 7 66.9 0 58.3 0h-36C10 0 0 10 0 22.3s9.4 22.4 24.3 22.4z\" fill=\"#39594d\"/><path d=\"M30.4 60c0-6 3.6-11.5 9.2-13.8l11.3-4.7C62.4 36.8 75 45.2 75 57.6 75 67.2 67.2 75 57.6 75H45.3c-8.2 0-14.9-6.7-14.9-15z\" fill=\"#d18ee2\"/><path d=\"M12.9 47.6C5.8 47.6 0 53.4 0 60.5v1.7C0 69.2 5.8 75 12.9 75c7.1 0 12.9-5.8 12.9-12.9v-1.7c-.1-7-5.8-12.8-12.9-12.8z\" fill=\"#ff7759\"/></svg>`;
  
  const mistralSvg = `<svg viewBox="0 0 256 233"><path d=\"M186.18182 0h46.54545v46.54545h-46.54545z\"/><path fill=\"#F7D046\" d=\"M209.45454 0h46.54545v46.54545h-46.54545z\"/><path d=\"M0 0h46.54545v46.54545H0zM0 46.54545h46.54545V93.0909H0zM0 93.09091h46.54545v46.54545H0zM0 139.63636h46.54545v46.54545H0zM0 186.18182h46.54545v46.54545H0z\"/><path fill=\"#F7D046\" d=\"M23.27273 0h46.54545v46.54545H23.27273z\"/><path fill=\"#F2A73B\" d=\"M209.45454 46.54545h46.54545V93.0909h-46.54545zM23.27273 46.54545h46.54545V93.0909H23.27273z\"/><path d=\"M139.63636 46.54545h46.54545V93.0909h-46.54545z\"/><path fill=\"#F2A73B\" d=\"M162.90909 46.54545h46.54545V93.0909h-46.54545zM69.81818 46.54545h46.54545V93.0909H69.81818z\"/><path fill=\"#EE792F\" d=\"M116.36364 93.09091h46.54545v46.54545h-46.54545zM162.90909 93.09091h46.54545v46.54545h-46.54545zM69.81818 93.09091h46.54545v46.54545H69.81818z\"/><path d=\"M93.09091 139.63636h46.54545v46.54545H93.09091z\"/><path fill=\"#EB5829\" d=\"M116.36364 139.63636h46.54545v46.54545h-46.54545z\"/><path fill=\"#EE792F\" d=\"M209.45454 93.09091h46.54545v46.54545h-46.54545zM23.27273 93.09091h46.54545v46.54545H23.27273z\"/><path d=\"M186.18182 139.63636h46.54545v46.54545h-46.54545z\"/><path fill=\"#EB5829\" d=\"M209.45454 139.63636h46.54545v46.54545h-46.54545z\"/><path d=\"M186.18182 186.18182h46.54545v46.54545h-46.54545z\"/><path fill=\"#EB5829\" d=\"M23.27273 139.63636h46.54545v46.54545H23.27273z\"/><path fill=\"#EA3326\" d=\"M209.45454 186.18182h46.54545v46.54545h-46.54545zM23.27273 186.18182h46.54545v46.54545H23.27273z\"/></svg>`;

  container.innerHTML = `
    <!-- Glowing background pattern -->
    <div class="glow-bg"></div>

    <!-- 1. Hero Section -->
    <section class="hero container">
      <div class="hero-badge">
        <span class="badge badge-accent">
          <span class="badge-dot"></span>
          <span>Now in Public Sandbox</span>
        </span>
      </div>
      <h1 class="hero-title">
        One API. One SDK.<br>
        <span class="text-gradient">Every major AI model.</span>
      </h1>
      <p class="hero-subtitle">
        Integrate ShipKit once and query OpenAI, Anthropic, Gemini, Cohere, Llama, and Mistral dynamically. Built for infrastructure resilience and latency optimization.
      </p>
      <div class="hero-actions">
        <a href="#signup" class="btn btn-primary btn-lg">Get Started Free</a>
        <a href="#docs" class="btn btn-secondary btn-lg">Read Documentation</a>
      </div>
    </section>

    <!-- 2. Brand Marquee Showcase -->
    <section style="margin-bottom: var(--space-3xl)">
      <h3 class="showcase-title">Supported AI Providers</h3>
      <div class="marquee-container">
        <div class="marquee-track">
          <div class="provider-logo">${openaiSvg} <span>OpenAI</span></div>
          <div class="provider-logo">${anthropicSvg} <span>Anthropic</span></div>
          <div class="provider-logo">${googleSvg} <span>Google Gemini</span></div>
          <div class="provider-logo">${metaSvg} <span>Meta Llama</span></div>
          <div class="provider-logo">${cohereSvg} <span>Cohere</span></div>
          <div class="provider-logo">${mistralSvg} <span>Mistral</span></div>
          <!-- Repeat for infinite animation -->
          <div class="provider-logo">${openaiSvg} <span>OpenAI</span></div>
          <div class="provider-logo">${anthropicSvg} <span>Anthropic</span></div>
          <div class="provider-logo">${googleSvg} <span>Google Gemini</span></div>
          <div class="provider-logo">${metaSvg} <span>Meta Llama</span></div>
          <div class="provider-logo">${cohereSvg} <span>Cohere</span></div>
          <div class="provider-logo">${mistralSvg} <span>Mistral</span></div>
        </div>
      </div>
    </section>

    <!-- 3. Side-by-Side Code Comparison -->
    <section class="comparison-section container">
      <div class="section-header">
        <h2 class="section-title text-gradient">Integrate Once. Never Rewrite.</h2>
        <p class="section-subtitle">Stop managing six client libraries. Stop updating SDKs. Write clean code against a single API.</p>
      </div>

      <div class="comparison-grid">
        <!-- Without ShipKit -->
        <div class="comparison-card">
          <div class="comparison-label negative">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" x2="9" y1="9" y2="15"/><line x1="9" x2="15" y1="9" y2="15"/></svg>
            Traditional Multi-SDK integration
          </div>
          <div class="code-block">
            <div class="code-header">
              <span style="font-family: var(--font-heading); font-size: 0.8rem; color: var(--color-text-muted)">app.js</span>
            </div>
            <pre class="code-body"><code><span class="line-negative">// ❌ Import multiple SDK libraries</span>
import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { GoogleGenAI } from '@google/generative-ai';

<span class="line-negative">// ❌ Manage separate credentials and APIs</span>
const openai = new OpenAI({ apiKey: OPENAI_KEY });
const anthropic = new Anthropic({ apiKey: ANTHROPIC_KEY });
const google = new GoogleGenAI({ apiKey: GOOGLE_KEY });

async function getCompletion(prompt) {
  try {
<span class="line-negative">    // ❌ Query OpenAI with OpenAI specific schema</span>
    return await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }]
    });
  } catch (err) {
<span class="line-negative">    // ❌ Write custom manual retry and fallback catches</span>
    try {
      return await anthropic.messages.create({
        model: 'claude-3-5-sonnet',
        messages: [{ role: 'user', content: prompt }]
      });
    } catch (fallbackErr) {
       // Failover code...
    }
  }
}</code></pre>
          </div>
        </div>

        <!-- With ShipKit -->
        <div class="comparison-card">
          <div class="comparison-label positive">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 8 8 12 12 16"/><line x1="16" x2="8" y1="12" y2="12"/></svg>
            ShipKit Single-SDK integration
          </div>
          <div class="code-block" style="border-color: rgba(34, 197, 94, 0.3); box-shadow: var(--shadow-glow)">
            <div class="code-header">
              <span style="font-family: var(--font-heading); font-size: 0.8rem; color: var(--color-accent)">app.js</span>
              <span class="badge badge-accent" style="font-size: 0.7rem">1 API key</span>
            </div>
            <pre class="code-body"><code><span class="line-positive">// ✅ Import unified SDK</span>
import { ShipKit } from '@shipkit/sdk';

<span class="line-positive">// ✅ Initialize once with unified credentials</span>
const shipkit = new ShipKit({ apiKey: SHIPKIT_KEY });

async function getCompletion(prompt) {
<span class="line-positive">  // ✅ Single completions schema, automated fallbacks</span>
  return await shipkit.chat.completions.create({
    model: 'openai/gpt-4o',
    fallback_model: 'anthropic/claude-3-5-sonnet',
    messages: [{ role: 'user', content: prompt }]
  });
}</code></pre>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Interactive Playground Sandbox -->
    <section class="sandbox-section">
      <div class="container">
        <div class="section-header" style="margin-bottom: var(--space-2xl)">
          <h2 class="section-title text-gradient">Try the API Sandbox</h2>
          <p class="section-subtitle">Select a target model, pick an engineering task, and test the unified completion grid in real time.</p>
        </div>

        <div class="sandbox-container">
          <!-- Sandbox Controls -->
          <div class="sandbox-controls">
            <div class="sandbox-row">
              <div class="form-group">
                <label class="label">Target Model</label>
                <select class="input" id="sandbox-model-select">
                  ${sandboxModels.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="label">Predefined Prompt</label>
                <select class="input" id="sandbox-prompt-select">
                  <option value="default">Default Greeting</option>
                  <option value="explain">Explain AI Infrastructure</option>
                  <option value="code">Generate Code (Fibonacci)</option>
                  <option value="joke">Tell a Joke</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="label">User Query</label>
              <textarea class="input" id="sandbox-prompt-textarea" rows="4" style="resize: none;" readonly>I am OpenAI GPT-4o, running on the ShipKit unified routing grid. How can I assist you today?</textarea>
            </div>

            <button class="btn btn-primary" id="sandbox-run-btn" style="align-self: flex-start; min-width: 140px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              <span>Run Request</span>
            </button>
          </div>

          <!-- Sandbox Output Previewer -->
          <div class="sandbox-response-container">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="label" style="margin-bottom: 0;">Server Response (JSON Stream)</span>
              <div class="code-tabs" id="sandbox-tabs">
                <button class="code-tab active" data-tab="response">Response</button>
                <button class="code-tab" data-tab="curl">cURL Request</button>
              </div>
            </div>

            <!-- Tab 1: Interactive output -->
            <div class="sandbox-response-box" id="sandbox-tab-content-response">
              <div class="response-placeholder" id="sandbox-placeholder">Click "Run Request" to send stream packet.</div>
              <div class="streaming-text" id="sandbox-stream-text" style="display: none;"></div>
              
              <div class="sandbox-metrics" id="sandbox-metrics" style="display: none;">
                <div>Latency: <span class="sandbox-metric-val" id="metric-latency">0ms</span></div>
                <div>Fulfilled By: <span class="sandbox-metric-val" id="metric-provider">openai</span></div>
                <div>Cost: <span class="sandbox-metric-val" id="metric-cost">$0.00</span></div>
              </div>
            </div>

            <!-- Tab 2: cURL Code -->
            <div class="sandbox-response-box" id="sandbox-tab-content-curl" style="display: none; padding: var(--space-md);">
              <pre style="margin: 0;"><code id="sandbox-curl-code" style="color: var(--color-accent);"></code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Core Platform Features -->
    <section class="features-section container">
      <div class="section-header" style="margin-bottom: var(--space-3xl)">
        <h2 class="section-title text-gradient">Engineered for High Availability</h2>
        <p class="section-subtitle">Features that make ShipKit a robust developer platform for mission-critical apps.</p>
      </div>

      <div class="features-grid">
        <!-- Feature 1 -->
        <div class="card feature-card">
          <div class="feature-icon-box flex-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3 class="feature-title">Unified Billing</h3>
          <p class="feature-desc">Forget maintaining accounts and credit cards with OpenAI, Anthropic, and Google. Receive one invoice for all your global usage.</p>
        </div>

        <!-- Feature 2 -->
        <div class="card feature-card">
          <div class="feature-icon-box flex-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3-1.912 5.886H3.894l4.948 3.596L6.93 18.368 12 14.772l5.07 3.596-1.912-5.886 4.948-3.596h-6.194L12 3z"/></svg>
          </div>
          <h3 class="feature-title">Fallback Routing</h3>
          <p class="feature-desc">Create custom failover lists. If a provider throws a rate limit or server error, ShipKit dynamically reroutes requests to healthy endpoints.</p>
        </div>

        <!-- Feature 3 -->
        <div class="card feature-card">
          <div class="feature-icon-box flex-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
          </div>
          <h3 class="feature-title">Real-Time Observability</h3>
          <p class="feature-desc">Monitor total requests, response times, model-specific costs, and server logs instantly in a consolidated developer dashboard.</p>
        </div>
      </div>
    </section>

    <!-- 6. Call to Action Banner -->
    <section class="cta-banner">
      <div class="container">
        <h2 class="cta-title">Upgrade Your Infrastructure Today</h2>
        <p class="cta-desc">Join developers shipping reliable AI systems. Get 10,000 requests monthly on our sandbox tier, no credit card required.</p>
        <a href="#signup" class="btn btn-primary btn-lg" style="box-shadow: 0 0 25px rgba(34, 197, 94, 0.4)">Start Coding Free</a>
      </div>
    </section>
  `;

  // Attach Sandbox Logic
  initSandbox();
}

function initSandbox() {
  const modelSelect = document.getElementById('sandbox-model-select');
  const promptSelect = document.getElementById('sandbox-prompt-select');
  const promptTextarea = document.getElementById('sandbox-prompt-textarea');
  const runBtn = document.getElementById('sandbox-run-btn');
  
  const placeholder = document.getElementById('sandbox-placeholder');
  const streamText = document.getElementById('sandbox-stream-text');
  const metrics = document.getElementById('sandbox-metrics');
  
  const metricLatency = document.getElementById('metric-latency');
  const metricProvider = document.getElementById('metric-provider');
  const metricCost = document.getElementById('metric-cost');

  const curlCode = document.getElementById('sandbox-curl-code');
  const tabs = document.querySelectorAll('#sandbox-tabs button');
  const tabResponse = document.getElementById('sandbox-tab-content-response');
  const tabCurl = document.getElementById('sandbox-tab-content-curl');

  let activeTab = 'response';

  // Sync prompts and code snippets
  const syncSandboxFields = () => {
    const selectedModelId = modelSelect.value;
    const selectedPromptVal = promptSelect.value;
    const model = sandboxModels.find(m => m.id === selectedModelId);
    
    if (model && model.responses[selectedPromptVal]) {
      promptTextarea.value = getPromptText(selectedPromptVal);
      
      // Sync cURL display
      curlCode.textContent = `curl https://api.shipkit.com/v1/chat/completions \\
  -H "Authorization: Bearer sk_test_sandbox" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${model.id}",
    "messages": [
      {"role": "user", "content": "${getPromptText(selectedPromptVal).replace(/"/g, '\\"')}"}
    ]
  }'`;
    }
  };

  const getPromptText = (val) => {
    if (val === 'default') return 'Say hello and describe who you are.';
    if (val === 'explain') return 'Explain Unified AI Infrastructure.';
    if (val === 'code') return 'Generate code to calculate a Fibonacci sequence in JS.';
    if (val === 'joke') return 'Tell me a developer-focused joke.';
    return '';
  };

  modelSelect.onchange = syncSandboxFields;
  promptSelect.onchange = syncSandboxFields;
  syncSandboxFields();

  // Tab switching
  tabs.forEach(tab => {
    tab.onclick = () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.getAttribute('data-tab');

      if (activeTab === 'response') {
        tabResponse.style.display = 'flex';
        tabCurl.style.style = 'none';
        tabCurl.setAttribute('style', 'display: none;');
      } else {
        tabResponse.style.style = 'none';
        tabResponse.setAttribute('style', 'display: none;');
        tabCurl.style.display = 'block';
      }
    };
  });

  // Run Request Streaming Simulation
  runBtn.onclick = () => {
    const selectedModelId = modelSelect.value;
    const selectedPromptVal = promptSelect.value;
    const model = sandboxModels.find(m => m.id === selectedModelId);
    if (!model) return;

    const responseText = model.responses[selectedPromptVal] || '';

    // Reset View State
    placeholder.style.display = 'none';
    streamText.style.display = 'block';
    streamText.innerHTML = '<span class="cursor-blink"></span>';
    metrics.style.display = 'none';
    
    // Disable Button
    runBtn.disabled = true;
    runBtn.querySelector('span').innerText = 'Streaming...';

    let index = 0;
    const charsPerStep = 6;
    
    const streamInterval = setInterval(() => {
      index += charsPerStep;
      if (index >= responseText.length) {
        // Stream completed
        clearInterval(streamInterval);
        streamText.innerHTML = responseText.replace(/\n/g, '<br>') + '<span class="cursor-blink" style="display:none"></span>';
        
        // Show Metrics
        metricLatency.innerText = model.latency;
        metricProvider.innerText = model.providerName;
        metricCost.innerText = model.cost.split(' ')[0];
        metrics.style.display = 'flex';

        // Enable Button
        runBtn.disabled = false;
        runBtn.querySelector('span').innerText = 'Run Request';
        window.showToast(`Request fulfilled successfully by ${model.providerName}.`, 'success');
      } else {
        // Stream slice
        streamText.innerHTML = responseText.substring(0, index).replace(/\n/g, '<br>') + '<span class="cursor-blink"></span>';
      }
    }, 40);
  };
}
