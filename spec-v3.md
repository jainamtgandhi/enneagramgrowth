# BUILD SPEC & MASTER PROMPT â "The Practice" Â· v3
### A teacher-led Enneagram platform for self-observation, community, and growth

> v3 supersedes v2. New: **Type Discovery** feature (Â§14); real **Postgres DDL** (Â§6) and **RLS policy SQL** (Â§7); **API & server-action surface** (Â§18); **Testing & QA strategy** (Â§19); a **fully-written Week 1** (Â§16). Prose sections tightened for density.

---

## 0. How to use this document

Both a **human spec** and a **master prompt for an AI builder** (Claude Code, Cursor, v0, or a developer). Single source of truth. Read fully before coding.

**If you are an AI/dev agent:** senior full-stack engineer + product designer. Build in phases (Â§20). Don't invent features outside this spec without flagging. The data model and privacy rules (Â§6â7, Â§12) are load-bearing â never weaken them. When unspecified, serve the **cohort member** first (Â§3); for anything touching privacy/safety, ask, don't guess.

**Stack:** Next.js (App Router) + TypeScript + Tailwind + Supabase (Postgres, Auth, Storage, RLS) + Vercel + Resend (email) + MDX (library). Substitute only with explicit reason.

---

## Table of contents
1. North Star Â· 2. Principles Â· 3. Users/roles Â· 4. Design system + tokens Â· 5. Route map (access) Â· 6. **Data model (DDL)** Â· 7. **Auth & RLS (SQL)** Â· 8. The engines Â· 9. Wireframes Â· 10. Page-by-page Â· 11. Flows Â· 12. Safety/privacy Â· 13. Pattern Mirror Â· 14. **Type Discovery** Â· 15. Notifications Â· 16. Content model + **Week 1** Â· 17. Worked Type 9 (voice bible) Â· 18. **API surface** Â· 19. **Testing & QA** Â· 20. Phases/MVP Â· 21. Metrics Â· 22. Edge cases Â· 23. Definition of done Â· 24. Voice Â· 25. Flags & questions

---

## 1. North Star

The internet has a hundred free Enneagram encyclopedias and none of them change anyone. Change happens in a loop â *practice â reflection â being seen by a group â a teacher reflecting your pattern back â time* â which is exactly what Donna runs in her 11-week class.

> **This is not an Enneagram website. It is the container for Donna's teaching.** Reference content is table stakes, built once. The living product is the cohort journey + private reflection + scoped community + the teacher's presence, sustained across weeks.

> *The internet is full of places that tell you what you are. This is a place that helps you watch yourself â with a teacher who knows you, a group walking beside you, and enough time to actually change.*

## 2. Principles
1. **Reflection is sacred** â private by default, encrypted, opt-in to share, reversible. A vault, not a feed.
2. **Never diagnose** â notice patterns, never interpret pathology. Non-diagnostic framing visible.
3. **Protect the teacher's time** â leverage, not homework; author-once-reuse-forever.
4. **Share self, never diagnose others** â the one inviolable community norm, enforced structurally.
5. **Calm over clever** â a quiet room with good light.
6. **Modular spirituality** â the contemplative layer is a toggle, never the spine.
7. **Keep every door open** â model multi-facilitator from day one.
8. **Accessibility from commit one** â WCAG 2.2 AA.

## 3. Users, roles, rings
| Ring | Who | Role | Need |
|---|---|---|---|
| 1 heart | member mid-journey | `member` | stay in the loop; reflect privately; see themselves change; feel held |
| 2 engine | Donna (+ future facilitators) | `facilitator` | run cohorts without burnout; author once; pastoral signals; respond |
| 3 funnel | public seeker | `guest`/`alumni` | find Donna, trust her, join |

Roles: `guest`, `member`, `alumni`, `facilitator`, `admin`. Earlier ring wins on conflict.

---

## 4. Design system + tokens

**Feeling:** calm, contemplative, modern, grounded, warm. A well-lit study â not a quiz app, not a clinical dashboard, not an occult diagram. Enneagram symbol as clean line art only.

**Type:** Fraunces (display/headings), Inter (body/UI). Reading measure â¤68ch, line-height 1.7. **Centers** (semantic, only inside type content): Body 8/9/1 clay Â· Heart 2/3/4 rose Â· Head 5/6/7 slate-blue. **Motion** 150â250ms ease-out; honor `prefers-reduced-motion`. **Layout** reading â¤720px; app shell â¤1200px (left rail desktop â bottom tabs mobile); usable at 360px.

**`globals.css`:**
```css
:root{
  --ink:#1C1A17; --ink-muted:#6B655C; --paper:#FAF8F4; --surface:#FFFFFF;
  --surface-sunken:#F3EFE8; --border:#E6E0D6;
  --brand:#2E5A52; --brand-hover:#244A43; --brand-soft:#E3ECEA; --gold:#C98A3B;
  --center-body:#B5654A; --center-body-soft:#F2E3DC; --center-body-ink:#7A3E2C;
  --center-heart:#C26B6B; --center-heart-soft:#F4E1E1; --center-heart-ink:#8A4444;
  --center-head:#5A7A8C; --center-head-soft:#E0E8ED; --center-head-ink:#3A5160;
  --success:#3E7C5A; --warning:#C98A3B; --danger:#B4493C;
  --radius-sm:8px; --radius-md:12px; --radius-lg:16px; --radius-full:9999px;
  --shadow-1:0 1px 2px rgba(28,26,23,.06); --shadow-2:0 4px 16px rgba(28,26,23,.08);
}
@media (prefers-color-scheme:dark){:root{
  --paper:#16140F; --surface:#1E1B16; --surface-sunken:#211D17; --ink:#EDE8DF;
  --ink-muted:#A7A096; --border:#33302A; --brand-soft:#1F2E2B;}}
```
**`tailwind.config.ts` extend:**
```ts
colors:{ ink:'var(--ink)','ink-muted':'var(--ink-muted)',paper:'var(--paper)',
  surface:'var(--surface)','surface-sunken':'var(--surface-sunken)',border:'var(--border)',
  brand:'var(--brand)','brand-hover':'var(--brand-hover)','brand-soft':'var(--brand-soft)',
  gold:'var(--gold)',center:{body:'var(--center-body)',heart:'var(--center-heart)',head:'var(--center-head)'}},
fontFamily:{serif:['Fraunces','Source Serif 4','Georgia','serif'],sans:['Inter','system-ui','sans-serif']},
fontSize:{display:['3rem',{lineHeight:'1.1'}],h1:['2.25rem',{lineHeight:'1.15'}],
  h2:['1.75rem',{lineHeight:'1.2'}],h3:['1.375rem',{lineHeight:'1.3'}],
  'body-lg':['1.1875rem',{lineHeight:'1.7'}],body:['1.0625rem',{lineHeight:'1.7'}],
  ui:['0.9375rem',{lineHeight:'1.5'}],small:['0.8125rem',{lineHeight:'1.5'}]},
borderRadius:{sm:'8px',md:'12px',lg:'16px',full:'9999px'},
boxShadow:{1:'0 1px 2px rgba(28,26,23,.06)',2:'0 4px 16px rgba(28,26,23,.08)'},
```

**Signature components:** Buttons (primary/secondary/ghost/danger), Card, Accordion (progressive disclosure), Tabs, Interactive Enneagram Symbol (SVG + keyboard + ARIA), Type Card, Comparison Table, Prompt Card, **Reflection Composer**, Journal Entry, **Reflection Timeline**, **Pattern Mirror panel**, **Week Stepper**, **Discovery flow**, Participation Signal chip, Blog layout, nav/footer, Toast, Modal/Drawer â each with loading/empty/error states.

---

## 5. Route map (with access)
`PUBLIC` no login Â· `MEMBER` roleâ¥member Â· `FACILITATOR` facilitator/admin
```
PUBLIC       /                       home/funnel
PUBLIC       /about
PUBLIC       /enneagram + /what-is-it /responsible-use /types /types/[n]
                /centers /wings /arrows /instincts /mistyping /glossary
PUBLIC       /discover                Type Discovery (guided, no login)   â NEW
PUBLIC       /blog  /blog/[slug]      public
PUBLIC       /classes  /classes/[slug] public storefront + enroll
PUBLIC(flag) /contemplative
PUBLIC       /sign-in /join  /legal/privacy /legal/terms
MEMBER       /app                     dashboard "Your Practice"
MEMBER       /app/cohort/[id]         "This week"  (class material â gated)
MEMBER       /app/cohort/[id]/week/[w]
MEMBER       /app/reflect             composer
MEMBER       /app/journal             journal + Pattern Mirror
MEMBER       /app/journal/[entryId]
MEMBER       /app/community/[cohortId]
MEMBER       /app/settings
FACILITATOR  /teach                   cockpit (Donna-only)
FACILITATOR  /teach/cohorts/new  /teach/cohorts/[id]  /teach/curriculum
FACILITATOR  /teach/responses  /teach/broadcast  /teach/blog  /teach/settings
```
**Public:** Library, Discovery, blog, class pitch, About. **Gated:** all class material, reflections, community, the entire cockpit.

---

## 6. Data model â Postgres DDL

Model multi-facilitator from day one. Weeks/prompts are **materialized per cohort** at creation so editing a template never mutates a running cohort.

```sql
create type user_role        as enum ('guest','member','alumni','facilitator','admin');
create type cohort_status     as enum ('draft','upcoming','active','completed','archived');
create type member_status     as enum ('invited','active','left','completed');
create type reflection_vis     as enum ('private','shared_with_teacher','shared_with_cohort');
create type prompt_kind        as enum ('reflection','body','emotional','relational','journaling');
create type post_kind          as enum ('practice','question','win');
create type post_status        as enum ('draft','published');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text, role user_role not null default 'member',
  avatar_url text, bio text, created_at timestamptz not null default now()
);
create table facilitators (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  display_name text not null, public_bio text, slug text unique not null
);
create table curriculum_templates (
  id uuid primary key default gen_random_uuid(),
  facilitator_id uuid not null references facilitators(id) on delete cascade,
  title text not null, description text, num_weeks int not null default 11
);
create table template_weeks (
  id uuid primary key default gen_random_uuid(),
  template_id uuid not null references curriculum_templates(id) on delete cascade,
  week_number int not null, title text not null, overview text,
  prework_mdx text, session_notes_mdx text, integration_intro text,
  unique(template_id, week_number)
);
create table template_prompts (
  id uuid primary key default gen_random_uuid(),
  template_week_id uuid not null references template_weeks(id) on delete cascade,
  ord int not null, prompt_text text not null, kind prompt_kind not null default 'reflection'
);
create table cohorts (
  id uuid primary key default gen_random_uuid(),
  facilitator_id uuid not null references facilitators(id) on delete cascade,
  template_id uuid references curriculum_templates(id),
  name text not null, slug text unique not null,
  status cohort_status not null default 'draft',
  start_date date, end_date date, current_week int not null default 1,
  timezone text not null default 'America/New_York'
);
create table cohort_members (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references cohorts(id) on delete cascade,
  profile_id uuid not null references profiles(id) on delete cascade,
  status member_status not null default 'invited',
  joined_at timestamptz, left_at timestamptz,
  unique(cohort_id, profile_id)
);
create table weeks (              -- materialized per cohort
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references cohorts(id) on delete cascade,
  week_number int not null, title text, overview text,
  prework_mdx text, session_notes_mdx text, integration_intro text,
  unlock_date date, unique(cohort_id, week_number)
);
create table prompts (
  id uuid primary key default gen_random_uuid(),
  week_id uuid not null references weeks(id) on delete cascade,
  ord int not null, prompt_text text not null, kind prompt_kind not null default 'reflection'
);
create table reflections (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references profiles(id) on delete cascade,
  prompt_id uuid references prompts(id) on delete set null,
  cohort_id uuid references cohorts(id) on delete set null,
  week_number int, body_encrypted text not null,
  visibility reflection_vis not null default 'private',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create table reflection_responses (
  id uuid primary key default gen_random_uuid(),
  reflection_id uuid not null references reflections(id) on delete cascade,
  responder_profile_id uuid not null references profiles(id),
  body text not null, created_at timestamptz not null default now()
);
create table community_posts (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid not null references cohorts(id) on delete cascade,
  author_profile_id uuid not null references profiles(id),
  body text not null, kind post_kind not null default 'practice',
  created_at timestamptz not null default now(), deleted_at timestamptz
);
create table community_replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references community_posts(id) on delete cascade,
  author_profile_id uuid not null references profiles(id),
  body text not null, created_at timestamptz not null default now()
);
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_profile_id uuid not null references profiles(id),
  title text not null, slug text unique not null, body_mdx text not null,
  cover_url text, status post_status not null default 'draft',
  published_at timestamptz, tags text[] default '{}'
);
create table discovery_results (    -- optional save of a Type Discovery run
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete cascade,
  candidate_types int[] not null, lead_center text, answers jsonb,
  created_at timestamptz not null default now()
);
create table nudges (
  id uuid primary key default gen_random_uuid(),
  cohort_id uuid references cohorts(id) on delete cascade,
  week_number int, channel text not null default 'email',
  body text, send_at timestamptz, sent_at timestamptz
);
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id), email text,
  cohort_id uuid references cohorts(id), slug text, source text,
  created_at timestamptz not null default now()
);
create table audit_log (
  id bigserial primary key, actor_id uuid, action text, target text,
  created_at timestamptz not null default now()
);
-- hot-path indexes
create index on reflections (profile_id, created_at desc);
create index on reflections (cohort_id, week_number);
create index on cohort_members (profile_id);
create index on community_posts (cohort_id, created_at desc);
create index on weeks (cohort_id, week_number);
```

**Participation-signals view** (the only window a facilitator gets into reflections â counts/timestamps, never content):
```sql
create view participation_signals as
select cm.cohort_id, cm.profile_id,
       max(r.created_at)                              as last_reflected_at,
       count(r.id)                                    as reflection_count,
       count(distinct r.week_number)                  as weeks_engaged
from cohort_members cm
left join reflections r
  on r.profile_id = cm.profile_id and r.cohort_id = cm.cohort_id and r.deleted_at is null
group by cm.cohort_id, cm.profile_id;
```

---

## 7. Auth & RLS

Auth: Supabase, **magic-link primary**, password optional, no OAuth v1. **RLS is the privacy spine â enforce at the DB.** Enable RLS on every table; deny by default.

Representative policies (the pattern repeats for the rest):
```sql
alter table reflections enable row level security;

-- a member reads/writes ONLY their own reflections
create policy refl_owner_all on reflections
  for all using (profile_id = auth.uid()) with check (profile_id = auth.uid());

-- a facilitator may read a reflection ONLY if the author shared it,
-- and ONLY for a cohort they own  (never 'private')
create policy refl_facilitator_shared on reflections
  for select using (
    visibility in ('shared_with_teacher','shared_with_cohort')
    and exists (
      select 1 from cohorts c join facilitators f on f.id = c.facilitator_id
      where c.id = reflections.cohort_id and f.profile_id = auth.uid()
    )
  );

-- a co-member may read a reflection ONLY if shared_with_cohort and same cohort
create policy refl_cohort_shared on reflections
  for select using (
    visibility = 'shared_with_cohort'
    and exists (
      select 1 from cohort_members cm
      where cm.cohort_id = reflections.cohort_id
        and cm.profile_id = auth.uid() and cm.status = 'active'
    )
  );
```
> There is **no** policy granting a facilitator access to `private` reflections â by construction it's impossible. Facilitators read pastoral data only through `participation_signals`. Admin content access is via a separate service path, logged to `audit_log`, and disclosed in the privacy policy.

| Resource | guest | member | alumni | facilitator(owner) | admin |
|---|---|---|---|---|---|
| Library/blog (published) | R | R | R | R | RW |
| Own reflections | â | RW | RW | RW | R\* |
| Others' private reflections | â | â | â | **none** | none |
| shared_with_teacher | â | â | â | R+respond | R\* |
| shared_with_cohort | â | R(same cohort) | â | R | R\* |
| Community (own cohort) | â | RW | R | RW | RW |
| Participation signals | â | â | â | R | R |
| Cohorts/curriculum | â | â | â | RW(own) | RW |

---

## 8. The engines
**Cohort (spine):** people through a curriculum together, in time; weeks unlock on schedule; each week = pre-work â live session â integration; clear start/end + **afterlife** (completion â alumni + lighter space); author-once via templates, materialized per cohort.
**Reflection (heart):** typed weekly prompts; distraction-free autosaving composer; **private by default** with a 3-step visibility ladder; **My Journal** with scroll-back-to-week-1; the **Pattern Mirror** (Â§13).
**Community:** cohort-scoped; one structural norm â *share your own pattern, never diagnose another's*; posts limited to practice/question/win (no "type someone" affordance); reflections enter only by author invitation; Donna present + badged; ship lightweight.
**Teacher (cockpit):** build cohorts in minutes; author templates once; **signals not content**; respond to shared reflections; broadcast nudges; no-code blog.
**Library + Blog:** evergreen MDX encyclopedia (full-arc type pages, SEO, built once) + Donna's no-code blog (the funnel). Don't confuse them.
**Type Discovery (Â§14):** the public, non-diagnostic on-ramp.

---

## 9. Wireframes (core screens)
`[ ]`=button `( )`=input `â¸`=link `â`=muted/locked

**Member dashboard `/app`**
```
âârailââ¬ââââââââââââââââââââââââââââââââââââââââââââââââ
âPract.â Good evening, â¢                                â
âCohortâ Donna's Spring Class                           â
âJourn.â Week â ââ¡ââ¢â[â£]âââ¤âââ¥âââ¦âââ§âââ¨âââ©âââª  â stepper â
âComm. â THIS WEEK Â· 4 â The Body Center                â
âSet.  â "Notice when you brace before you're asked."   â
â      â [ Reflect on this ]   next session: Tue 7pm    â
â      â â last reflection (private)     â¸ journal      â
ââââââââ´ââââââââââââââââââââââââââââââââââââââââââââââââ
empty(no cohort): "You're not in a class yet" [See classes]
mobile: rail â bottom tabs
```
**Composer `/app/reflect`**
```
ââââââââââââââââââââââââââââââââââââââââââââââ
â Week 4 Â· "When did you braceâ¦?"              â
â This isn't a test. Write what's true today.  â
â (                                          ) â
â Visibility: (â¢)Private ( )Donna ( )Cohort    â
â â² Saved just now                  [ Done ]   â
ââââââââââââââââââââââââââââââââââââââââââââââ
```
**Journal + Pattern Mirror `/app/journal`**
```
ââââââââââââââââââââââââââââââââââââââââââââââ
â Your reflections     [All weeks â¾] (search)  â
â â Pattern Mirror ââââââââââââââââââââââââââ â
â â A word you return to: "enough" â 6Ã      â â
â â weeks 1Â·3Â·4Â·6Â·8Â·9   â¸ see those moments  â â
â â Just notice it. No conclusion.   [hide]  â â
â ââââââââââââââââââââââââââââââââââââââââââââ â
â ââ Week 4 ââ â Apr 9 "I keep saying yesâ¦" privâ
â ââ Week 3 ââ â Apr 2 "Donna askedâ¦" w/ Donna  â
â â scroll back to Week 1                       â
ââââââââââââââââââââââââââââââââââââââââââââââ
empty: "Your reflections will gather here."
Mirror hidden until â¥5 entries (Â§13)
```
**Teacher cohort `/teach/cohorts/[id]`**
```
ââââââââââââââââââââââââââââââââââââââââââââââ
â Donna's Spring Class Â· Week 4/11 [Advance â¸] â
â Roster (12)              signals, not contentâ
â Maya   2d ago   4/4  â                       â
â Sam   14d agoâ  2/4 [check in]                â
â Shared with you (3)            â¸ Responses    â
â [Send a nudge] [Community] [Settings]         â
ââââââââââââââââââââââââââââââââââââââââââââââ
"last journaled" is a timestamp. Content never appears here.
```
**Type Discovery `/discover`** (see Â§14)
```
ââââââââââââââââââââââââââââââââââââââââââââââ
â Find your way in                  step 2 / 7 â
â When something goes wrong, you firstâ¦        â
â ( ) want to fix it / make it right           â
â ( ) check who's affected / how they feel     â
â ( ) step back to understand before acting    â
â              [ Back ]            [ Next ]     â
ââââââââââââââââââââââââââââââââââââââââââââââ
result: "You may want to explore Types 1, 6, 5 â start here."
        â¸ type pages  â¸ compare them  â a starting point, not a verdict
```

---

## 10. Page-by-page
Each: purpose Â· layout Â· components Â· states Â· responsive. Wireframes (Â§9) cover the core five; the rest follow the same conventions.
**Public:** Home; About; Library hub; Types overview (symbol + 3Ã3 grid); Type detail (center-themed full arc â Â§17); Centers/Wings/Arrows/Instincts/Mistyping (long-form MDX, clickable symbol on arrows); Glossary (searchable); Responsible-use (footer-linked, crisis resources); **Discovery** (Â§14); Blog index+post; Classes+offering (enrollâ`enrollments`); Auth (magic-link, route by role).
**Member:** Dashboard, Week detail (3 beats + completion ticks + locked future weeks), Composer, Journal, Journal entry (edit/visibility/teacher reply badged), Community (pinned norms, constrained composer, Donna badged), Settings (privacy controls, notification cadence, contemplative toggle).
**Facilitator:** Dashboard (cohorts + signals + quick actions), Cohort builder (templateâdatesârosterâmaterializeâinvite), Cohort detail (Â§9), Template editor (versioned), Response queue, Broadcast, Blog editor (no-code), Settings.

## 11. Core flows
**A Join:** `/classes/[slug]` â enroll â magic-link â profile â 3-screen "how this works + responsible use" â `/app` Week 1.
**B Weekly loop:** nudge â open week â pre-work â live session â mid-week micro-nudge â write reflection (private) â optionally share â next unlock.
**C Share w/ teacher:** entry â visibility=teacher â `/teach/responses` â Donna replies â member sees badged reply. Reversible.
**D Launch cohort:** `/teach/cohorts/new` â template â dates/roster â confirm (materialize) â invites. <10 min.
**E Quiet member:** roster "Sam 14d" â check in â personal nudge. No content exposed.
**F Publicâmember:** Google â blog/Discovery â trust â `/classes` â join â A.
**G Completion:** Week 11 â alumni â lighter space + monthly prompt â (future) subscription.
**H Discovery:** `/discover` â centers-first questions â candidates â type pages/compare â CTA to a class.

---

## 12. Safety, privacy & ethics
Load-bearing. RLS-enforced privacy (Â§7); reflection bodies encrypted at rest (treat like medical data); non-diagnostic copy everywhere with footer-linked responsible-use; crisis off-ramps reachable from composer/journal (never counsels); self-serve export + full erase; community report/remove + pinned norms; sharing always explicit, granular, reversible, most-private by default. Discovery and Pattern Mirror both carry the "starting point / notice, don't conclude" framing and never produce a verdict.

## 13. The Pattern Mirror â full spec
Reflects the member's **own** recurring language back so they can notice a pattern. Surfaces their words; never adds meaning, diagnoses, or assigns a type. To the user only; never the teacher.
**Tier 1 (ships first; deterministic; no model):** gate at â¥5 reflections; over the user's corpus only, tokenizeâlemmatizeâstrip stopwords + the prompt's own words; compute frequency, distinct-entry count, and weeks of appearance per term/2â3-word phrase; surface the top 1â3 terms appearing in **â¥3 distinct entries**; quiet dismissible panel â tap to jump to those entries â soft prompt "Just notice it. No conclusion needed."
**Tier 2 (later, flag `PATTERN_MIRROR_AI`):** embedâclusterâlabel **extractively** (verbatim user phrases only). Any LLM system prompt hard-bans interpretation/diagnosis/causal claims/type-assignment and adding words not in the user's text; treat content per the privacy posture (prefer private inference â flag, don't assume).
**Hard rules:** user's words only; observation framing only; **sensitive-term safeguard** â crisis-adjacent language is never highlighted as a "pattern"; instead the gentle resources path surfaces (non-alarming, teacher never alerted); always dismissible + a master off switch.
**Acceptance:** seeded 6-entry user with "enough" â panel shows term, count=6, correct weeks, links to exactly those entries; a 4-entry user â nothing.

---

## 14. Type Discovery â full spec (NEW)

**Philosophy.** Not a verdict-machine. The Enneagram's testing validity is debated; a "you are a 7" quiz would betray *mirror, not box* and be the least honest thing on the site. Discovery is a **guided, non-diagnostic reflection** that returns *candidates to explore*, always tentative, always paired with comparisons.

**Placement & access.** Public route `/discover`, no login (a strong top-of-funnel lead piece). Surfaced from the home "I'm unsure of my type" card and from the Library. Optional save if logged in (`discovery_results`). Flag `DISCOVERY_ENABLED`.

**Two modes.**
- **Quick â Centers-first (~6â9 questions).** First narrows the *center* (Body / Heart / Head) by what resonates, then narrows within the center to 1â2 likely types. Best for newcomers. Output in ~90 seconds.
- **Deeper â Guided reflection.** Motivation-based: *what you most want Â· what you most avoid Â· your stress pattern Â· your relationship pattern.* Returns 2â3 candidates with side-by-side comparisons and "questions to tell them apart."

**Scoring (honest, transparent â not pseudo-clinical).** Each option maps to centers/types with simple weights; we surface the **top cluster**, not a single winner. If the spread is flat (common for Nines / "I relate to everything"), say so warmly and return a wider set rather than forcing one. Never present a confidence % as if it were scientific.

**Output screen.** "You may want to explore Types X, Y, Z â start here," each a card linking to its full type page (Â§17) + a "compare these two" link to mistyping content. A persistent note: *"This is a starting point for reflection, not a diagnosis or a final answer."* Logged-in users get "save these / start a reflection from this." CTA at the bottom: "Want to go deeper? Donna runs an 11-week class."

**Guardrails.** No dark patterns ("sign up to unlock your REAL type" is banned). No claim of accuracy/science. Result framed as exploration. Fully accessible (keyboard, labeled radios, progress announced).

**Acceptance:** answering a clearly Body-center pattern returns candidates drawn from {8,9,1}; a flat/ambiguous answer set returns â¥3 candidates with the "you may relate to several" copy; the verdict-language linter finds no "you are a [type]" string anywhere in the output.

---

## 15. Notifications & the between-session loop
Class is ~1 hr/week; change lives in the other 167. Resend email v1 (in-app/push later). Types: weekly "this week's practice" on unlock; 1â2 mid-week micro-nudges; teacher broadcasts; "your teacher replied"; teacher-triggered gentle re-engagement (never automated guilt). Per-user cadence + full opt-down; calm, never dopamine-engineered. Impl: `nudges` + scheduled function (Vercel cron / Supabase scheduled) reading `send_at`.

## 16. Content model + Week 1
**Library:** MDX in-repo, statically generated, SEO; type pages from structured front-matter (Â§17). **Blog:** DB-stored, no-code editor, draft/publish/schedule, tags, cover (Storage). **Reusable MDX blocks:** key-idea box, pull-quote, comparison table, prompt card, responsible-use callout.

**Fully-written Week 1 (template seed â the concrete anchor):**
- *Title:* **Week 1 â Beginning to Watch**
- *Overview:* "Before any types, before any labels â we start by simply noticing. This week is about catching yourself in the ordinary moment, with curiosity instead of judgment."
- *Pre-work:* read "What the Enneagram Is (and Is Not)" + the responsible-use page; watch Donna's 6-minute intro; come with one recent moment that surprised you about yourself.
- *Session focus:* the three centers as three ways of meeting the world (body/heart/head); the difference between *behavior* and *motivation*; ground rules for the group (confidentiality, no typing each other).
- *Integration prompts:*
  1. *(reflection)* "Describe one moment this week where you reacted faster than you chose. What happened in your body first?"
  2. *(body)* "Three times this week, pause and ask: am I in my head, my heart, or my gut right now? Note what you find â no fixing."
  3. *(journaling)* "What made you want to learn this? What are you hoping to see more clearly?"

---

## 17. Worked example â full Type 9 page (the voice bible)
The exact tone/depth/structure every type page must hit: warm, precise, non-shaming, non-diagnostic, full-arc. Build the other eight to this bar.

### Type 9 â The Peacemaker *(also: the Mediator)* Â· Body Center
**Summary.** Nines are tuned to harmony â the felt sense of things being settled, between people and inside themselves. At their best they bring an unforced acceptance that lets others relax, a gift for holding many sides at once, and a steadiness that doesn't need to win. Under strain the same gift turns inward: they blur their own wants until they can't find them, go along to keep calm, and quietly disappear from their own life. The Nine's work isn't to get louder â it's to *show up*, including to themselves.

**Core pattern.** *Desire:* inner and outer peace, wholeness, no conflict. *Fear:* loss of connection; that asserting themselves will rupture the bond. *Wound:* an early felt message that their preferences didn't much matter. *Strategy:* merge with others and routine; minimize their position. *Focus:* others' agendas and the path of least friction â with a blind spot for their own. *Emotional habit:* a low steady numbing; anger goes underground as stubbornness. *Defense:* narcotizing with the familiar (food, screens, busywork, sleep). *Growth invitation:* treat their own voice as a contribution, not a disruption.

**What it looks like.** *Work:* trusted because they have no obvious axe to grind; great mediators; may stall decisions and flatten priorities into "it's all kind of important." *Friendship:* easy, accepting, so low-maintenance friends forget they have needs. *Romance:* warm and accommodating; risk is a slow merge that erases their own life. *Family:* the peacekeeper between others' storms, often since childhood. *Healthy:* present, awake, able to say "I want this" without apology. *Average:* agreeable on top, foggy underneath, "fine." *Reactive:* stubborn, shut down, immovable while insisting nothing's wrong.

**Inner monologue (humanizing, not definitive).** *"It's not a big deal. Whatever works for everyone is fine. I don't want to make this a thing. I'll handle it later."*

**Strengths.** Acceptance Â· sees all sides Â· steady in chaos Â· puts others at ease Â· patient Â· unpretentious Â· a deep unforced kindness.
**Challenges.** Going along to avoid friction Â· losing their own wants Â· procrastination/inertia Â· buried anger as stubbornness Â· letting problems grow Â· self-forgetting.
**Self-misunderstanding.** They may think they have no strong preferences â when they've simply muted them so well even they can't hear them. "Easygoing" is sometimes the costume self-erasure wears.
**Others' misunderstanding.** Their calm reads as agreement or not-caring, when often they care deeply and are protecting the peace; their stubbornness surprises people who mistook quiet for compliance.
**Childhood pattern (gentle, a common story not a law).** Many describe learning early that the surest way to belong was to not make waves. *(Not "all Nines had this childhood.")*
**Stress & growth (arrows â tendencies, not destiny).** *Stress â 6:* the fog gives way to anxiety, worst-casing, reassurance-seeking. *Growth â best of 3:* they get into motion, claim a goal, let themselves be seen. *Return to balance:* movement/the body, naming one real preference daily, catching the moment they "leave."
**Relationships.** *Gives:* steady presence, acceptance, room. *Needs:* to be asked directly and patiently what *they* want, with space to find it. *Triggered by:* being pushed, rushed, steamrolled; conflict that threatens the bond. *Talk to them:* don't fill their silences; ask, then wait; make disagreement safe. *Repair:* slowly, once the bond feels safe again, and best when invited not cornered.
**Growth practices.** *Self-obs:* "What do I actually want â before I check what everyone else wants?" *Body:* daily movement that wakes the body; find where you've gone numb. *Emotional:* feel small irritations as they happen instead of banking them. *Relational:* state one preference out loud today, no justification. *Journaling:* "Where did I 'leave the room' today â and what was I avoiding?" *This week:* when asked where to eat, answer first; notice the resistance; answer anyway.
**Mistyping.** *9 vs 2:* both warm/accommodating, but Two moves toward people to be needed; Nine merges to keep peace. *9 vs 4:* both feel a longing, but Four heightens feeling, Nine dampens it. *9 vs 5:* both withdraw â Five to think/conserve, Nine to avoid disturbance.
**FAQ.** *Lazy?* No â inertia is avoiding disturbance, not unwillingness; Nines work tirelessly for others while stalling on their own life. *Type change?* Type is stable; your health within it isn't â that's the work. *Relate to everything?* Common for Nines who merge with other views; look at motivation, not behavior.
> â A reflective lens, not a verdict. A mirror, not a box.

---

## 18. API & server-action surface (NEW)
App Router server actions / route handlers. Every one guards auth + role; reflection content never enters logs/analytics.
```
Reflections   createReflection(promptId?, body, visibility)        member, self
              updateReflection(id, body)                           member, owner
              setReflectionVisibility(id, visibility)              member, owner  (retracts on downgrade)
              deleteReflection(id)                                 member, owner  (soft â erase)
              respondToReflection(reflectionId, body)              facilitator, if shared_with_teacher & owns cohort
Journal       listMyReflections(filter)                            member, self
              getPatternMirror()                                   member, self  (Â§13)
Cohort        createCohortFromTemplate(templateId, dates, tz)      facilitator   (materializes weeks/prompts)
              inviteMembers(cohortId, emails[])                    facilitator
              advanceWeek(cohortId)                                facilitator
              getParticipationSignals(cohortId)                    facilitator   (signals view only)
              leaveCohort(cohortId)                                member, self
Curriculum    upsertTemplate / upsertTemplateWeek / upsertPrompt   facilitator
Community     createPost(cohortId, kind, body) / reply(...)        member, same cohort
Discovery     submitDiscovery(answers)                             public        â candidates (Â§14)
              saveDiscovery(result)                                member, self
Blog          upsertBlogPost / publishBlogPost(id)                 facilitator
Enroll        createEnrollment(slug, email)                        public
Cron          POST /api/cron/nudges                                system        (scheduled; reads send_at)
```

## 19. Testing & QA strategy (NEW)
Tests are a release gate; CI must pass before a Vercel deploy is promoted.
- **Unit (Vitest):** pure logic â Pattern Mirror frequency/gating, visibility-downgrade retraction, week unlock-date math (with timezone), Discovery scoring + the flat-spread case, verdict-language linter.
- **Integration / RLS (the critical layer; pgTAP or DB tests with distinct JWTs):**
  - member A cannot `select` member B's `private` reflection â 0 rows.
  - facilitator `select` on a `private` reflection in their own cohort â 0 rows; on a `shared_with_teacher` one â 1 row; on reflection **body** via signals path â never exposed.
  - co-member reads `shared_with_cohort` only within the same active cohort.
  - downgrading sharedâprivate removes it from community + teacher queue immediately.
  - editing a template does not mutate a running cohort's `weeks`/`prompts`.
- **E2E (Playwright):**
  - the loop â join â see Week 1 â write reflection (private) â share with teacher â teacher replies â member sees badged reply.
  - teacher â create cohort from template in <10 steps; quiet-member "check in".
  - public â Discovery â candidates â type page; verdict-language linter passes on rendered output.
- **Accessibility:** axe in CI on every public + key app page; keyboard-only e2e of composer, symbol, Discovery; `prefers-reduced-motion` honored.
- **States:** snapshot/visual check that every data view renders loading + empty + error.
- **Security:** assert no reflection text appears in analytics payloads; assert reflection bodies are encrypted at rest.
- **Seeds/fixtures:** deterministic users (4-entry and 6-entry for the Mirror; a Body-pattern answer set for Discovery).
- **Manual QA checklist** per phase, tied to Definition of Done (Â§23).

## 20. Build phases, MVP & what NOT to build
- **Phase 0 â The Gift (~1â2 weekends):** public Library (â¥9 type pages + responsible-use) Â· Blog + no-code admin Â· **Discovery (Quick mode)** Â· About Â· Home. Complete, giftable, and already a funnel.
- **Phase 1 â The Container:** Auth Â· Cohort Engine Â· Reflection Engine v1 (prompts, private journaling, scroll-back) Â· Teacher portal v1 (build cohort, signals, response queue) Â· dashboard + weekly journey.
- **Phase 2 â Loop closes:** lightweight cohort community + shared reflections Â· Pattern Mirror Tier 1 Â· nudges Â· Discovery Deeper mode Â· dark mode.
- **Phase 3 â Afterlife & commerce:** alumni Â· payments (Stripe) Â· subscription Â· contemplative module.
- **Phase 4 â Platform (only if earned):** multiple facilitators.
**Refuse in v1:** full social community (DMs/profiles/global feed) Â· any AI beyond Pattern Mirror Tier 1 Â· payments/stranger-accounts Â· 27-subtype/harmonics/Hornevian depth Â· gamification/streak-pressure Â· any "test" that returns a single definitive type.

## 21. Metrics & success
Privacy-respecting analytics only (event-level, never content). **North Star:** % of a cohort still journaling in week 11. Student: weekly journaling rate Â· weeks completed Â· scroll-back events Â· reflections shared. Teacher: time-to-launch Â· % shared reflections answered Â· % cohort journaling weekly Â· completionâalumni. Funnel: blog/Discovery â /classes CTR Â· **Discovery completion + Discoveryâenroll rate** Â· library pages/session. Guardrails: nudge opt-down rate, Mirror dismiss/disable rate, community reports.

## 22. Edge cases & failure handling
Member leaves mid-cohort â reflections stay theirs, cohort/community access ends, `shared_with_cohort` retracts, `left_at` set. Account erase â reflection bodies erased, responses removed, community posts hard-deleted (default; confirm with Donna), export offered first, double-confirm. Downgrade sharedâprivate â retracts everywhere instantly, teacher reply hidden from others (kept for author). Template edit during a run â no effect (materialized). Multiple cohorts at once â dashboard shows each current week; journal spans all. Falling behind â no shaming, past weeks open, gentle re-entry. Timezones â `cohorts.timezone` governs unlocks/sessions; nudges send local morning. Donna away â expected-reply window + optional auto-ack; no SLA promised. Crisis-adjacent language â gentle resources to the writer only, never auto-reported, teacher not alerted to content. Discovery "relate to everything" â wider candidate set + warm copy, never forced. Empty/single-member cohort â degrades gracefully. Nudge/email failure â retry + log, never blocks the app. Every data view has loading/empty/error.

## 23. Definition of done
Ships only when: **privacy** RLS tests pass (member can't read another's private; facilitator sees signals not content); **a11y** keyboard end-to-end + AA + labeled symbol + reduced-motion; **states** on every data view; **responsive** 360px+; **the loop (P1)** Donna launches <10 min, member journals privately, scroll-back is real; **Pattern Mirror (P2)** passes Â§13; **Discovery** passes Â§14 (verdict-linter clean); **tests (Â§19)** green in CI; **performance** library/blog static, CWV green; **safety** responsible-use + crisis reachable from every authed surface.

## 24. Voice & microcopy
Warm, precise, non-shaming, nuanced, practical, not mystical-by-default. Avoid "you're such a 4," "find your TRUE type," labels, spiritualized judgment. Prefer "notice," "you may find," "a pattern, not a verdict." (Â§17 is the full reference.)
- Empty journal: *"Your reflections will gather here. There's no right way â just notice, and write."*
- Composer: *"This isn't a test. Write what's true today."*
- Visibility default: *"Private â only you can read this."*
- Footer: *"A mirror for self-awareness â not a diagnosis, label, or replacement for therapy."*
- Community norm: *"Share your own pattern. Never name someone else's type for them."*
- Discovery result: *"A starting point for reflection â not a diagnosis or a final answer."*
- Re-engage: *"Just thinking of you this week â no pressure to keep up, only an invitation back when you're ready."*

## 25. Config flags & open questions
**Flags:** `CONTEMPLATIVE_MODULE` Â· `COMMUNITY_ENABLED` Â· `PATTERN_MIRROR_ENABLED` Â· `PATTERN_MIRROR_AI` Â· `DISCOVERY_ENABLED` Â· `PAYMENTS_ENABLED` Â· `MULTI_FACILITATOR`.
**Resolve with Donna before Phase 1 (don't block Phase 0):** (1) one site or two â standalone or folded in with her drawing-therapy practice? (2) is 11 weeks fixed or does she want other lengths? (3) church-only or commercial someday? (4) how visible in the community? (5) does the contemplative framing lead or sit as one track?

---
*End of spec, v3. Build Phase 0 first â a complete gift on its own, now with a working front door. Everything after is where the soul lives.*
