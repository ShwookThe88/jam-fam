# Jam Fam — GitHub Export

Complete tracked source and bundled assets from Jam Fam version 19.

- Live game: https://pocket-band.lemonypine20.chatgpt.site/
- Source commit: `5b9edae31d5b6f28aa09ea49c2c3e4b8fe9404f1`
- Export date: November 17, 2026

## Included

All tracked application code, API routes, multiplayer logic, generated audio code, artwork in `public/`, database schema and SQL migrations, dependency lockfile, configuration, documentation, and third-party license notices. Original tracked files are preserved byte-for-byte. `EXPORT-MANIFEST.json` lists their SHA-256 hashes.

## Start locally

Use Node.js >=22.13.0 and pnpm 11.25.0 (the version declared in package.json). From this folder:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by the server (normally http://localhost:5173).

The multiplayer room and songbook API use Cloudflare D1 with binding `DB`. For database-backed features, build and apply the included migrations to the local database:

```sh
pnpm build
pnpm exec wrangler d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_big_medusa.sql
pnpm exec wrangler d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0001_yummy_obadiah_stane.sql
pnpm dev
```

Apply each migration once. See the original README.md for the framework and deployment details. These setup commands describe the existing source; dependencies and a fresh build were not run as part of this export.

## Put it on GitHub

Extract the ZIP, create an empty GitHub repository, and upload the contents of the `jam-fam` folder. Include configuration files such as `.gitignore` and `.openai/hosting.json`. Or open a terminal in that folder:

```sh
git init
git add .
git commit -m "Import Jam Fam source and assets"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/jam-fam.git
git push -u origin main
```

GitHub stores the code. GitHub Pages alone cannot run the server/API or D1 database; hosting elsewhere requires a compatible Cloudflare Worker/D1 setup. The original Sites project ID is retained for provenance and is not a credential.

## Export boundaries

- Includes all 12 bundled visual assets; instrument/backing sounds are generated in code.
- Fonts remain loaded from Google Fonts, as in the current app; font binaries are not bundled.
- Production database records, active rooms, browser-local Riff Bank recordings, user uploads outside the repository, credentials, Git history, installed dependencies, and generated build output are not included.
- Existing third-party license notices are retained. No new license grant has been added for your application or artwork.
