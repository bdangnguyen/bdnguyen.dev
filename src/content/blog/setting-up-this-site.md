---
title: "Revamping my personal site for the 6th time"
description: "Essentially a how to host using Porkbun for domain names, Cloudflare workers for deployment, and Astro to generate a static site."
pubDate: 2026-07-28
---

This site is built with [Astro](https://astro.build), deployed to [Cloudflare Workers](https://workers.cloudflare.com/), with the domain registered through [Porkbun](https://porkbun.com/). Here's how it's all wired together.

## 1. Registering a domain
The first step would be to get a domain name. Pick your favorite domain registar of choice. I personally used [Porkbun](https://porkbun.com/) to get mine as its reasonably cheap. For the rest of the post, I'll be referring to Porkbun specific documents, but other domain registrars should support the same functionality.

## 2. Pointing the domain to Cloudflare
By default, your domain registrar is also the DNS provider for the domain. Since we're using Cloudflare to host the website, the Cloudflare workers need to be reachable by whoever is looking at the website on their browser. For that to work, Cloudflare needs to be the DNS provider and not Porkbun. Here, we tell Porkbun to have the domain point to Cloudflare's nameservers. This is Cloudflare's [full (nameserver) setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/), and Porkbun's [nameserver change instructions](https://kb.porkbun.com/article/22-how-to-change-your-nameservers):

1. In the Cloudflare dashboard, go to **Domains** and choose **Onboard a domain**. Enter the apex domain (e.g. `example.com`) and pick a plan — Cloudflare scans and imports any existing DNS records automatically.
2. Review the imported records, especially the zone apex (`example.com`) and `www` records, and any email records (MX, SPF, DKIM, DMARC) if the domain sends or receives mail elsewhere. Nothing needs to point at the Worker yet — that gets added when the Worker's custom domain is attached in step 4.
3. Cloudflare's Overview page shows two assigned nameservers. Copy them exactly.
4. In Porkbun, go to **Account → Domain Management**, find the domain, open its **Details** dropdown, and click the edit icon next to **Nameservers**. If DNSSEC is already enabled on the domain, remove the old DS record at Porkbun first and wait for its TTL to fully expire (24–48 hours) before switching nameservers.
5. In the popup, remove all existing nameserver entries and add the two Cloudflare-assigned ones, one per line, then click **Save Nameservers** and confirm.
6. Wait for it to propagate. This can take up to 48 hours worldwide, though most resolvers pick it up within a few hours.

At this point, Porkbun is delegating DNS to Cloudflare, and Cloudflare manages the actual records.

### (Optional) Re-enabling DNSSEC

Once Cloudflare shows the zone as **Active**, DNSSEC can be turned back on, this time through Cloudflare per its [DNSSEC guide](https://developers.cloudflare.com/dns/dnssec/):

1. On the domain's **DNS Settings** page in Cloudflare, click **Enable DNSSEC** and copy the DS record details it generates (Key Tag, Algorithm, Digest Type, Digest).
2. In Porkbun, go to the domain's **Details → Registry DNSSEC** and click **Create DNSSEC Record**. Fill in only the **dsData** fields with the values from Cloudflare.
3. Click **Create**, then verify it took effect with a tool like [dnssec-analyzer](https://dnssec-analyzer.verisignlabs.com/).

## 3. Scaffolding the Astro project

With the domain sorted, the project started from the standard Astro starter:

```bash
npm create astro@latest
```

Astro's content collections handle the blog. Post metadata (title, description, publish date) is validated with a `zod` schema in `src/content.config.ts`, and each post lives as a Markdown file under `src/content/blog/`. A dynamic route (`src/pages/blog/[...id].astro`) renders each post, and `src/pages/blog/index.astro` lists them all.

## 4. Setting up the Cloudflare worker

Cloudflare Workers can serve static assets directly. To have it pick up the files for hosting, create at `wrangler.jsonc` config file at the root folder of the project.

```jsonc
{
  "name": "cloudflare-worker-name",
  "compatibility_date": "<initial deployment date>",
  "assets": {
    "directory": "./dist"
  }
}
```

The `assets.directory` field points at Astro's build output.

With the Worker created and the domain already living in Cloudflare, the custom domain gets attached from the dashboard under **Workers & Pages → your worker → Settings → Domains & Routes** — Cloudflare provisions the DNS record and TLS certificate automatically. This can be done before the first deploy; the domain will just 404 until there's a build to serve.

## 5. Deploying

With the domain already wired to the Worker, every deploy after this just needs:

```bash
npm run build
npx wrangler deploy
```

## 6. Automating deploys from GitHub

Running `wrangler deploy` by hand works, but it's easy to forget, and it means the site can only be published from a machine that's authenticated to Wrangler. Cloudflare has a built-in CI/CD system for Workers called **Workers Builds** that deploys automatically on every push, without needing a separate GitHub Actions workflow file. Details are in Cloudflare's [Workers CI/CD docs](https://developers.cloudflare.com/workers/ci-cd/) and its [Workers Builds guide](https://developers.cloudflare.com/workers/ci-cd/builds/):

1. Push the project to a GitHub repository, if it isn't already.
2. In the Cloudflare dashboard, go to **Workers & Pages**, select the Worker, then **Settings → Builds**.
3. Click **Connect**, authorize Cloudflare's GitHub App, and select the repository.
4. Configure the build: a build command (`npm run build`) and the deploy command (`wrangler deploy`), plus which branch triggers a production deploy (e.g. `main`).
5. Save. One important gotcha from Cloudflare's docs: the Worker's name in the dashboard must exactly match the `name` field in `wrangler.jsonc`, or the build fails.
6. Push a commit — Workers Builds picks it up, runs the build, and deploys automatically. Each build also gets a preview URL under **Version History**, so a branch can be checked before it's promoted to production.

From here, making any changes for the site is just: write the Markdown file, commit, push — no manual `wrangler deploy` needed.
