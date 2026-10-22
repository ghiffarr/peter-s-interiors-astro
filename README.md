# Peters Interiors — Astro

Faithful migration of the supplied Webflow export, organized like Max Space Astro.

## Development

- `npm install`
- `npm run dev -- --background`
- `npm run astro -- dev status` / `dev logs` / `dev stop`
- `npm run build` builds the static site to `dist/`.
- `npm run preview` previews that production build.
- `npm run audit:assets` checks local asset references.

## Organization

| Location | Purpose |
| --- | --- |
| `src/pages/` | Home, custom 404, and manifest-driven static routes |
| `src/components/webflow/WebflowPage.astro` | Shared document renderer |
| `src/content/pages/<page>/` | Editable numbered HTML sections in document order |
| `src/content/pages/manifest.json` | Source-to-page mapping |
| `public/assets/webflow/images/` | Original images and responsive variants |
| `public/assets/webflow/styles/` | Exported global stylesheets |
| `public/assets/webflow/scripts/` | Exported interactions runtime |
| `src/webflow-source/original-pages/` | Untouched original HTML snapshot |
| `scripts/` | Source organizer and asset audit |

Edit numbered fragments under `src/content/pages/`, not the preserved originals.
`npm run organize:webflow -- --force` regenerates all fragments and discards edits
in them. Original markup, Webflow IDs, metadata, responsive styles, galleries,
and interaction scripts are retained. Local links use clean Astro routes.

## Routes

`/`, `/about`, `/contact`, `/services`, `/garrido-home`, `/ardita-home`,
`/boxwood-home`, `/davis-home`, `/various-designs`, `/style-guide`, `/401`,
and the custom `404.html`.

## Export limitations

The contact form uses Webflow hosted submission handling. Delivery is not verified
and needs a supported form backend before production use. The exported `/401`
page is a visual template; its Webflow authentication endpoint does not provide
password protection on this static Astro site. Google Fonts, WebFont Loader,
and jQuery still load from their original external providers.
