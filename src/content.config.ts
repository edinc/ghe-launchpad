import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				/** Date (YYYY-MM-DD) when the page was last checked against the official documentation. */
				lastVerified: z.coerce.date().optional(),
			}),
		}),
	}),
};
