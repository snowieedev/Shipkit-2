export const pricingPlans = {
  monthly: [
    {
      id: 'sandbox',
      name: 'Sandbox',
      price: '$0',
      period: 'forever',
      description: 'Ideal for local prototyping and testing developer integrations.',
      features: [
        '10,000 monthly requests',
        'Access to 6+ AI providers',
        'Max 1 active API key',
        'Basic model failover routing',
        'Community Discord support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      id: 'developer',
      name: 'Developer',
      price: '$29',
      period: 'month',
      description: 'Built for scaling applications and production deployments.',
      features: [
        '500,000 monthly requests',
        'Unlimited API keys',
        'Smart latency routing',
        'Auto provider fallback handling',
        '7-day request log history',
        'Priority email support (24hr SLA)'
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true
    },
    {
      id: 'scale',
      name: 'Scale',
      price: 'Custom',
      period: 'tailored',
      description: 'For mission-critical production infrastructure and enterprise compliance.',
      features: [
        'Unlimited monthly requests',
        'Custom failover routing rules',
        '99.99% uptime SLA guarantee',
        'Dedicated server endpoints',
        '30-day log history retention',
        'Dedicated Slack support channel'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ],
  yearly: [
    {
      id: 'sandbox',
      name: 'Sandbox',
      price: '$0',
      period: 'forever',
      description: 'Ideal for local prototyping and testing developer integrations.',
      features: [
        '10,000 monthly requests',
        'Access to 6+ AI providers',
        'Max 1 active API key',
        'Basic model failover routing',
        'Community Discord support'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      id: 'developer',
      name: 'Developer',
      price: '$23',
      period: 'month',
      description: 'Built for scaling applications and production deployments.',
      features: [
        '500,000 monthly requests',
        'Unlimited API keys',
        'Smart latency routing',
        'Auto provider fallback handling',
        '7-day request log history',
        'Priority email support (24hr SLA)'
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true,
      billedLabel: 'Billed annually ($276/yr)'
    },
    {
      id: 'scale',
      name: 'Scale',
      price: 'Custom',
      period: 'tailored',
      description: 'For mission-critical production infrastructure and enterprise compliance.',
      features: [
        'Unlimited monthly requests',
        'Custom failover routing rules',
        '99.99% uptime SLA guarantee',
        'Dedicated server endpoints',
        '30-day log history retention',
        'Dedicated Slack support channel'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ]
};

export const docsContent = {
  'getting-started': {
    title: 'Getting Started',
    description: `ShipKit is a unified AI infrastructure platform that allows developers to access multiple AI providers (OpenAI, Anthropic, Google, Meta, Cohere, Mistral) through a single API and SDK.
    
    Instead of dealing with dozens of API keys, client libraries, billing systems, and rate limits, you integrate ShipKit once and route your requests dynamically.
    
    ### Key Benefits
    - **Single Integration**: Write your code once, switch models on the fly.
    - **Automatic Failovers**: If OpenAI goes down, dynamically fall back to Claude or Llama instantly.
    - **Cost & Latency Routing**: Send requests to the fastest or cheapest provider depending on user tiers.
    - **Unified Dashboard**: Review logs, cost metrics, and performance charts in one workspace.`,
    isGeneral: true
  },
  'quick-start': {
    title: 'Quick Start',
    description: `Get up and running with ShipKit in under two minutes. Install the package, obtain your API key, and make your first completion call.
    
    First, ensure you have your ShipKit API Key generated from the [Dashboard API Keys panel](#dashboard/keys).
    
    ### Installation
    \`\`\`bash
    npm install @shipkit/sdk
    # or for Python
    pip install shipkit-sdk
    \`\`\`
    
    Then initialize the client and request a completion. Check the code tabs to see how easy it is to write standard chat completion calls.`,
    codeSamples: {
      js: `import { ShipKit } from '@shipkit/sdk';

const shipkit = new ShipKit({
  apiKey: process.env.SHIPKIT_API_KEY
});

const response = await shipkit.chat.completions.create({
  // Specify model prefix: provider/model
  model: 'anthropic/claude-3-5-sonnet',
  messages: [
    { role: 'user', content: 'What is unified AI infrastructure?' }
  ]
});

console.log(response.choices[0].message.content);`,
      python: `from shipkit import ShipKit
import os

shipkit = ShipKit(
    api_key=os.environ.get("SHIPKIT_API_KEY")
)

response = shipkit.chat.completions.create(
    # Specify model prefix: provider/model
    model="anthropic/claude-3-5-sonnet",
    messages=[
        {"role": "user", "content": "What is unified AI infrastructure?"}
    ]
)

print(response.choices[0].message.content)`,
      curl: `curl https://api.shipkit.com/v1/chat/completions \\
  -H "Authorization: Bearer $SHIPKIT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-3-5-sonnet",
    "messages": [
      {"role": "user", "content": "What is unified AI infrastructure?"}
    ]
  }'`
    }
  },
  'authentication': {
    title: 'Authentication',
    description: `All API requests to ShipKit must be authenticated. ShipKit uses Bearer tokens to authenticate requests. You can manage your API keys in the [API Keys section](#dashboard/keys) of your dashboard.
    
    ### API Key Prefixing
    To prevent accidents, ShipKit API keys have prefixes:
    - \`sk_live_...\`: Active credentials for production routes.
    - \`sk_test_...\`: Sandbox credentials for local development. Never charges your wallet.
    
    Provide your API key in the \`Authorization\` header of your requests:
    
    \`\`\`http
    Authorization: Bearer YOUR_SHIPKIT_API_KEY
    \`\`\``,
    isGeneral: true
  },
  'api-keys': {
    title: 'API Keys Policy',
    description: `Keep your API keys secret. Do not hardcode them in frontend client code or push them to public code repositories. Always read keys from environment variables.
    
    ### Key Rotation
    If a key is compromised, you should instantly revoke it and generate a new one from the dashboard. All keys are revoked immediately and any requests using them will fail with a \`401 Unauthorized\` error.`,
    isGeneral: true
  },
  'sdk-usage': {
    title: 'SDK Usage',
    description: `The ShipKit SDK wraps our REST API and provides full TypeScript autocompletion, automatic retries with exponential backoff, and helper methods.
    
    ### Client Options
    The client accepts optional parameters upon initialization:
    - \`timeout\`: Maximum duration for requests before throwing (default: \`30000ms\`).
    - \`maxRetries\`: Number of retry attempts on provider rate limits or network issues (default: \`3\`).
    - \`fallbackPolicy\`: Custom failover behavior (e.g. \`['openai', 'anthropic', 'google']\`).`,
    codeSamples: {
      js: `import { ShipKit } from '@shipkit/sdk';

const shipkit = new ShipKit({
  apiKey: process.env.SHIPKIT_API_KEY,
  timeout: 15000, // 15s timeout
  maxRetries: 5,
  defaultFallback: 'openai/gpt-4o' // if preferred model fails
});`,
      python: `from shipkit import ShipKit

shipkit = ShipKit(
    api_key="sk_live_...",
    timeout=15.0, # 15s
    max_retries=5,
    default_fallback="openai/gpt-4o"
)`,
      curl: `# Client configuration is passed in request parameters
curl https://api.shipkit.com/v1/chat/completions \\
  -H "Authorization: Bearer sk_live_..." \\
  -d '{
    "model": "anthropic/claude-3-5-sonnet",
    "fallback_model": "openai/gpt-4o",
    "messages": [{"role": "user", "content": "Hi"}]
  }'`
    }
  },
  'requests': {
    title: 'Requests Structure',
    description: `ShipKit completions requests follow the OpenAI chat completion schema. This makes migrating existing applications simple.
    
    ### Endpoint
    \`POST https://api.shipkit.com/v1/chat/completions\`
    
    ### Parameters Table`,
    path: '/v1/chat/completions',
    method: 'POST',
    params: [
      { name: 'model', type: 'string', required: true, desc: 'The model identifier to route to, structured as `provider/model_name` (e.g., `openai/gpt-4o` or `anthropic/claude-3-5-sonnet`).' },
      { name: 'messages', type: 'array', required: true, desc: 'An array of message objects representing the chat history. Each object contains `role` (system/user/assistant) and `content`.' },
      { name: 'temperature', type: 'number', required: false, desc: 'Controls generation randomness. Values between 0.0 and 2.0.' },
      { name: 'max_tokens', type: 'integer', required: false, desc: 'The maximum number of tokens to generate.' },
      { name: 'fallback_model', type: 'string', required: false, desc: 'Backup model identifier. If the main provider encounters a 5xx error, the request automatically routes here.' }
    ],
    codeSamples: {
      js: `const response = await shipkit.chat.completions.create({
  model: 'openai/gpt-4o',
  fallback_model: 'anthropic/claude-3-5-sonnet',
  messages: [
    { role: 'system', content: 'You are a helpful coding assistant.' },
    { role: 'user', content: 'Write a quicksort in JavaScript.' }
  ],
  temperature: 0.2,
  max_tokens: 1000
});`,
      python: `response = shipkit.chat.completions.create(
    model="openai/gpt-4o",
    fallback_model="anthropic/claude-3-5-sonnet",
    messages=[
        {"role": "system", "content": "You are a helpful coding assistant."},
        {"role": "user", "content": "Write a quicksort in JavaScript."}
    ],
    temperature=0.2,
    max_tokens=1000
)`,
      curl: `curl https://api.shipkit.com/v1/chat/completions \\
  -H "Authorization: Bearer $SHIPKIT_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o",
    "fallback_model": "anthropic/claude-3-5-sonnet",
    "messages": [
      {"role": "system", "content": "You are a helpful coding assistant."},
      {"role": "user", "content": "Write a quicksort in JavaScript."}
    ],
    "temperature": 0.2,
    "max_tokens": 1000
  }'`
    }
  },
  'responses': {
    title: 'Responses Structure',
    description: `All responses from ShipKit are formatted in a standardized JSON envelope. It contains generation outputs, token counts, and routing diagnostics indicating which provider fulfilled the query.`,
    codeSamples: {
      js: `// Response Object schema:
{
  "id": "sk_chat_cmp_9a8f2e4c",
  "object": "chat.completion",
  "created": 1718859600,
  "model": "openai/gpt-4o",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Here is the code..."
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 28,
    "completion_tokens": 142,
    "total_tokens": 170
  },
  "shipkit_meta": {
    "fulfilled_by": "openai",
    "attempts": 1,
    "latency_ms": 620,
    "cost_usd": 0.00125
  }
}`,
      python: `# Python dictionary mirrors the JSON format:
{
    "id": "sk_chat_cmp_9a8f2e4c",
    "object": "chat.completion",
    "created": 1718859600,
    "model": "openai/gpt-4o",
    "choices": [
        {
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Here is the code..."
            },
            "finish_reason": "stop"
        }
    ],
    "usage": {
        "prompt_tokens": 28,
        "completion_tokens": 142,
        "total_tokens": 170
    },
    "shipkit_meta": {
        "fulfilled_by": "openai",
        "attempts": 1,
        "latency_ms": 620,
        "cost_usd": 0.00125
    }
}`,
      curl: `# Raw HTTP response headers and body
HTTP/2 200 OK
Content-Type: application/json

{
  "id": "sk_chat_cmp_9a8f2e4c",
  "object": "chat.completion",
  "created": 1718859600,
  "model": "openai/gpt-4o",
  "choices": [{
    "index": 0,
    "message": {
      "role": "assistant",
      "content": "Here is the code..."
    },
    "finish_reason": "stop"
  }],
  "usage": {
    "prompt_tokens": 28,
    "completion_tokens": 142,
    "total_tokens": 170
  },
  "shipkit_meta": {
    "fulfilled_by": "openai",
    "attempts": 1,
    "latency_ms": 620,
    "cost_usd": 0.00125
  }
}`
    }
  },
  'errors': {
    title: 'Errors Handling',
    description: `ShipKit captures underlying provider errors and normalizes them into standard exception models. This ensures your catch blocks remain robust regardless of the backend provider.
    
    ### Error Response Envelope
    \`\`\`json
    {
      "error": {
        "code": "provider_rate_limit",
        "message": "The downstream provider (Anthropic) rate limited this request.",
        "provider": "anthropic",
        "status": 429
      }
    }
    \`\`\`
    
    ### Common Error Codes`,
    params: [
      { name: 'unauthorized', type: '401', required: false, desc: 'Your ShipKit API Key is invalid or expired.' },
      { name: 'provider_rate_limit', type: '429', required: false, desc: 'The active AI model rate limits have been hit, and no fallbacks succeeded.' },
      { name: 'provider_timeout', type: '504', required: false, desc: 'The downstream provider took too long to respond.' },
      { name: 'insufficient_funds', type: '402', required: false, desc: 'Your ShipKit developer account credit balance is exhausted.' }
    ]
  }
};

export const sandboxModels = [
  {
    id: 'openai/gpt-4o',
    name: 'OpenAI GPT-4o',
    provider: 'openai',
    providerName: 'OpenAI',
    latency: '450ms',
    cost: '$5.00 / M tokens',
    responses: {
      default: 'I am OpenAI GPT-4o, running on the ShipKit unified routing grid. How can I assist you today?',
      code: 'Here is a quick function to calculate fibonacci in JavaScript:\n\n```javascript\nfunction fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}\n```\nIt is simple and clean!',
      explain: 'Unified AI Infrastructure lets developers interact with multiple AI providers (OpenAI, Anthropic, Google) using a single SDK. ShipKit abstracts the integrations, handles keys, standardizes schemas, and automatically retries/routes queries, ensuring 100% application uptime.',
      joke: 'Why do programmers prefer dark mode? Because light attracts bugs! 🐛'
    }
  },
  {
    id: 'anthropic/claude-3-5-sonnet',
    name: 'Anthropic Claude 3.5 Sonnet',
    provider: 'anthropic',
    providerName: 'Anthropic',
    latency: '620ms',
    cost: '$3.00 / M tokens',
    responses: {
      default: 'Hello! I am Claude 3.5 Sonnet, served through ShipKit\'s universal API. I am optimized for advanced reasoning, analytical tasks, and writing.',
      code: 'Here is a highly optimized Fibonacci calculator in JavaScript using memoization to avoid redundant computations:\n\n```javascript\nconst fibonacci = (function() {\n  const memo = {};\n  function f(n) {\n    if (n in memo) return memo[n];\n    if (n <= 1) return n;\n    return memo[n] = f(n - 1) + f(n - 2);\n  }\n  return f;\n})();\n```\nThis runs in O(N) linear time.',
      explain: 'Think of ShipKit as a load balancer for AI APIs. Instead of locking yourself into OpenAI, you write code against ShipKit. If OpenAI experiences an outage or latency spike, ShipKit automatically redirects your traffic to Claude or Gemini in milliseconds. Your users never notice a thing.',
      joke: 'There are 10 types of people in this world: Those who understand binary, and those who don\'t. 😄'
    }
  },
  {
    id: 'google/gemini-1-5-pro',
    name: 'Google Gemini 1.5 Pro',
    provider: 'google',
    providerName: 'Google',
    latency: '510ms',
    cost: '$1.25 / M tokens',
    responses: {
      default: 'Welcome. I am Gemini 1.5 Pro, routing via ShipKit. I feature massive context window capabilities and high multimodality logic.',
      code: 'Here is how you can write a Fibonacci sequence generator using JavaScript generators:\n\n```javascript\nfunction* fibonacciSequence() {\n  let a = 0, b = 1;\n  while (true) {\n    yield a;\n    [a, b] = [b, a + b];\n  }\n}\n// Usage:\nconst gen = fibonacciSequence();\nconsole.log(gen.next().value); // 0\nconsole.log(gen.next().value); // 1\n```',
      explain: 'Integrating AI is painful because every company has different token structures, client SDKs, billing methods, and rate limits. ShipKit standardizes all of this. You get one API key, one bill, and a unified completions endpoint that automatically manages fallbacks and routes queries optimally.',
      joke: 'How many programmers does it take to change a light bulb? None, that is a hardware problem! 💡'
    }
  },
  {
    id: 'meta/llama-3-70b',
    name: 'Meta Llama 3 70B',
    provider: 'meta',
    providerName: 'Meta',
    latency: '340ms',
    cost: '$0.80 / M tokens',
    responses: {
      default: 'Llama 3 70B here, routing through ShipKit\'s fast server network. I am an open-weights model fine-tuned for high efficiency.',
      code: 'Here is a simple iterative approach to Fibonacci in JS, which is memory efficient:\n\n```javascript\nfunction fibonacci(n) {\n  let arr = [0, 1];\n  for (let i = 2; i <= n; i++) {\n    arr.push(arr[i - 1] + arr[i - 2]);\n  }\n  return arr[n];\n}\n```',
      explain: 'Unified AI infrastructure minimizes vendor lock-in. If a provider changes their pricing, modifies their model weights, or updates their terms of service, you can swap to another provider instantly by changing a single line of config in your ShipKit dashboard, without code redeploys.',
      joke: 'Why did the developer go broke? Because he used up all his cache! 💸'
    }
  }
];

export const mockLogs = [
  { time: '10:28:45', model: 'anthropic/claude-3-5-sonnet', status: 200, latency: '612ms', cost: '$0.00340' },
  { time: '10:28:12', model: 'openai/gpt-4o', status: 200, latency: '480ms', cost: '$0.00620' },
  { time: '10:27:58', model: 'openai/gpt-4o', status: 500, latency: '3200ms', cost: '$0.00000', fallback: 'google/gemini-1-5-pro' },
  { time: '10:27:59', model: 'google/gemini-1-5-pro', status: 200, latency: '420ms', cost: '$0.00085', note: 'Fallback Fulfillment' },
  { time: '10:26:02', model: 'meta/llama-3-70b', status: 200, latency: '280ms', cost: '$0.00021' },
  { time: '10:24:30', model: 'openai/gpt-4o', status: 429, latency: '150ms', cost: '$0.00000', fallback: 'anthropic/claude-3-5-sonnet' },
  { time: '10:24:30', model: 'anthropic/claude-3-5-sonnet', status: 200, latency: '590ms', cost: '$0.00290', note: 'Fallback Fulfillment' },
  { time: '10:22:15', model: 'cohere/command-r', status: 200, latency: '390ms', cost: '$0.00072' }
];
