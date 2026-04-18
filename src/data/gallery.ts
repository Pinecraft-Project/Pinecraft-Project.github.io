import rawGalleryMetadata from "@/data/gallery.metadata.json";
import type { ImageMetadata } from "astro";

const galleryMetadata = rawGalleryMetadata as Record<
	string,
	{ date: string; title: string; pin?: boolean; draft?: boolean }
>;

export interface GalleryItem {
	alt: string;
	caption: string;
	date: string;
	draft: boolean;
	fileName: string;
	pin: boolean;
	src: string;
	title: string;
}

function parseMaybeDate(value: string) {
	const parsed = new Date(value).valueOf();
	return Number.isNaN(parsed) ? 0 : parsed;
}

const rawImages = import.meta.glob<string | ImageMetadata>(
	"/src/assets/gallery/*.{jpg,jpeg,png,webp,gif}",
	{ eager: true, import: "default" },
);

function normalizeGalleryFilename(filename: string) {
	try {
		return decodeURIComponent(filename);
	} catch {
		return filename;
	}
}

function prettifyGalleryTitle(filename: string) {
	return filename
		.replace(/\.[^.]+$/, "")
		.replace(/[+_-]/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

function resolveGallerySrc(src: unknown) {
	if (typeof src === "string") return src;
	if (src && typeof src === "object" && "src" in src) {
		const imageSrc = (src as { src?: unknown }).src;
		return typeof imageSrc === "string" ? imageSrc : "";
	}
	return "";
}

export function getGalleryItems(): GalleryItem[] {
	return Object.entries(rawImages)
		.map(([path, src]) => {
			const fileName = normalizeGalleryFilename(path.split("/").pop() ?? "");
			const fallbackTitle = prettifyGalleryTitle(fileName);
			const meta = galleryMetadata[fileName] ?? {
				date: "Без дати",
				title: fallbackTitle,
				pin: false,
				draft: false,
			};

			return {
				alt: meta.title,
				caption: meta.title,
				date: meta.date,
				draft: Boolean(meta.draft),
				fileName,
				pin: Boolean(meta.pin),
				src: resolveGallerySrc(src),
				title: meta.title,
			};
		})
		.filter((item) => !item.draft)
		.sort((a, b) => {
			const pinDiff = Number(b.pin) - Number(a.pin);
			if (pinDiff !== 0) return pinDiff;

			const dateDiff = parseMaybeDate(b.date) - parseMaybeDate(a.date);
			if (dateDiff !== 0) return dateDiff;

			return a.title.localeCompare(b.title, "uk-UA");
		});
}
