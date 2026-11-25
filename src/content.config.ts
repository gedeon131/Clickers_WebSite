import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Icônes disponibles pour les services (voir ServiceIcon.astro). */
export const serviceIcons = [
  'software',
  'database',
  'api',
  'data',
  'web',
  'ai',
  'training',
] as const;

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    icon: z.enum(serviceIcons),
    /** Technologies associées, affichées en étiquettes. */
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** Texte en partie provisoire, à valider par le client (voir CONTENT_TODO.md). */
    placeholder: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** Client ou type de client (anonymisé tant qu'il n'y a pas d'accord écrit). */
    client: z.string().optional(),
    sector: z.string().optional(),
    status: z.enum(['preparation', 'development', 'delivered']),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    placeholder: z.boolean().default(false),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
  }),
});

export const collections = { services, projects, legal };
