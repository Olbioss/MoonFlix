---
name: verify
description: Build, run, and visually verify the MoonFlix client end-to-end (server + Vite + headless-Chromium screenshots)
---

# Verifying MoonFlix changes

## Launch

Both processes, in the background:

```bash
cd server && pnpm start          # Express API on :5001 (reads server/.env; needs Mongo + TMDB key)
cd client && pnpm dev            # Vite on :5173 (defaults to http://127.0.0.1:5001/api/v1/)
```

Health checks:

```bash
curl -s -o /dev/null -w "%{http_code}" "http://127.0.0.1:5001/api/v1/movie/popular?page=1"   # expect 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/                                 # expect 200
```

## Screenshots

No Chrome in /Applications, but Playwright's chromium is cached at
`~/Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-mac/headless_shell`.

- **Static pages** (detail, 404, search): the binary alone works —
  `headless_shell --headless --disable-gpu --hide-scrollbars --screenshot=out.png --window-size=1440,900 --virtual-time-budget=15000 <url>`
- **Home page**: virtual-time-budget is eaten by the hero swiper's autoplay
  timers, so you capture the GlobalLoading overlay mid-fade. Instead
  `npm i playwright-core` in the scratchpad and drive with
  `chromium.launch({ executablePath: <headless_shell> })`, `waitUntil: "networkidle"`,
  then a real `waitForTimeout(2500)` before `page.screenshot()`.

## Flows worth driving

- `/` desktop 1440×900 + scrolled (hero overlap, rows, NEW ribbons) and 390×844 (mobile topbar)
- `/movie/<id>` — grab a real id from the popular API response
- `/search`, sign-in modal (rail button has `aria-label="Sign in"`)
- Real 404 needs a 3+ segment path (`/a/b/c`); single-segment junk like
  `/does-not-exist` matches the `/:mediaType` route and shows error toasts instead

## Gotchas

- `pnpm test` in client hangs (watch mode) — use `pnpm exec vitest run`
- The shell cwd resets between Bash calls; `pnpm -C client <cmd>` from repo root is safest
- Stop servers with `kill $(lsof -ti:5173) $(lsof -ti:5001)`
