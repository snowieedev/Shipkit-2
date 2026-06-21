# ShipKit Production Readiness Checklist

Before deploying the ShipKit Astro Authentication Template to production, verify the following:

## Environment Variables
- [ ] Ensure all required environment variables outlined in `shipkit-env-spec.md` are configured in the deployment environment.
- [ ] Verify `SESSION_SECRET` (if applicable) is set to a secure, random string.
- [ ] Verify `DATABASE_URL` is pointing to the production database and not a local instance.
- [ ] Confirm OAuth Provider Client IDs and Secrets are configured for the production domain.

## ShipKit Assembly
- [ ] Verify that ShipKit has successfully assembled and injected the specific `AUTH_ENGINE`, `DATABASE_ADAPTER`, and `PROVIDERS`.
- [ ] Check `shipkit.manifest.json` matches expectations.

## Security
- [ ] Ensure the application is served over HTTPS to secure authentication cookies and credentials.
- [ ] Verify CSRF protection is active (if required by the injected Auth Engine).
- [ ] Ensure cookie settings enforce `Secure`, `HttpOnly`, and `SameSite` flags.
- [ ] Verify no secrets are exposed in the client-side bundle or Astro components.

## Performance
- [ ] Ensure Astro build executes without errors (`npm run build`).
- [ ] Verify React components (`LoginForm`, `SignupForm`, etc.) are explicitly hydrated with `client:load` or `client:idle` directives.
- [ ] Confirm that large provider icons or SVGs are properly optimized.

## Error Handling
- [ ] Validate that `/auth-error` properly catches and displays errors from OAuth providers or database failures.
- [ ] Ensure no raw stack traces are shown on the client in the production build.
