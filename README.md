# brianchesko.dev

Personal site — a single-page resume. Plain HTML, Sass, and a small vanilla
JS file (no framework, no bundler — the browser loads it as a native ES
module).

## Structure

```
src/
  copy/   HTML, PDFs — copied to dist/ as-is
  scss/   Sass source, compiled to dist/css/main.css
  js/     Vanilla JS, copied to dist/js/ as-is (loaded via <script type="module">)
  img/    Images, copied to dist/img/
```

## Commands

```bash
npm install       # one-time
npm run build     # compile scss + copy everything into dist/
npm run watch-css # recompile CSS on save
npm run serve     # preview dist/ at http://localhost:3000
```

## Deploying

GitHub Pages serves the `master` branch, which contains only the built
`dist/` output — it has no shared history with `dev` and gets force-pushed
fresh on every deploy (see `deploy.sh`). `dev` is where the source lives.

```bash
npm run deploy   # build, then force-push dist/ to master
```
