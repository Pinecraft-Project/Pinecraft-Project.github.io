import footerCommunityData from "@/data/footerCommunity.json";
import { siteConfig } from "@/site-config";

export const footerCommunity = {
	title: footerCommunityData.title,
	links: footerCommunityData.links.map((link) => ({
		...link,
		href: link.key === "discord" ? siteConfig.server.discordUrl : siteConfig.server.mapUrl,
	})),
} as const;
