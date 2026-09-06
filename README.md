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
  resume/ Resume source (resume.html) — compiled to src/copy/brian_chesko_complete_resume.pdf
```

## Commands

```bash
npm install         # one-time
npm run build       # compile scss + copy everything into dist/
npm run watch-css   # recompile CSS on save
npm run serve       # preview dist/ at http://localhost:3000
npm run compile-resume # render src/resume/resume.html to the resume PDF (requires `pip install -r requirements.txt`)
```

## Deploying

Every push to `main` triggers [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages directly —
no separate branch, no manual step. The custom domain is set via
`src/copy/CNAME`, which is just a normal file in the build output.
