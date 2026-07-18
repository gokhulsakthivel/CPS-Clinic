import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { updates, updateCategories } from '../constants/updates.js';
import PageHero from '../ui/PageHero.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';
import CTA from '../components/CTA.jsx';
import UpdateCard from '../components/UpdateCard.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// /updates — camps, seminars, awareness events, screenings, announcements.
//
// Renders a card grid of every post, with a URL-synced category filter
// (?category=<id>). Chips with a zero count are hidden so the bar only
// exposes categories that actually have posts.

const VALID_CATEGORY_IDS = new Set(updateCategories.map((c) => c.id));

function useCategoryParam() {
  const [params, setParams] = useSearchParams();
  const raw = params.get('category');
  const active = raw && VALID_CATEGORY_IDS.has(raw) ? raw : null;
  const setActive = (id) => {
    const next = new URLSearchParams(params);
    if (id) next.set('category', id);
    else next.delete('category');
    setParams(next, { replace: true });
  };
  return [active, setActive];
}

function FilterBar({ active, setActive, counts }) {
  const visible = updateCategories.filter((c) => (counts.get(c.id) || 0) > 0);
  if (visible.length === 0) return null;

  const chip = (id, label, count, isActive) => (
    <button
      key={id ?? 'all'}
      type="button"
      onClick={() => setActive(id)}
      aria-pressed={isActive}
      className="drcps-tap"
      style={{
        padding: '7px 14px',
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 600,
        border: `1px solid ${isActive ? C.primary : C.border}`,
        background: isActive ? C.primary : C.white,
        color: isActive ? C.white : C.ink,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
        transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease',
      }}
    >
      {label}
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          color: isActive ? 'rgba(255,255,255,0.85)' : C.muted,
          background: isActive ? 'rgba(255,255,255,0.15)' : C.surface,
          border: isActive ? '1px solid rgba(255,255,255,0.25)' : `1px solid ${C.border}`,
          padding: '1px 8px',
          borderRadius: 999,
        }}
      >
        {count}
      </span>
    </button>
  );

  return (
    <div
      role="toolbar"
      aria-label="Filter updates by category"
      style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}
    >
      {chip(null, 'All', updates.length, !active)}
      {visible.map((c) => chip(c.id, c.label, counts.get(c.id) || 0, active === c.id))}
    </div>
  );
}

function EmptyState({ filtered }) {
  return (
    <div
      style={{
        border: `1px dashed ${C.border}`,
        borderRadius: 16,
        background: C.surface,
        padding: '48px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 12,
        maxWidth: 640,
        marginInline: 'auto',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 52,
          height: 52,
          borderRadius: 14,
          background: C.white,
          border: `1px solid ${C.border}`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg name="calendar" size={24} color={C.primary} sw={1.5} />
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: C.ink, letterSpacing: '-0.2px' }}>
        {filtered ? 'Nothing here yet' : 'First updates coming soon'}
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: C.muted, maxWidth: 460 }}>
        {filtered
          ? "We haven't posted anything in this category yet. Try another filter, or check back after our next event."
          : "We'll share write-ups and photos from our next health camp, awareness talk, and community screening drive here. Check back shortly, or follow along on WhatsApp."}
      </p>
      {filtered && (
        <Link
          to="/updates"
          style={{ marginTop: 4, fontSize: 14, color: C.primary, fontWeight: 600 }}
        >
          Clear filter
        </Link>
      )}
    </div>
  );
}

export default function UpdatesPage() {
  useDocumentHead(pageMeta.updates);
  const [active, setActive] = useCategoryParam();

  const counts = useMemo(() => {
    const m = new Map();
    for (const u of updates) m.set(u.category, (m.get(u.category) || 0) + 1);
    return m;
  }, []);

  const visible = useMemo(
    () => (active ? updates.filter((u) => u.category === active) : updates),
    [active],
  );

  const hasAny = updates.length > 0;

  return (
    <>
      <PageHero
        eyebrow="News & events"
        title="Camps, seminars & clinic updates"
        lead="Community health camps, awareness events, patient education seminars, and the occasional announcement from DR.CPS Clinic in Podanur."
        aside={hasAny ? <FilterBar active={active} setActive={setActive} counts={counts} /> : null}
      />

      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '48px var(--pad-x) 72px' }}>
          {hasAny && visible.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gap: 20,
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                alignItems: 'stretch',
              }}
            >
              {visible.map((post, i) => (
                <FadeIn key={post.slug} delay={(i % 3) * 60}>
                  <UpdateCard post={post} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <FadeIn>
              <EmptyState filtered={hasAny && visible.length === 0} />
            </FadeIn>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}
