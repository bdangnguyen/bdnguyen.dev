export interface ProfileConfig {
	/** Author display name; used in bylines, schema, OG images. */
	name: string;
	/** Contact email shown in About-page socials. Omit to hide. */
	email?: string;
	/** Profile URL on GitHub. Leave empty to hide. */
	github?: string;
	/** Profile URL on LinkedIn. Leave empty to hide. */
	linkedin?: string;
	/** Twitter / X profile URL. Leave empty to hide. */
	twitter?: string;
	/** Mastodon profile URL. Leave empty to hide. */
	mastodon?: string;
}

/** Optional Giscus comment-widget config (https://giscus.app). */
export interface CommentsConfig {
	/** GitHub repository hosting the discussions, e.g. "user/repo". */
	repo: string;
	/** GitHub repo node id (data-repo-id from the giscus wizard). */
	repoId: string;
	/** Discussion category name. */
	category: string;
	/** Discussion category id. */
	categoryId: string;
}

/** Optional analytics config — each provider is opt-in. */
export interface AnalyticsConfig {
	/** Google Analytics measurement id (e.g. "G-XXXXXXX"). */
	googleAnalyticsId?: string;
	/** Goatcounter endpoint URL (e.g. "https://example.goatcounter.com/count"). */
	goatcounterUrl?: string;
}

export interface SiteConfig {
	/** Site-wide display name; fallback for profile.name. */
	author: string;
	date: {
		locale: string | string[] | undefined;
		options: Intl.DateTimeFormatOptions;
	};
	description: string;
	/** Homepage bio, one paragraph per array entry. Falls back to `description` if unset. */
	bio?: string[];
	lang: string;
	ogLocale: string;
	sortPostsByUpdatedDate: boolean;
	title: string;
	/** Personal info for About page, schema, byline. */
	profile?: ProfileConfig;
	/** Giscus comments; skipped if absent. */
	comments?: CommentsConfig;
	/** Analytics; each provider opt-in. */
	analytics?: AnalyticsConfig;
}

export interface SiteMeta {
	articleDate?: string | undefined;
	description?: string;
	ogImage?: string | undefined;
	title: string;
}

export type AdmonitionType = "tip" | "note" | "important" | "caution" | "warning";
