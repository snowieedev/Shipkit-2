# ShipKit CLI Guide (`@snowieedev/shipkit`)

Welcome to the **ShipKit CLI** guide. The `@snowieedev/shipkit` command-line tool enables developers to authenticate, initialize new boilerplates, and manage connected integration providers directly from their local terminal.

---

## 🚀 1. Installation

You can install the ShipKit CLI globally using your favorite package manager:

```bash
# Using npm
npm install -g @snowieedev/shipkit

# Using pnpm
pnpm add -g @snowieedev/shipkit

# Using yarn
yarn global add @snowieedev/shipkit
```

Verify that the installation was successful by running:
```bash
shipkit --help
```

---

## 🔄 2. Updating

To ensure you have the latest features and bug fixes (such as improved network connectivity error reporting), update your global installation:

```bash
# Using npm
npm update -g @snowieedev/shipkit

# Force install the latest version (alternative)
npm install -g @snowieedev/shipkit@latest

# Using pnpm
pnpm update -g @snowieedev/shipkit
```

---

## 🔑 3. Authentication & Login

The CLI securely authenticates with the ShipKit backend. By default, it connects to the production servers at `https://shipkit-bice.vercel.app`.

### Logging In
To log into your developer account:
```bash
shipkit login
```
You will be prompted to enter your registered email and password. Once authenticated, your local session token will be saved securely under your system's user config directory (`~/.config/configstore/shipkit.json`).

### Logging Out
To clear your local credentials and end the session:
```bash
shipkit logout
```

### Local Development / Custom API Endpoint
If you are developing or testing the backend api locally, you can redirect the CLI to a local dev server (e.g., `http://localhost:3000`) by setting the `SHIPKIT_API_URL` environment variable:

* **Windows (PowerShell):**
  ```powershell
  $env:SHIPKIT_API_URL="http://localhost:3000"
  shipkit login
  ```
* **macOS / Linux:**
  ```bash
  export SHIPKIT_API_URL="http://localhost:3000"
  shipkit login
  ```
* **Windows (CMD):**
  ```cmd
  set SHIPKIT_API_URL=http://localhost:3000
  shipkit login
  ```

---

## 🛠️ 4. Commands Reference

### `shipkit login`
* **Description**: Log into your ShipKit account.
* **Usage**: `shipkit login`

### `shipkit init`
* **Description**: Create a new ShipKit project config inside the current directory.
* **Usage**: `shipkit init`
* **How it works**:
  1. Requests project name, framework (Next.js, Vite, Vue, SvelteKit, Node.js), and integration providers (Supabase, Stripe, Resend, etc.).
  2. Submits details to the ShipKit backend to register the project.
  3. Automatically writes a `shipkit.config.json` file in your root workspace.

### `shipkit providers`
* **Description**: View the status of all integration providers for your active project.
* **Usage**: `shipkit providers`
* **How it works**: Reads the config from `shipkit.config.json` and fetches connection statuses (e.g., `Connected` or `Missing`) from the backend.

### `shipkit logout`
* **Description**: Remove active credentials and log out of the active terminal session.
* **Usage**: `shipkit logout`

---

## 🗝️ 5. Connecting and Using API Keys

ShipKit uses two types of tokens/keys. Understanding the difference is important:

| Key Type | What it's used for | Where it's stored |
| :--- | :--- | :--- |
| **CLI Session Token** | Standard developer session, generated when you run `shipkit login` with email/password. | Locally in `configstore` on your PC. |
| **Project API Key** | Machine-to-machine key used by your boilerplate applications and CI/CD pipelines to securely interact with the ShipKit API (e.g. for event tracking, telemetry, or deployments). | Generated in Dashboard, stored in your app's `.env.local`. |

### Generating a Project API Key
1. Go to the [ShipKit Dashboard](https://shipkit-bice.vercel.app/dashboard).
2. Select your Project, and navigate to the **API Keys** section.
3. Click **Create New Key**. Give it a name (e.g., `Development Key`) and copy the generated secret key (it begins with `sk_live_...`).
4. **Important**: Store it safely, as it will only be shown once.

### Configuring it in Your Project
Set the copied key as an environment variable in your project's `.env` or `.env.local` file:

```env
SHIPKIT_API_KEY=sk_live_your_actual_key_here
```

### Verifying or Interacting with the API
When sending requests to the ShipKit endpoint `/api/cli`, append the key as a Bearer token in the headers:

```http
POST /api/cli
Authorization: Bearer sk_live_your_actual_key_here
Content-Type: application/json

{
  "action": "verify"
}
```
* **Actions Available:**
  * `verify`: Validates that the API Key is active and returns project metadata.
  * `log_installation`: Registers installed features or packages to the backend dashboard.
