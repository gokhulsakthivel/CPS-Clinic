import { Link, useParams, Navigate } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { findUpdate, updateCategories, updates } from '../constants/updates.js';
import useDocumentHead from '../ui/useDocumentHead.js';
import useJsonLd from '../ui/useJsonLd.js';
import PageHero from '../ui/PageHero.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';
import Markdown from '../ui/Markdown.jsx';
import CTA from '../components/CTA.jsx';
import { clinic } from '../constants/content.js';

// /updates/:slug — single post detail.
//
// Renders: cover (16:9), meta bar (date · category · location),
// markdown body inside a prose container, an inline photo gallery, and
// a "back to updates" link. If the slug doesn't resolve we bounce back
// to the listing rather than showing a bare 404.

function categoryLabel(id) {
  const c = updateCategories.find((x) => x.id === id);
  return c ? c.label : id;
}

function CoverImage({ cover, title }) {
  if (!cover?.jpg) return null;
  return (
    <figure
      style={{
        margin: 0,
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 9',
        borderRadius: 16,
        overflow: 'hidden',
        border: `1px solid ${C.border}`,
        background: C.surface,
      }}
    >
      <picture>
        {cover.webp && <source srcSet={cover.webp} type="image/webp" />}
        <img
          src={cover.jpg}
          alt={cover.alt || title}
          loading="eager"
          fetchpriority="high"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </picture>
    </figure>
  );
}

function GalleryGrid({ photos }) {
  if (!photos?.length) return null;
  return (
    <section aria-label="Photos from this update" style={{ marginTop: 48 }}>
      <h2
        style={{
          fontFamily: "'Poppins', system-ui, sans-serif",
          fontSize: 'clamp(18px, 2.2vw, 22px)',
          fontWeight: 700,
          color: C.ink,
          letterSpacing: '-0.2px',
          marginBottom: 16,
        }}
      >
        Photos
      </h2>
      <div
        style={{
          display: 'grid',
          gap: 12,
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        }}
      >
        {photos.map((p, i) => (
          <figure
            key={p.jpg}
            style={{
              margin: 0,
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: 12,
              overflow: 'hidden',
              border: `1px solid ${C.border}`,
              background: C.surface,
            }}
          >
            <picture>
              {p.webp && <source srcSet={p.webp} type="image/webp" />}
              <img
                src={p.jpg}
                alt={p.alt || `Photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </picture>
          </figure>
        ))}
      </div>
    </section>
  );
}

function MetaBar({ post }) {
  const items = [
    post.dateLabel && { icon: 'calendar', text: post.dateLabel },
    { icon: 'clipboard', text: categoryLabel(post.category) },
    post.location && { icon: 'map', text: post.location },
  ].filter(Boolean);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        color: C.muted,
        fontSize: 13.5,
        marginTop: 14,
      }}
    >
      {items.map((it) => (
        <span key={it.text} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Svg name={it.icon} size={14} color={C.muted} sw={1.75} />
          {it.text}
        </span>
      ))}
    </div>
  );
}

function RelatedPosts({ currentSlug }) {
  const rest = updates.filter((u) => u.slug !== currentSlug).slice(0, 3);
  if (rest.length === 0) return null;
  return (
    <section
      aria-label="Other updates"
      style={{
        marginTop: 56,
        borderTop: `1px solid ${C.border}`,
        paddingTop: 32,
      }}
    >
      <h2
        style={{
          fontFamily: "'Poppins', system-ui, sans-serif",
          fontSize: 'clamp(18px, 2.2vw, 22px)',
          fontWeight: 700,
          color: C.ink,
          letterSpacing: '-0.2px',
          marginBottom: 14,
        }}
      >
        Other updates
      </h2>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
        {rest.map((r) => (
          <li key={r.slug}>
            <Link
              to={`/updates/${r.slug}`}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: 12,
                padding: '10px 0',
                color: C.ink,
                borderBottom: `1px solid ${C.border}`,
                textDecoration: 'none',
              }}
            >
              <span style={{ fontWeight: 600 }}>{r.title}</span>
              <span style={{ fontSize: 13, color: C.muted, whiteSpace: 'nowrap' }}>
                {r.dateLabel}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function UpdatePage() {
  const { slug } = useParams();
  const post = findUpdate(slug);

  useDocumentHead(
    post
      ? {
          title: `${post.title} · DR.CPS Clinic Updates`,
          description: post.excerpt,
          path: `/updates/${post.slug}`,
          image: post.cover?.jpg || undefined,
          ogType: 'article',
        }
      : {
          title: 'Update not found',
          description: 'This update could not be found.',
          path: '/updates',
        },
  );

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://drcps.clinic';
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: post.author },
        publisher: {
          '@type': 'MedicalOrganization',
          name: clinic.name,
          url: `${origin}${base}/`,
          logo: {
            '@type': 'ImageObject',
            url: `${origin}${base}/og.png`,
          },
        },
        mainEntityOfPage: `${origin}${base}/updates/${post.slug}`,
        ...(post.cover?.jpg && { image: `${origin}${post.cover.jpg}` }),
        ...(post.location && {
          contentLocation: { '@type': 'Place', name: post.location },
        }),
        ...(post.tags?.length && { keywords: post.tags.join(', ') }),
      }
    : null;
  useJsonLd('article', jsonLd);

  if (!post) return <Navigate to="/updates" replace />;

  return (
    <>
      <PageHero
        eyebrow={`${categoryLabel(post.category)} · ${post.dateLabel}`}
        title={post.title}
        lead={post.excerpt}
      />

      <section style={{ background: C.white }}>
        <div
          className="drcps-container"
          style={{
            padding: '32px var(--pad-x) 72px',
            maxWidth: 780,
            marginInline: 'auto',
          }}
        >
          <FadeIn>
            <CoverImage cover={post.cover} title={post.title} />
          </FadeIn>

          <FadeIn delay={40}>
            <MetaBar post={post} />
          </FadeIn>

          <FadeIn delay={80}>
            <div style={{ marginTop: 32 }}>
              <Markdown html={post.bodyHtml} />
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <GalleryGrid photos={post.gallery} />
          </FadeIn>

          <FadeIn delay={160}>
            <RelatedPosts currentSlug={post.slug} />
          </FadeIn>

          <p style={{ marginTop: 40, fontSize: 14 }}>
            <Link to="/updates" style={{ color: C.primary }}>
              ← Back to all updates
            </Link>
          </p>
        </div>
      </section>

      <CTA />
    </>
  );
}
