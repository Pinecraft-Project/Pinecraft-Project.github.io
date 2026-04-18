import { defineCollection, z } from "astro:content";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const post = defineCollection({
	schema: ({ image }) =>
		z.object({
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			description: z.string().min(50).max(160),
			draft: z.boolean().default(false),
			pin: z.boolean().default(false),
			ogImage: z.string().optional(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			title: z.string().max(60),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
		}),
	type: "content",
});

const wiki = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		draft: z.boolean().default(false),
		pin: z.boolean().default(false),
		icon: z.string().optional().default("📄"),
		badge: z.string().optional(),
		badgeColor: z.string().optional().default("#4ade80"),
		order: z.number().default(99),
	}),
	type: "content",
});

const event = defineCollection({
	schema: z.object({
		title: z.string(),
		date: z.string(),
		description: z.string().min(50),
		draft: z.boolean().default(false),
		imageUrl: z.string().optional(),
		bannerUrl: z.string().optional(),
		reward: z.string().optional(),
		badge: z.string().optional(),
		pin: z.boolean().default(false),
		status: z.enum(["upcoming", "active", "ended"]).default("upcoming"),
	}),
	type: "content",
});

export const collections = { post, wiki, event };

