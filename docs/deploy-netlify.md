# Deploy to Netlify + enable Decap CMS

One-off checklist to move the site from GitHub Pages to Netlify and give
Dr. Chakravarthi a self-serve admin at `drcps.clinic/admin`.

**Roughly 20–30 minutes of clicking, no code changes needed.**

---

## Step 1 — Create the Netlify site

1. Sign up at <https://app.netlify.com/signup>. Use "sign up with GitHub"
   so you don't need to invite yourself as a collaborator later.
2. **Add new site → Import an existing project → Deploy with GitHub →
   pick the DR.CPS repo.**
3. Netlify will auto-detect the settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Branch: `main`
4. Click **Deploy**. First build takes ~1 minute.
5. Netlify assigns a temporary URL like `random-name-123.netlify.app`.
   Open it to confirm the site renders. Home page + gallery + updates
   should all work.

## Step 2 — Point the custom domain at Netlify

1. In the Netlify site dashboard: **Domain management → Add a domain →
   `drcps.clinic`**. Netlify will show DNS records to add.
2. In your DNS provider (wherever `drcps.clinic` is registered — GoDaddy,
   Cloudflare, Namecheap, …):
   - Delete any existing `A` records pointing to GitHub Pages IPs
     (`185.199.108.153` etc.) and the `CNAME` for `www` if present.
   - Add the records Netlify shows you — usually an `A` record to
     `75.2.60.5` for the apex and a `CNAME` `www` → `<your-site>.netlify.app`.
3. Back in Netlify: **Domains → Verify DNS configuration**. Wait for the
   green tick (can take minutes to a few hours depending on DNS TTL).
4. Netlify auto-provisions a Let's Encrypt HTTPS cert. Confirm
   `https://drcps.clinic` loads.
5. In GitHub: **Repo settings → Pages → Source → None** to turn off the
   old GitHub Pages deploy. Leave the `CNAME` file in the repo if you
   ever want to switch back.

## Step 3 — Enable Netlify Identity (doctor's login)

1. Netlify site dashboard: **Site configuration → Identity → Enable
   Identity**.
2. **Registration preferences → Invite only** (nobody self-signs up).
3. **External providers**: leave all disabled — email/password is
   simpler for the doctor than "log in with GitHub".
4. Scroll to **Services → Git Gateway → Enable Git Gateway**. This
   grants Decap CMS server-side commit access to the repo without
   requiring the doctor to have a GitHub account.

## Step 4 — Invite the doctor

1. **Identity → Invite users → enter the doctor's email address**.
2. He receives an email titled "You've been invited to DR.CPS Clinic
   Admin". The link takes him to `drcps.clinic/#invite_token=…`, which
   the widget catches and redirects to a "set your password" screen.
3. He picks a password, clicks **Save**, and is dropped into
   `drcps.clinic/admin` fully logged in.
4. Recommended: send him the two-page walkthrough that's currently in
   `content/updates/README.md` (or its future non-technical rewrite)
   before his first login.

## Step 5 — Sanity-check the CMS

1. Log in yourself at `drcps.clinic/admin` (invite yourself first from
   the Identity dashboard).
2. **New Update** → fill title, date, category, excerpt, drop an image
   into "Cover image", type a paragraph in the body → **Publish**.
3. Within ~90 seconds the site rebuilds. Confirm the new post appears
   at `drcps.clinic/updates`.
4. If it doesn't, check **Netlify → Deploys** for a red build. Common
   cause: the doctor's slug doesn't match the pattern
   `^[a-z0-9]+(?:-[a-z0-9]+)*$` — the config.yml rejects that with a
   clear message.

---

## What changed in the code

- [netlify.toml](../netlify.toml) — build, SPA rewrite, cache headers,
  and env vars (`VITE_BASE=/`, `SITE_ORIGIN=https://drcps.clinic`).
- [public/admin/index.html](../public/admin/index.html) — Decap loader.
- [public/admin/config.yml](../public/admin/config.yml) — collection
  schema for Updates (title, date, category, cover, gallery, body, …).
- [index.html](../index.html) — Netlify Identity widget script tag +
  redirect-to-admin hook.
- [src/constants/updates.js](../src/constants/updates.js) — loader now
  prefers explicit `cover:` / `gallery:` frontmatter fields (what Decap
  writes) and falls back to the `cover.jpg` / `NN.jpg` naming convention
  for posts created via the CLI workflow.

## Known trade-offs to communicate

- **Decap uploads are JPG only.** Posts authored through `/admin` won't
  have WebP siblings, so they're ~30 % larger than posts optimised via
  `npm run optimize:updates`. Fine for a handful of images per post.
  If it ever matters, we add a Netlify build plugin that generates
  WebP siblings automatically.
- **No draft workflow.** By your Phase 1 answer, drafts are disabled.
  If the doctor wants a "save without publishing" state later, enable
  Decap's `publish_mode: editorial_workflow` and grant Git Gateway
  write access to `cms/*` branches.
- **Slug is immutable after publish.** Changing the URL breaks any
  existing shares. If a doctor needs to rename, delete the old post
  and add a redirect in `netlify.toml`.

## Rolling back to GitHub Pages

Everything's committed — no rewrite needed.

1. GitHub → **Repo settings → Pages → Source → main / (root)**.
2. In your DNS provider, revert the `A` records to GitHub's IPs and
   the `CNAME` `www` back to `<user>.github.io`.
3. Optional: delete the Netlify site.

The `netlify.toml`, `public/admin/`, and Identity widget stay in the
tree — they simply do nothing on GitHub Pages.
