import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	author: "Bryan Nguyen",
	date: {
		locale: "en-US",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	description:
		"Hi my name is Bryan! I'm currently a machine learning engineer at Amazon working on search relevance ranking for sponsored products and brands. I was previously part of the financial tech org where I had worked on Amazon's ledger, debt collection, and expansion of payment methods for sellers worldwide. I like to build things that are useful for others, and I'm curious about getting machines to learn how to play games. Hopefully, this site will serve as a way to document my journey and what I've learned to spark people's curiosity. Outside of engineering and coding, I love to play all kinds of music and explore cuisines from around the world. Feel free to reach out if you have any recommendations for either of them!",
	bio: [
		"Hi my name is Bryan! I'm currently a machine learning engineer at Amazon working on search relevance ranking for sponsored products and brands. I was previously part of the financial tech org where I had worked on Amazon's ledger, debt collection, and expansion of payment methods for sellers worldwide.",
		"I like to build things that are useful for others, and I'm curious about getting machines to learn how to play games. Hopefully, this site will serve as a way to document my journey and what I've learned to spark people's curiosity.",
		"Outside of engineering and coding, I love to play all kinds of music and explore cuisines from around the world. Feel free to reach out if you have any recommendations for either of them!",
	],
	lang: "en-US",
	ogLocale: "en_US",
	sortPostsByUpdatedDate: false,
	title: "Bryan Nguyen",
	profile: {
		name: "Bryan Nguyen",
		github: "https://github.com/bdangnguyen",
		linkedin: "https://www.linkedin.com/in/bryan-dang-nguyen/",
	},
	comments: {
		repo: "bdangnguyen/bdnguyen.dev",
		repoId: "R_kgDOTmskug",
		category: "General",
		categoryId: "DIC_kwDOTmskus4DCNb2",
	},
	// Uncomment to enable analytics. Both providers load via Partytown.
	// analytics: {
	// 	googleAnalyticsId: "G-XXXXXXX",
	// 	goatcounterUrl: "https://your-handle.goatcounter.com/count",
	// },
};

export const menuLinks: { path: string; title: string }[] = [
	{
		path: "/",
		title: "Home",
	},
	{
		path: "/posts/",
		title: "Posts",
	},
	{
		path: "/showcase/",
		title: "Showcase",
	},
];

export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "4px",
		codeBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1a1715"),
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		frames: {
			editorActiveTabBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1a1715"),
			editorTabBarBackground: ({ theme }) => (theme.type === "light" ? "#ebe3cd" : "#15120e"),
			frameBoxShadowCssValue: "none",
			terminalBackground: ({ theme }) => (theme.type === "light" ? "#f0e9d6" : "#1a1715"),
			terminalTitlebarBackground: ({ theme }) => (theme.type === "light" ? "#ebe3cd" : "#15120e"),
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme?.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		return `[data-theme="${theme.name}"]`;
	},
	themes: ["min-dark", "min-light"],
	useThemedScrollbars: false,
};
