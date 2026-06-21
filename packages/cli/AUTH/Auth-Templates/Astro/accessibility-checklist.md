# ShipKit Accessibility Checklist

The authentication experience must be fully accessible. This checklist ensures the generated template complies with standard accessibility (a11y) requirements.

## Forms & Inputs
- [ ] All inputs (`<input>`) have corresponding `<label>` elements connected via `htmlFor` and `id` attributes.
- [ ] The `PasswordInput` visibility toggle button has a screen-reader-only accessible name (`sr-only` class) such as "Toggle password visibility".
- [ ] Required fields enforce native `required` attributes.
- [ ] Error messages are tied to inputs via `aria-describedby` or explicitly announced using `aria-live` regions.

## Keyboard Navigation
- [ ] All interactive elements (inputs, buttons, links, "Remember me" checkbox) are reachable via `Tab` navigation.
- [ ] Focus states are clearly visible for all interactive elements (managed by Tailwind's `focus-visible:ring` utilities).
- [ ] No keyboard traps exist within the authentication flow.

## Visual Accessibility
- [ ] Text contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text).
- [ ] Forms do not rely on color alone to convey error states (e.g., error messages are clearly written out below or above the inputs).
- [ ] Supports High Contrast and Dark Mode settings.
- [ ] Font size remains legible and responds correctly if the user increases the default browser font size.

## Screen Readers
- [ ] The page `<title>` dynamically reflects the current authentication state (e.g., "Sign In | ShipKit", "Create Account | ShipKit").
- [ ] Loading states on buttons are announced properly (e.g., via `aria-disabled="true"` and appropriate ARIA live text).
- [ ] The `<html lang="en">` attribute is present on `AuthLayout.astro`.
