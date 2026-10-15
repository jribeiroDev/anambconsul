import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const servicos = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/servicos' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      subtitle: z.string().default('Temos uma equipa comercial e técnica especializada para lhe apresentar as melhores soluções.'),
      banner: image().optional(),
      // cartões com imagem (ex.: sub-serviços, equipamentos)
      cards: z
        .array(z.object({ image: image(), title: z.string(), text: z.string().optional(), href: z.string().optional() }))
        .optional(),
      cta: z.object({ href: z.string(), label: z.string(), text: z.string() }).optional(),
    }),
});

export const collections = { servicos };
