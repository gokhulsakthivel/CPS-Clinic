import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { C } from './constants/colors.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MobileStickyBar from './components/MobileStickyBar.jsx';
import HomePage from './pages/HomePage.jsx';
import ScrollToTop from './ui/ScrollToTop.jsx';

// Home stays eager (largest, first paint). Inner pages code-split so the
// initial bundle drops meaningfully — most visitors land on / and never
// download the booking form, resources page, or full doctor bio.
const AboutPage             = lazy(() => import('./pages/AboutPage.jsx'));
const ServicesPage          = lazy(() => import('./pages/ServicesPage.jsx'));
const DiabetesClinicPage    = lazy(() => import('./pages/DiabetesClinicPage.jsx'));
const GeneralPhysicianPage  = lazy(() => import('./pages/GeneralPhysicianPage.jsx'));
const FacilitiesPage        = lazy(() => import('./pages/FacilitiesPage.jsx'));
const GalleryPage           = lazy(() => import('./pages/GalleryPage.jsx'));
const ResourcesPage         = lazy(() => import('./pages/ResourcesPage.jsx'));
const ContactPage           = lazy(() => import('./pages/ContactPage.jsx'));
const DevPrimitives         = lazy(() => import('./pages/DevPrimitives.jsx'));

// 6-page sitemap after Tier 2 merges:
//   /                             Home
//   /about                        About (+ Meet the doctor)
//   /services                     Services overview
//     /services/diabetes-clinic   Sub-page (SEO)
//     /services/general-physician Sub-page (SEO)
//   /facilities                   Facilities
//   /resources                    Patient education + FAQs
//   /contact                      Contact & book (+ live map)
// Legacy routes redirect to their new home.

function NotFound() {
  return (
    <div className="drcps-container" style={{ padding: '56px var(--pad-x) 72px' }}>
      <div
        style={{
          fontSize: 12,
          color: C.green,
          fontWeight: 600,
          letterSpacing: '0.4px',
          marginBottom: 8,
          textTransform: 'uppercase',
        }}
      >
        Page not found
      </div>
      <h1 style={{ fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 700, color: C.ink }}>
        We couldn&apos;t find that page
      </h1>
      <p style={{ marginTop: 16, color: C.muted, fontSize: 17, lineHeight: 1.6, maxWidth: 640 }}>
        The page may have moved. Try the navigation above, or head back to the
        {' '}<a href="/" style={{ color: C.primary, borderBottom: `1px dotted ${C.border}` }}>home page</a>.
      </p>
    </div>
  );
}

function RouteFallback() {
  // Shown while a code-split page chunk loads. CSS delays reveal by 150ms so
  // fast chunk loads never flash the spinner.
  return (
    <div className="drcps-route-fallback" role="status" aria-live="polite">
      <div className="drcps-route-spinner" aria-hidden="true" />
      <div className="drcps-route-caption">Loading</div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/"                            element={<HomePage />} />
            <Route path="/about"                       element={<AboutPage />} />
            <Route path="/services"                    element={<ServicesPage />} />
            <Route path="/services/diabetes-clinic"    element={<DiabetesClinicPage />} />
            <Route path="/services/general-physician"  element={<GeneralPhysicianPage />} />
            <Route path="/facilities"                  element={<FacilitiesPage />} />
            <Route path="/gallery"                     element={<GalleryPage />} />
            <Route path="/resources"                   element={<ResourcesPage />} />
            <Route path="/contact"                     element={<ContactPage />} />

            {/* Legacy route redirects (preserve bookmarks / external links). */}
            <Route path="/doctor"             element={<Navigate to="/about#doctor" replace />} />
            <Route path="/book-appointment"   element={<Navigate to="/contact" replace />} />
            <Route path="/patient-education"  element={<Navigate to="/resources#conditions" replace />} />
            <Route path="/faq"                element={<Navigate to="/resources#faq" replace />} />
            <Route path="/testimonials"       element={<Navigate to="/" replace />} />

            <Route path="/dev/primitives"     element={<DevPrimitives />} />
            <Route path="*"                   element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <div className="drcps-sticky-pad" aria-hidden="true" />
      <MobileStickyBar />
    </>
  );
}
