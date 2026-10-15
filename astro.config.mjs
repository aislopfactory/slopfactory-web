import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://factory.xociety.co',
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
