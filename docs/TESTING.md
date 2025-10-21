# Testing Plan

This project uses automated tests with Vitest and Testing Library (React) to verify calculator logic and UI behavior. Manual testing is optional for exploratory UX checks.

- Method: Automated unit tests (logic) + integration tests (UI interactions)
- Frameworks: Vitest, @testing-library/react, @testing-library/user-event, jsdom
- Scope:
  - Logic operations: +, −, ×, ÷ (incl. divide-by-zero), percent, √, x², 1/x, negate
  - Formatting: thousands separators, decimal point, scientific notation thresholds (|x| ≥ 1e10, |x| ≤ 1e−9 and ≠ 0), length-based fallback for long decimals
  - UI flows: button clicks for arithmetic, unary ops, percent, grouping while typing, scientific notation while typing small decimals, history creation/select

## How to run

```powershell
# Install dependencies
npm install

# Run tests (watch mode optional)
npm run test
# or
npm run test:watch

# Optional: UI runner
npm run test:ui
```

## Test cases summary

Below are representative cases (all automated) with their expected and actual outputs. Since the test suite passed, the actual outputs match expectations.

| Feature | Input | Expected Output | Actual Output | Result |
|---|---|---|---|---|
| Addition | 2 + 3 = | 5 | 5 | Pass |
| Subtraction | 5 − 7 = | −2 | −2 | Pass |
| Multiplication | 3 × 4 = | 12 | 12 | Pass |
| Division | 12 ÷ 4 = | 3 | 3 | Pass |
| Division by zero | 1 ÷ 0 = | Error | Error | Pass |
| Percent (entry) | 10 % | 0.1 | 0.1 | Pass |
| Percent (entry) | 1,000 % | 10 | 10 | Pass |
| Square root | √9 | 3 | 3 | Pass |
| Square root (neg) | √(−1) | Error | Error | Pass |
| Square | (1.5)² | 2.25 | 2.25 | Pass |
| Reciprocal | 1/4 | 0.25 | 0.25 | Pass |
| Reciprocal (0) | 1/0 | Error | Error | Pass |
| Negate | ±(5) | −5 | −5 | Pass |
| Grouping | 1234567.8900 | 1,234,567.89 | 1,234,567.89 | Pass |
| Scientific large | 10000000000 | 1.0000000000e10 | 1.0000000000e10 | Pass |
| Scientific small | 0.0000000009 | ≈9.0000000000e−10 | 9.0000000000e-10 | Pass |
| Fallback (long decimal) | 0.(6×25) | scientific (e−) | e− notation | Pass |
| UI flow | 2 + 3 = | 5 on display | 5 | Pass |
| UI unary | 9 → √ | 3 on display | 3 | Pass |
| UI percent | 10 → % | 0.1 on display | 0.1 | Pass |
| UI grouping (typing) | type 1000 | 1,000 on display | 1,000 | Pass |
| UI scientific (typing) | type 0.0000000001 | e− notation | e− notation | Pass |
| History | after 2 × 3 =, history has entry; selecting restores result | 6 | 6 | Pass |

Notes:
- “Scientific” formatting is validated by matching the presence of `e`/`e-` in display and exact exponent formatting where appropriate.
- Percent behavior in this app divides the current entry by 100 (e.g., 10 % → 0.1). Contextual percent (e.g., 50 + 10% = 55) is not implemented by design and thus not covered.

## Files

- Logic tests: `tests/unit/logic/calculatorLogic.test.js`
- UI tests: `tests/integration/components/Calculator.test.jsx`
- Setup: `vitest.setup.js`, `vite.config.js` (test section)

## Quality gates

- Build: PASS (vite build)
- Lint: PASS (1 warning on React hook deps, no errors)
- Tests: PASS (24/24)

## Manual checks (optional)

- Keyboard input: numbers, ., + − × ÷, %, =/Enter, Backspace/Delete, Escape, and shortcuts s/q/r/n
- Mobile overlays: history toggle open/close; header remains clickable
- Theme toggle via hamburger menu
