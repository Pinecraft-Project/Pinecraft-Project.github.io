import landingData from "@/data/landing.content.json";
import { sortMDByDate, sortPinnedMDByDate } from "@/data/post";
import { siteConfig } from "@/site-config";
import type { EventEntry, PostEntry } from "@/types";

type HomeEventStatus = "upcoming" | "active" | "ended";

const statusOrder: Record<HomeEventStatus, number> = {
	active: 0,
	upcoming: 1,
	ended: 2,
};

export const landingContent = {
	...landingData.landingContent,
	join: {
		...landingData.landingContent.join,
		serverAddress: siteConfig.server.address,
	},
};

export const aboutFeatureCards = landingData.aboutFeatureCards;

function parseMaybeDate(value: string) {
	const parsed = new Date(value).valueOf();
	return Number.isNaN(parsed) ? 0 : parsed;
}

export function getHeroPosts(posts: PostEntry[], limit = 3) {
	const pinnedPosts = sortPinnedMDByDate([...posts]);
	const latestPosts = sortMDByDate(posts.filter((post) => !post.data.pin));
	return [...pinnedPosts, ...latestPosts].slice(0, limit);
}

export function getHeroEvents(events: EventEntry[], limit = 3) {
	return [...events]
		.sort((a, b) => {
			const pinDiff = Number(Boolean(b.data.pin)) - Number(Boolean(a.data.pin));
			if (pinDiff !== 0) return pinDiff;

			const statusDiff =
				statusOrder[a.data.status as HomeEventStatus] - statusOrder[b.data.status as HomeEventStatus];
			if (statusDiff !== 0) return statusDiff;

			return parseMaybeDate(b.data.date) - parseMaybeDate(a.data.date);
		})
		.slice(0, limit);
}
