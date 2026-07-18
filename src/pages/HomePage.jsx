import Hero from '../components/Hero.jsx';
import Stats from '../components/Stats.jsx';
import Doctor from '../components/Doctor.jsx';
import Services from '../components/Services.jsx';
import WhyChoose from '../components/WhyChoose.jsx';
import Facilities from '../components/Facilities.jsx';
import Gallery from '../components/Gallery.jsx';
import UpdatesTeaser from '../components/UpdatesTeaser.jsx';
import Journey from '../components/Journey.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQ from '../components/FAQ.jsx';
import ContactPreview from '../components/ContactPreview.jsx';
import CTA from '../components/CTA.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// Home page — composed of self-contained sections (Phase 4 complete).

export default function HomePage() {
  useDocumentHead(pageMeta.home);
  return (
    <>
      <Hero />
      <Stats />
      <Doctor />
      <Services />
      <WhyChoose />
      <Facilities />
      <Gallery />
      <UpdatesTeaser />
      <Journey />
      <Testimonials />
      <FAQ />
      <ContactPreview />
      <CTA />
    </>
  );
}
