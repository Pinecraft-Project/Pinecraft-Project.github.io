import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	author: "Pinecraft",
	authorGithub: "https://github.com/Fulldroper/",
	date: {
		locale: "uk-UA",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	description: "Створи свою країну. Напиши свою історію. Pinecraft — ваніла+ Minecraft сервер з містами, націями, альянсами та голосовим чатом наближення.",
	lang: "uk-UA",
	ogLocale: "uk_UA",
	sortPostsByUpdatedDate: false,
	title: "Pinecraft — Створи свою Націю",
	webmentions: {
		link: "",
	},
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "Головна",
	},
	{
		path: "/wiki/",
		title: "Вікі",
	},
	{
		path: "/map/",
		title: "Карта",
	},
	{
		path: "/news/",
		title: "Новини",
	},
	{
		path: "/gallery/",
		title: "Галерея",
	},
	{
		path: "/events/",
		title: "Події",
	},
	{
		path: "/#join-guide",
		title: "Грати",
	},
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			frameBoxShadowCssValue: "none",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["dracula", "github-light"],
	useThemedScrollbars: false,
};
