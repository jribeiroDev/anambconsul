// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://www.anambconsul.pt',
  // mesmos URLs do WordPress (com barra final) para preservar SEO
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (page) => !page.includes('/obrigado/') })],
  vite: { plugins: [tailwindcss()] },
});
