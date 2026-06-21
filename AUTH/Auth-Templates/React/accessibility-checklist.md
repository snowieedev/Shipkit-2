# ShipKit Auth Template - Accessibility Checklist

This template implements the following accessibility standards:

## Forms & Inputs
- [x] All form `input` elements have associated `label` elements
- [x] Form controls use `aria-invalid` when validation fails
- [x] Error messages are clearly associated with their fields
- [x] Password visibility toggles have `sr-only` text identifying their state (Show/Hide password)
- [x] Password toggles have `tabIndex={-1}` where appropriate to avoid breaking form flow
- [x] Forms have `aria-label` identifying their purpose

## Keyboard Navigation
- [x] All interactive elements (buttons, links, inputs) are reachable via `Tab`
- [x] Focus states are clearly visible using `focus-visible:ring-2`
- [x] Skip links and structural hierarchy allow easy navigation
- [x] Links to forgot password are easily reachable from the password input

## Visual & Semantic
- [x] Color contrast ratios meet WCAG AA standards (via Shadcn default palette)
- [x] SVGs use `aria-hidden="true"` or role="img" where appropriate
- [x] Semantic HTML elements are used where applicable
- [x] Headings follow a logical document outline (`h2` for card titles)
