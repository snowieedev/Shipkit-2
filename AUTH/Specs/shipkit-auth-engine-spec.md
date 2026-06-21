# ShipKit Auth Engine Specification (shipkit-auth-engine-spec.md)

Version: 1.0
Status: Canonical Contract

## Purpose

Defines the contract for all ShipKit authentication engines.

Current engines:

- Better Auth
- Clerk

Future engines MUST follow this contract.

---

## Responsibilities

Auth Engines are responsible for:

- Authentication
- Session management
- Provider registration
- Database adapter registration
- User lifecycle management

Auth Engines MUST NOT contain framework-specific UI.

---

## Required Public Interface

Every engine MUST expose:

createAuth()
registerProvider()
registerDatabaseAdapter()
getSession()
signIn()
signOut()

Names MUST NOT change.

---

## Engine Folder Contract

Engine/
├── core/
├── providers/
├── adapters/
├── session/
└── exports/

Structure may vary internally but functionality must remain identical.

---

## Provider Registration Contract

Every engine MUST support:

registerProvider(provider)

Provider object MUST contain:

id
name
type
config

---

## Database Registration Contract

Every engine MUST support:

registerDatabaseAdapter(adapter)

Adapter MUST expose:

connect()
disconnect()
createUser()
updateUser()
deleteUser()
createSession()
deleteSession()

---

## Session Contract

Engine MUST return:

{
  id,
  userId,
  email,
  createdAt,
  expiresAt
}

No engine-specific session shapes allowed.

---

## User Contract

Engine MUST return:

{
  id,
  email,
  emailVerified,
  createdAt,
  updatedAt
}

Optional:

name
image

---

## Provider Compatibility

Engines MUST support:

- Email
- Google
- GitHub
- Microsoft

No provider may require engine-specific modifications.

---

## Error Contract

Engines MUST return structured errors.

Shape:

{
  code,
  message,
  details?
}

Never throw raw provider errors to consumers.

---

## Environment Requirements

Engines MUST consume configuration only through environment injection.

No hardcoded credentials.

---

## Security Requirements

Must support:

- Secure sessions
- Session expiration
- Session revocation
- Email verification
- Password hashing (when applicable)
- Production deployment

---

## Assembly Contract

Engine MUST expose:

AUTH_ENGINE_EXPORT

ShipKit assembler injects:

DATABASE_ADAPTER
PROVIDERS
ENVIRONMENT_CONFIG

Engine MUST remain framework-agnostic.

---

## Forbidden

Engine MUST NOT:

- Render UI
- Create framework routes
- Depend on a specific database
- Depend on a specific provider
- Depend on a specific framework

---

## Validation Checklist

Engine is valid only if:

- Works with all databases
- Works with all providers
- Works with all templates
- Exposes required interface
- Produces standard session shape
- Produces standard user shape
- Supports production deployment
