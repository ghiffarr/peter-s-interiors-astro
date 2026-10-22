# Editable page sections

Each directory matches one Astro page. Files are numbered in render order so
the page shell, navigation, content sections, footer, and scripts are easy to
find without changing the exported Webflow markup.

- Edit the numbered `.html` fragments in the relevant page directory.
- Shared rendering logic lives in `src/components/webflow/WebflowPage.astro`.
- The preserved import snapshot lives in `src/webflow-source/original-pages/`.
- `manifest.json` records the original filename and fragment count for each page.

Running `npm run organize:webflow -- --force` replaces all editable fragments
from the preserved source. Use that command only when you intentionally want to
discard edits made in these section files.
