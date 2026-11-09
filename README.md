# PumpGrok Desk

A static visual trading floor for a Solana memecoin **paper** desk. It shows desk status, written risk limits, ten seats, an empty paper book, a research board, and a flat journal.

This site is a display of desk policy. It does not connect a wallet, sign a transaction, import a key, or send an order. Live engagement is shown locked.

Figures on the desk are the written policy below and a book with no open paper position. They are not a live exchange feed.

## Policy shown on the desk

| Item | Value |
| --- | --- |
| Engagement | Paper (simulated only). Live is unavailable. |
| Autonomy | manual-ticket |
| Capital cap | $50 USDC, plus SOL for fees |
| Max size per trade | $5 USDC |
| Max open positions | 1 |
| Daily loss halt | 5% of wallet equity (constitutional floor) |
| Drawdown halt | 15% of peak equity |
| Seats | CHIEF, SCOUT, RISK, WHALE, SNIPER, RUG, EXIT, SHILL, SIGNAL, JOURNAL |
| Designated account | FOMO @iamkingwize |
| Wallet | Designated, not connected. No public key is collected or shown. |

The daily-loss and drawdown halts are displayed as policy. The page does not read wallet equity, so it does not compute those percentages from a balance.

## Run locally

From the repository root:

```bash
python3 -m http.server 4173
```

Open <http://127.0.0.1:4173/>. Views are Floor, Risk, Seats, Book, Leads, and Journal. Keys `1` through `6` switch views. The Live control explains that it is unavailable and does not change engagement.

## GitHub Pages

Publishing is configured in [`.github/workflows/pages.yml`](.github/workflows/pages.yml).

- The workflow runs on every push to `main`, and can be run by hand from the Actions tab (`workflow_dispatch`).
- The build job copies `index.html`, `css/`, `js/`, and `assets/` into a Pages artifact. It does not run a framework build.
- The deploy job publishes that artifact with `actions/deploy-pages` to the `github-pages` environment.
- The site is intended to be served at <https://kingwize1.github.io/pumpgrok-desk/>.
- No custom domain is configured. Paths in the page are relative, so the project-site prefix works without a rewrite.

Pages was not enabled on this repository when the workflow was added. After this workflow is on `main`, turn the site on once:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Let **Publish desk to GitHub Pages** finish on `main`. Re-run it from the Actions tab if it has not started.

The first successful deploy on `main` is what makes the URL live. A `.nojekyll` file is in the repo so a branch-source publish would not pass the site through Jekyll. The Actions path does not use Jekyll.

## What this repository refuses to include

- Live order entry, transaction signing, or a wallet connect-to-sign flow
- Seed-phrase, private-key, or key-import fields
- API keys, `.env` files, or other credentials
- Copied source or assets from the official PumpGrok project

## License

[MIT](LICENSE). Copyright (c) 2026 kingwize1.
