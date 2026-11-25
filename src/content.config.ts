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

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    readingTime: z.number().default(4),
    /** Tri : le plus petit en premier (mettre les articles récents en tête). */
    order: z.number().default(0),
    draft: z.boolean().default(false),
    /** Article rédigé par l'agence, à valider par le client. */
    placeholder: z.boolean().default(false),
  }),
});

/**
 * Avis clients validés pour publication (le client a coché l'autorisation dans le formulaire).
 * Un fichier par avis ; le texte de l'avis est le corps du fichier. Ne jamais inventer d'avis.
 */
const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    name: z.string(),
    organization: z.string().optional(),
    role: z.string().optional(),
    project: z.string().optional(),
    rating: z.number().int().min(1).max(5),
    date: z.coerce.date(),
    lang: z.enum(['fr', 'en']).default('fr'),
  }),
});

export const collections = { services, projects, legal, blog, reviews };
