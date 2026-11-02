# Khalil Tohmeh — Digital Contact Card

A fast, responsive digital contact card for Khalil Tohmeh and Cham Holding.

## Live website

https://nfc-khalil-tohmeh.pages.dev/

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The production output is generated in `dist/`. The vCard file is generated during the Vite build and served with the correct MIME type during local development and preview.

## Plesk deployment

The `main` branch contains the Vite source. Each push to `main` runs the GitHub Actions workflow in `.github/workflows/build-plesk.yml`, builds the site, and publishes only the generated files to the `production` branch. Plesk should pull and deploy the `production` branch to the domain's document root (usually `httpdocs`).

To publish a change, push it to `main`, wait for **Build Plesk deployment** to finish in GitHub Actions, then use **Pull Updates** and **Deploy now** for the `production` branch in Plesk. The build runs on GitHub, so Node.js is not needed on the Plesk server.

The workflow needs `GITHUB_TOKEN` contents write permission to update `production`. If the workflow cannot push, enable read and write workflow permissions under the repository's **Settings → Actions → General**.
