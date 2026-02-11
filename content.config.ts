import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const newsSchema = z.object({
	date: z.date(),
	featured: z.boolean(),
	image: z.string()
})


export default defineContentConfig({
	collections: {
		news_en: defineCollection({
			type: 'page',
			source: {
				include: "en/news/**",
				prefix: "",
			},
			schema: newsSchema
		}),
		news_it: defineCollection({
			type: 'page',
			source: {
				include: "it/news/**",
				prefix: "",
			},
			schema: newsSchema
		})

	}
})
