// Mock Authentication Manager using LocalStorage

// Initialize dummy user database if not exists
const USERS_DB_KEY = 'shipkit_users_db';
const SESSION_KEY = 'shipkit_session';

if (!localStorage.getItem(USERS_DB_KEY)) {
  const defaultUsers = [
    {
      id: 'usr_default_8f2e4c',
      name: 'Alice Developer',
      email: 'alice@shipkit.com',
      password: 'password123',
      organization: 'Alice\'s Workspace',
      orgId: 'org_8f2e4c9a8',
      plan: 'developer',
      apiKeys: [
        {
          id: 'key_1',
          name: 'Default Live Key',
          value: 'sk_live_dev_8f2e4c9a8b7c6d5e4f3g2h1i',
          created: '2026-06-15',
          status: 'Active',
          masked: 'sk_live_dev_8f2e...2h1i'
        }
      ],
      customKeys: {
        openai: '',
        anthropic: '',
        google: ''
      },
      settings: {
        budgetAlert: true,
        threshold: 500,
        webhookUrl: 'https://api.myproject.com/shipkit-webhook'
      }
    }
  ];
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(defaultUsers));
}

// Helper to get all users from DB
function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_DB_KEY)) || [];
}

// Helper to save users to DB
function saveUsers(users) {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
}

// Exported Auth Interface
export const auth = {
  getCurrentUser() {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;
    
    const users = getUsers();
    return users.find(u => u.email === session) || null;
  },

  login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          localStorage.setItem(SESSION_KEY, user.email);
          window.dispatchEvent(new CustomEvent('auth-change', { detail: user }));
          resolve(user);
        } else {
          reject(new Error('Invalid email or password.'));
        }
      }, 500); // Simulate network latency
    });
  },

  signup(name, email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = getUsers();
        const exists = users.some(u => u.email === email);
        
        if (exists) {
          reject(new Error('An account with this email already exists.'));
          return;
        }

        const newId = 'usr_' + Math.random().toString(36).substring(2, 8);
        const orgId = 'org_' + Math.random().toString(36).substring(2, 10);
        
        const newUser = {
          id: newId,
          name,
          email,
          password,
          organization: `${name}'s Workspace`,
          orgId: orgId,
          plan: 'sandbox', // Starts on Sandbox free tier
          apiKeys: [
            {
              id: 'key_' + Date.now(),
              name: 'Sandbox Key',
              value: 'sk_test_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
              created: new Date().toISOString().split('T')[0],
              status: 'Active',
              masked: '' // populated dynamically
            }
          ],
          customKeys: {
            openai: '',
            anthropic: '',
            google: ''
          },
          settings: {
            budgetAlert: false,
            threshold: 100,
            webhookUrl: ''
          }
        };

        // Mask the sandbox key value
        newUser.apiKeys[0].masked = newUser.apiKeys[0].value.substring(0, 12) + '...' + newUser.apiKeys[0].value.slice(-4);
        
        users.push(newUser);
        saveUsers(users);
        
        // Log user in automatically
        localStorage.setItem(SESSION_KEY, email);
        window.dispatchEvent(new CustomEvent('auth-change', { detail: newUser }));
        resolve(newUser);
      }, 500);
    });
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent('auth-change', { detail: null }));
    return Promise.resolve();
  },

  // Updates profile name or organization name
  updateProfile(name, organization) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return Promise.reject(new Error('Not logged in'));

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex !== -1) {
      users[userIndex].name = name;
      users[userIndex].organization = organization;
      saveUsers(users);
      window.dispatchEvent(new CustomEvent('auth-change', { detail: users[userIndex] }));
      return Promise.resolve(users[userIndex]);
    }
    
    return Promise.reject(new Error('User not found in DB'));
  },

  // Updates custom provider credentials
  updateCustomKeys(openai, anthropic, google) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return Promise.reject(new Error('Not logged in'));

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
      users[userIndex].customKeys = { openai, anthropic, google };
      saveUsers(users);
      return Promise.resolve(users[userIndex]);
    }
    return Promise.reject(new Error('User not found in DB'));
  },

  // Updates alert settings
  updateSettings(budgetAlert, threshold, webhookUrl) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return Promise.reject(new Error('Not logged in'));

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
      users[userIndex].settings = { budgetAlert, threshold, webhookUrl };
      saveUsers(users);
      return Promise.resolve(users[userIndex]);
    }
    return Promise.reject(new Error('User not found in DB'));
  },

  // CRUD for API Keys
  createApiKey(keyName) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return Promise.reject(new Error('Not logged in'));

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
      const isLive = users[userIndex].plan !== 'sandbox';
      const prefix = isLive ? 'sk_live_' : 'sk_test_';
      const keySuffix = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const fullValue = prefix + keySuffix;
      
      const newKey = {
        id: 'key_' + Date.now(),
        name: keyName || 'New API Key',
        value: fullValue,
        created: new Date().toISOString().split('T')[0],
        status: 'Active',
        masked: fullValue.substring(0, 12) + '...' + fullValue.slice(-4)
      };

      users[userIndex].apiKeys.push(newKey);
      saveUsers(users);
      window.dispatchEvent(new CustomEvent('auth-change', { detail: users[userIndex] }));
      return Promise.resolve(newKey);
    }
    return Promise.reject(new Error('User not found in DB'));
  },

  revokeApiKey(keyId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return Promise.reject(new Error('Not logged in'));

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
      users[userIndex].apiKeys = users[userIndex].apiKeys.filter(k => k.id !== keyId);
      saveUsers(users);
      window.dispatchEvent(new CustomEvent('auth-change', { detail: users[userIndex] }));
      return Promise.resolve();
    }
    return Promise.reject(new Error('User not found in DB'));
  },

  regenerateApiKey(keyId) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return Promise.reject(new Error('Not logged in'));

    const users = getUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
      const keyIndex = users[userIndex].apiKeys.findIndex(k => k.id === keyId);
      if (keyIndex !== -1) {
        const isLive = users[userIndex].plan !== 'sandbox';
        const prefix = isLive ? 'sk_live_' : 'sk_test_';
        const keySuffix = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const fullValue = prefix + keySuffix;

        users[userIndex].apiKeys[keyIndex].value = fullValue;
        users[userIndex].apiKeys[keyIndex].masked = fullValue.substring(0, 12) + '...' + fullValue.slice(-4);
        users[userIndex].apiKeys[keyIndex].created = new Date().toISOString().split('T')[0];

        saveUsers(users);
        window.dispatchEvent(new CustomEvent('auth-change', { detail: users[userIndex] }));
        return Promise.resolve(users[userIndex].apiKeys[keyIndex]);
      }
      return Promise.reject(new Error('API key not found'));
    }
    return Promise.reject(new Error('User not found in DB'));
  }
};
