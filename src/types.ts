import type { ImageMetadata, MarkdownHeading } from "astro";

export interface SiteConfig {
	author: string;
	authorGithub?: string;
	date: {
		locale: string | string[] | undefined;
		options: Intl.DateTimeFormatOptions;
	};
	description: string;
	lang: string;
	ogLocale: string;
	server: {
		address: string;
		discordUrl: string;
		mapUrl: string;
	};
	sortPostsByUpdatedDate: boolean;
	title: string;
	webmentions?: {
		link: string;
		pingback?: string;
	};
}

export interface PaginationLink {
	srLabel?: string;
	text?: string;
	url: string;
}

export interface SiteMeta {
	articleDate?: string | undefined;
	description?: string;
	ogImage?: string | undefined;
	title: string;
}

/** Webmentions */
export interface WebmentionsFeed {
	children: WebmentionsChildren[];
	name: string;
	type: string;
}

export interface WebmentionsCache {
	children: WebmentionsChildren[];
	lastFetched: null | string;
}

export interface WebmentionsChildren {
	author: Author | null;
	content?: Content | null;
	"mention-of": string;
	name?: null | string;
	photo?: null | string[];
	published?: null | string;
	rels?: Rels | null;
	summary?: Summary | null;
	syndication?: null | string[];
	type: string;
	url: string;
	"wm-id": number;
	"wm-private": boolean;
	"wm-property": string;
	"wm-protocol": string;
	"wm-received": string;
	"wm-source": string;
	"wm-target": string;
}

export interface Author {
	name: string;
	photo: string;
	type: string;
	url: string;
}

export interface Content {
	"content-type": string;
	html: string;
	text: string;
	value: string;
}

export interface Rels {
	canonical: string;
}

export interface Summary {
	"content-type": string;
	value: string;
}

interface ContentRenderResult {
	Content: any;
	headings: MarkdownHeading[];
	remarkPluginFrontmatter: Record<string, unknown>;
}

interface ContentEntryLike<TData> {
	slug: string;
	data: TData;
	render: () => Promise<ContentRenderResult>;
}

export interface PostData {
	coverImage?: {
		alt: string;
		src: ImageMetadata;
	};
	description: string;
	draft: boolean;
	pin: boolean;
	ogImage?: string;
	publishDate: Date;
	tags: string[];
	title: string;
	updatedDate?: Date;
}

export interface WikiData {
	title: string;
	description: string;
	icon?: string;
	badge?: string;
	badgeColor?: string;
	order: number;
	pin?: boolean;
	draft?: boolean;
}

export interface EventData {
	title: string;
	date: string;
	description: string;
	imageUrl?: string;
	bannerUrl?: string;
	reward?: string;
	badge?: string;
	pin?: boolean;
	draft?: boolean;
	status: "upcoming" | "active" | "ended";
}

export type PostEntry = ContentEntryLike<PostData>;
export type WikiEntry = ContentEntryLike<WikiData>;
export type EventEntry = ContentEntryLike<EventData>;
