import { Link } from 'react-router-dom';
import { C } from '../constants/colors.js';
import { featuredUpdates, updates } from '../constants/updates.js';
import SectionHead from '../ui/SectionHead.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';
import UpdateCard from './UpdateCard.jsx';

// Home page teaser — shows up to 3 latest posts (featured first). Renders
// nothing when there are no posts yet, so the home page stays clean
// during the pre-launch phase.

export default function UpdatesTeaser({ background = C.surface }) {
  if (updates.length === 0) return null;

  const items = featuredUpdates(3);

  return (
    <section style={{ background }}>
      <div
        className="drcps-container"
        style={{ padding: '64px var(--pad-x) 72px' }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <FadeIn>
            <SectionHead
              eyebrow="Latest from the clinic"
              title="Camps, seminars & clinic updates"
              subtitle="Community health drives, awareness events, and the occasional announcement — the latest from DR.CPS Clinic."
            />
          </FadeIn>
          <FadeIn delay={60}>
            <Link
              to="/updates"
              className="drcps-nav-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: C.primary,
                fontWeight: 600,
                fontSize: 14.5,
                minHeight: 32,
              }}
            >
              See all updates
              <Svg name="arrowRight" size={16} color={C.primary} sw={1.75} />
            </Link>
          </FadeIn>
        </div>

        <div
          style={{
            marginTop: 32,
            display: 'grid',
            gap: 20,
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            alignItems: 'stretch',
          }}
        >
          {items.map((post, i) => (
            <FadeIn key={post.slug} delay={(i % 3) * 60}>
              <UpdateCard post={post} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
