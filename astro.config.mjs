import { defineConfig } from 'astro/config';

// `site` is intentionally unset until a domain is approved (see SLO-4 plan).
// Once known, add `site: 'https://example.com'` to get absolute canonical/hreflang URLs.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
