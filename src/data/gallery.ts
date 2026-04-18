import rawGalleryMetadata from "@/data/gallery.metadata.json";
import type { ImageMetadata } from "astro";

const galleryMetadata = rawGalleryMetadata as Record<string, { date: string; title: string }>;

export interface GalleryItem {
	alt: string;
	caption: string;
	date: string;
	fileName: string;
	src: string;
	title: string;
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
	return Object.entries(rawImages).map(([path, src]) => {
		const fileName = normalizeGalleryFilename(path.split("/").pop() ?? "");
		const fallbackTitle = prettifyGalleryTitle(fileName);
		const meta = galleryMetadata[fileName] ?? {
			date: "Без дати",
			title: fallbackTitle,
		};

		return {
			alt: meta.title,
			caption: meta.title,
			date: meta.date,
			fileName,
			src: resolveGallerySrc(src),
			title: meta.title,
		};
	});
}
