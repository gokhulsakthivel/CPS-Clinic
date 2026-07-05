import { useState, useMemo } from 'react';
import { C } from '../constants/colors.js';
import { clinic } from '../constants/content.js';
import PageHero from '../ui/PageHero.jsx';
import FadeIn from '../ui/FadeIn.jsx';
import Svg from '../ui/Svg.jsx';
import Button from '../ui/Button.jsx';
import useDocumentHead from '../ui/useDocumentHead.js';
import { pageMeta } from '../constants/pageMeta.js';

// Contact page (Tier 2 merged: Contact + Book appointment).
// Booking form is the primary column; clinic details + map alongside/below.

const telHref = clinic.phone    ? `tel:${clinic.phone.replace(/\s+/g, '')}`             : '#';
const waHref  = clinic.whatsapp ? `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}` : '#';
const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=DR.CPS+SPECIALITY+AND+DIABETIC+CLINIC,+Podanur+Main+Road,+Coimbatore&output=embed';

// Build a WhatsApp deep-link with the booking details pre-filled as the
// message body. Patient taps Send → message arrives on the clinic's WhatsApp.
// Falls back to plain waHref if no phone is configured.
function buildWhatsAppUrl(values) {
  if (!clinic.whatsapp) return waHref;
  const dateStr = values.date
    ? new Date(values.date + 'T00:00:00').toLocaleDateString('en-IN', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
      })
    : '(not set)';
  const lines = [
    `Hello DR.CPS Clinic — I’d like to book an appointment.`,
    ``,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Preferred date: ${dateStr}`,
    `Patient type: ${values.patientType} patient`,
  ];
  if (values.reason) lines.push(``, `Reason: ${values.reason}`);
  return `https://wa.me/${clinic.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(lines.join('\n'))}`;
}

function Field({ id, label, hint, error, required, children }) {
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>
        {label}
        {required && <span aria-hidden="true" style={{ color: '#B91C1C', marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {hint && !error && <div style={{ fontSize: 12, color: C.muted }}>{hint}</div>}
      {error && <div role="alert" style={{ fontSize: 12.5, color: '#B91C1C' }}>{error}</div>}
    </div>
  );
}

function validate(v) {
  const errors = {};
  if (!v.name || v.name.trim().length < 2) errors.name = 'Please enter your full name.';
  const digits = (v.phone || '').replace(/\D/g, '');
  if (!digits) errors.phone = 'Phone number is required.';
  else if (digits.length < 10) errors.phone = 'Please enter a valid 10-digit phone number.';
  if (!v.date) errors.date = 'Please pick a preferred date.';
  else {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const picked = new Date(v.date + 'T00:00:00');
    if (picked < today) errors.date = 'Date cannot be in the past.';
  }
  if (v.reason && v.reason.length > 500) errors.reason = 'Please keep this under 500 characters.';
  return errors;
}

function SuccessPanel({ values, onReset }) {
  return (
    <div
      role="status"
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: '32px 28px',
        display: 'grid',
        gap: 16,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 48,
          background: '#E7F5EF',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg name="arrowRight" size={22} color={C.green} sw={2.25} />
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 700, color: C.ink, letterSpacing: '-0.2px' }}>
        Request received — {values.name.split(' ')[0]}, we&apos;ll be in touch shortly
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.6, color: C.muted }}>
        WhatsApp should have opened in a new tab with your booking pre-filled — tap <strong>Send</strong> there
        to finish. The clinic will confirm your slot within a few hours.
      </p>
      <div
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: '14px 16px',
          fontSize: 14,
          color: C.ink,
          display: 'grid',
          gap: 4,
        }}
      >
        <div><strong>Name:</strong> {values.name}</div>
        <div><strong>Phone:</strong> {values.phone}</div>
        <div><strong>Preferred date:</strong> {values.date}</div>
        <div><strong>Patient type:</strong> {values.patientType}</div>
        {values.reason && <div><strong>Reason:</strong> {values.reason}</div>}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <Button
          variant="green"
          href={buildWhatsAppUrl(values)}
          icon="whatsapp"
        >
          WhatsApp didn&apos;t open? Tap here
        </Button>
        <Button variant="outline" onClick={onReset}>
          Book another appointment
        </Button>
      </div>
    </div>
  );
}

function BookingForm() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [values, setValues] = useState({
    name: '', phone: '', date: '', reason: '', patientType: 'New',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(k) {
    return (e) => {
      const val = e && e.target ? e.target.value : e;
      setValues((v) => ({ ...v, [k]: val }));
      if (errors[k]) setErrors((e2) => ({ ...e2, [k]: undefined }));
    };
  }

  function onSubmit(e) {
    e.preventDefault();
    const errs = validate(values);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(`b-${firstKey}`)?.focus?.();
      return;
    }
    // Open WhatsApp with the pre-filled booking message. Called synchronously
    // inside the click handler so iOS Safari doesn't block the popup.
    const waUrl = buildWhatsAppUrl(values);
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onReset() {
    setValues({ name: '', phone: '', date: '', reason: '', patientType: 'New' });
    setErrors({});
    setSubmitted(false);
  }

  if (submitted) return <SuccessPanel values={values} onReset={onReset} />;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: '28px 26px',
        display: 'grid',
        gap: 18,
      }}
    >
      <Field id="b-name" label="Full name" required error={errors.name}>
        <input
          id="b-name" className="drcps-input" type="text" autoComplete="name"
          value={values.name} onChange={update('name')}
          aria-invalid={!!errors.name} aria-required="true"
        />
      </Field>

      <Field id="b-phone" label="Phone number" required error={errors.phone}>
        <input
          id="b-phone" className="drcps-input" type="tel" inputMode="tel" autoComplete="tel"
          placeholder="10-digit number"
          value={values.phone} onChange={update('phone')}
          aria-invalid={!!errors.phone} aria-required="true"
        />
      </Field>

      <Field
        id="b-date"
        label="Preferred date"
        hint="Consultations are evening only — 5:30 PM to 9:00 PM, working days."
        required
        error={errors.date}
      >
        <input
          id="b-date" className="drcps-input" type="date" min={today}
          value={values.date} onChange={update('date')}
          aria-invalid={!!errors.date} aria-required="true"
        />
      </Field>

      <Field
        id="b-reason" label="Reason for visit"
        hint="Optional — a few words help us prepare."
        error={errors.reason}
      >
        <textarea
          id="b-reason" className="drcps-input" rows={3}
          value={values.reason} onChange={update('reason')}
          style={{ resize: 'vertical', minHeight: 88 }}
          aria-invalid={!!errors.reason}
        />
      </Field>

      <Field id="b-patient" label="Are you a new or existing patient?">
        <div
          id="b-patient" role="radiogroup" aria-label="Patient type"
          style={{ display: 'flex', gap: 8 }}
        >
          {['New', 'Existing'].map((t) => {
            const active = values.patientType === t;
            return (
              <label
                key={t}
                style={{
                  flex: 1,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '12px 16px', borderRadius: 10,
                  background: active ? C.primary : C.white,
                  color: active ? C.white : C.ink,
                  border: `1px solid ${active ? C.primary : C.border}`,
                  fontSize: 14.5, fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background 140ms ease, color 140ms ease, border-color 140ms ease',
                  userSelect: 'none', minHeight: 44,
                }}
              >
                <input
                  type="radio" name="patientType" value={t} checked={active}
                  onChange={() => update('patientType')(t)}
                  style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                />
                {t} patient
              </label>
            );
          })}
        </div>
      </Field>

      <Button variant="primary" type="submit" fullWidth>
        Confirm appointment
      </Button>
      <div style={{ fontSize: 12, color: C.muted, textAlign: 'center' }}>
        By submitting, you agree to be contacted by the clinic to confirm your slot.
      </div>
    </form>
  );
}

function DetailRow({ icon, label, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 36, height: 36, borderRadius: 10,
          background: C.tint, display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}
      >
        <Svg name={icon} size={18} color={C.primary} sw={1.75} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 12, color: C.muted, letterSpacing: '0.4px',
            textTransform: 'uppercase', fontWeight: 600, marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div style={{ fontSize: 14.5, lineHeight: 1.55, color: C.ink }}>{children}</div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  useDocumentHead(pageMeta.contact);
  return (
    <>
      <PageHero
        eyebrow="Contact &amp; book"
        title="Book a consultation or get in touch"
        lead="Fill in your details and our team will confirm your slot on WhatsApp within a few hours. Prefer to talk? Call or message the clinic directly."
      />

      {/* Form + clinic details */}
      <section id="book" style={{ background: C.surface, scrollMarginTop: 80 }}>
        <div className="drcps-container" style={{ padding: '48px var(--pad-x) 56px' }}>
          <div className="drcps-2col drcps-2col--wide-l" style={{ alignItems: 'start' }}>
            {/* Booking form (primary) */}
            <FadeIn>
              <BookingForm />
            </FadeIn>

            {/* Clinic details */}
            <FadeIn delay={80}>
              <aside
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 16,
                  padding: '28px 26px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      color: C.green,
                      fontWeight: 600,
                      letterSpacing: '0.4px',
                      textTransform: 'uppercase',
                      marginBottom: 8,
                    }}
                  >
                    Clinic details
                  </div>
                  <h2
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: C.ink,
                      letterSpacing: '-0.2px',
                      lineHeight: 1.25,
                    }}
                  >
                    Prefer to talk instead?
                  </h2>
                </div>

                <DetailRow icon="map" label="Address">
                  <a
                    href={clinic.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: C.ink, borderBottom: `1px dotted ${C.border}` }}
                  >
                    {clinic.address}
                  </a>
                </DetailRow>

                {clinic.phone && (
                  <DetailRow icon="phone" label="Phone">
                    <a href={telHref} style={{ color: C.ink }}>{clinic.phone}</a>
                  </DetailRow>
                )}

                {clinic.whatsapp && (
                  <DetailRow icon="whatsapp" label="WhatsApp">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: C.ink }}
                    >
                      Message us on WhatsApp
                    </a>
                  </DetailRow>
                )}

                {clinic.email && (
                  <DetailRow icon="message" label="Email">
                    <a href={`mailto:${clinic.email}`} style={{ color: C.ink }}>
                      {clinic.email}
                    </a>
                  </DetailRow>
                )}

                <DetailRow icon="calendar" label="Consultation hours">
                  {clinic.hours || 'Days & timings to be confirmed'}
                </DetailRow>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Button variant="green" href={waHref} icon="whatsapp">
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    href={clinic.mapsUrl}
                    icon="arrowRight"
                    ariaLabel="Get directions on Google Maps — opens in a new tab"
                  >
                    Get directions
                  </Button>
                </div>

                <div
                  style={{
                    marginTop: 4,
                    paddingTop: 16,
                    borderTop: `1px solid ${C.border}`,
                    fontSize: 13.5,
                    color: C.muted,
                    lineHeight: 1.55,
                  }}
                >
                  <strong style={{ color: C.ink }}>Walk-ins</strong> welcome subject to
                  availability, but appointments always take priority.
                </div>
              </aside>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Full-width map */}
      <section style={{ background: C.white }}>
        <div className="drcps-container" style={{ padding: '24px var(--pad-x) 72px' }}>
          <FadeIn>
            <div
              className="drcps-map"
              style={{
                borderRadius: 16,
                border: `1px solid ${C.border}`,
                background: C.surface,
              }}
            >
              <iframe
                title={`Map showing ${clinic.name} in Podanur, Coimbatore`}
                src={MAP_EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
