// All site copy lives here as typed data. Components consume, never hardcode.
// Source: DR-CPS-Clinic-Website-Content.md

export const clinic = {
  name: 'DR.CPS Speciality & Diabetic Clinic',
  shortName: 'DR.CPS',
  tagline: 'Comprehensive Care for Diabetes, Heart, Kidney & Internal Medicine',
  location: 'Podanur, Coimbatore',
  address:
    'No. 154, SIFA Tower, Karuparayan Kovil Bus Stop, Podanur Main Road, Kurichi Pirivu, Coimbatore, Tamil Nadu — 641023',
  mapsUrl: 'https://maps.app.goo.gl/z6f6vA3YHe4HdBQeA',
  phone: '+91 98652 44531',
  whatsapp: '919865244531',           // E.164 digits only — safest for wa.me/ links worldwide
  email: 'drcpsclinic@gmail.com',
  hours: 'Evenings only · 5:30 PM to 9:00 PM (working days)',
};

// Sitemap after Tier 2 merges (Jul 2026):
//   - /doctor            → folded into /about
//   - /book-appointment  → folded into /contact
//   - /patient-education → folded into /resources
//   - /faq               → folded into /resources
//   - /testimonials      → home section only (no dedicated page)
export const nav = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Services',   to: '/services' },
  { label: 'Facilities', to: '/facilities' },
  { label: 'Gallery',    to: '/gallery' },
  { label: 'Resources',  to: '/resources' },
  { label: 'Contact',    to: '/contact' },
];

export const hero = {
  headline: 'Comprehensive Diabetes & Internal Medicine Care',
  subheadline: 'Evidence-Based Healthcare for Every Stage of Life',
  supporting:
    'DR.CPS Speciality & Diabetic Clinic, Podanur — trusted physician and diabetologist care for diabetes, heart, kidney, and lifestyle-related conditions.',
};

export const stats = [
  { value: '5,000+', label: 'Patients treated' },
  { value: '10+',    label: 'Years clinical experience' },
  { value: 'Specialist', label: 'Diabetes & lifestyle disease' },
  { value: 'Evidence-based', label: 'Medical care' },
];

export const doctor = {
  name: 'Dr. S. S. Chakravarthi',
  initials: 'SSC',
  degrees: 'MBBS, MD (General Medicine)',
  title: 'Consultant Physician & Diabetologist',
  credentials: [
    'MBBS',
    'MD – General Medicine',
    'CPCDM fellowship in diabetology',
    'Certified in obesity prevention & management (PHFI)',
    'BLS certified',
    'ACLS certified',
  ],
  academic:
    'Assistant Professor, Department of General Medicine — active member of the academic faculty involved in undergraduate medical education.',
  interests: [
    'Cardio-metabolic medicine',
    'Diabetes mellitus (Type 1, Type 2, gestational)',
    'Obesity & weight management',
    'Hypertension',
    'Thyroid disorders',
    'Preventive healthcare',
  ],
  quote:
    'I believe in evidence-based medicine, ethical practice, patient education, and long-term partnerships to help individuals lead healthier lives.',
  homepageIntro:
    'With a CPCDM fellowship in diabetology, certification in obesity prevention and management (PHFI), and academic experience as Assistant Professor of General Medicine, Dr. Chakravarthi brings together clinical depth and teaching-grade rigour to every consultation. His special interests include cardio-metabolic medicine, diabetes, obesity, hypertension, thyroid disorders, and preventive healthcare.',
};

// Homepage featured services (asymmetric 2-col: index 0 primary/blue, index 1 secondary/white)
export const featuredServices = [
  {
    icon: 'droplet',
    title: 'Diabetes Clinic',
    description:
      'Structured, long-term care for Type 1, Type 2, and gestational diabetes — HbA1c testing, foot exams, neuropathy screening, and complication monitoring under one roof.',
    href: '/services/diabetes-clinic',
  },
  {
    icon: 'heartbeat',
    title: 'Cardio-Metabolic Care',
    description:
      'Connected management of diabetes, hypertension, obesity, and thyroid — the whole-person approach that catches complications early.',
    href: '/services/general-physician',
  },
];

// Homepage 8-card services grid preview
export const servicesPreview = [
  { icon: 'droplet',      title: 'Diabetes management' },
  { icon: 'heartbeat',    title: 'Hypertension care' },
  { icon: 'scale',        title: 'Weight loss & obesity' },
  { icon: 'activity',     title: 'Thyroid disorders' },
  { icon: 'heartbeat',    title: 'Heart disease risk assessment' },
  { icon: 'clipboard',    title: 'Preventive health check-ups' },
  { icon: 'stethoscope',  title: 'General physician consultation' },
  { icon: 'message',      title: 'Second opinion consultation' },
];

// Full services list (Services overview page)
export const services = [
  { title: 'Diabetes management',
    description: 'Complete care for Type 1, Type 2, and gestational diabetes — from initial diagnosis to long-term blood sugar control, complication screening, and lifestyle guidance.' },
  { title: 'Hypertension care',
    description: 'Accurate blood pressure diagnosis and management, with medication review and lifestyle correction to reduce long-term cardiovascular risk.' },
  { title: 'Thyroid disorders',
    description: 'Diagnosis and treatment of both hypothyroidism and hyperthyroidism, with regular monitoring to keep hormone levels stable.' },
  { title: 'Obesity & weight management',
    description: 'Medically supervised, sustainable weight loss programs addressing the root metabolic causes of weight gain — not just calorie counting.' },
  { title: 'Heart disease risk assessment',
    description: 'Early identification of cardiovascular risk factors in diabetic and pre-diabetic patients, who face significantly elevated heart disease risk.' },
  { title: 'Kidney disease screening',
    description: 'Routine and targeted screening for diabetic nephropathy and chronic kidney disease, catching damage before symptoms appear.' },
  { title: 'Liver disease evaluation',
    description: 'Assessment and management of fatty liver disease and other liver conditions commonly linked to metabolic syndrome.' },
  { title: 'Infectious diseases',
    description: 'Diagnosis and treatment of common infectious illnesses, with careful attention to how they interact with existing chronic conditions.' },
  { title: 'Fever evaluation',
    description: 'Systematic evaluation of fever to identify the underlying cause quickly and accurately, avoiding both under- and over-treatment.' },
  { title: 'Respiratory disorders',
    description: 'Management of asthma, COPD, and other respiratory conditions, including on-site nebulization when needed.' },
  { title: 'Gastrointestinal disorders',
    description: 'Care for gastritis, peptic ulcer disease, GERD, and other digestive concerns affecting day-to-day comfort and nutrition.' },
  { title: 'Anaemia evaluation',
    description: 'Investigation of fatigue and weakness to identify and correct underlying anaemia and related nutritional deficiencies.' },
  { title: 'Preventive health check-ups',
    description: 'Structured screening packages designed to catch silent conditions — diabetes, hypertension, kidney disease — before they become symptomatic.' },
  { title: 'Senior citizen health care',
    description: 'Age-appropriate, patient and unhurried consultations for the unique health needs of older adults.' },
  { title: "Women's internal medicine",
    description: "Attentive care for women's general health concerns across all life stages, including hormonal and metabolic conditions." },
  { title: 'Lifestyle disease management',
    description: 'Coordinated, long-term management of diabetes, hypertension, obesity, and related conditions that stem from modern lifestyle patterns.' },
  { title: 'General physician consultation',
    description: 'Your first point of contact for any health concern — accurate diagnosis, clear explanation, and the right next step.' },
  { title: 'Second opinion consultation',
    description: "A fresh, honest clinical review of an existing diagnosis or treatment plan, with no pressure to simply agree with what's already been prescribed." },
];

export const whyChoose = [
  { title: 'Evidence-based treatment',
    description: 'Every recommendation grounded in current medical guidelines, not guesswork.' },
  { title: 'Personalised care',
    description: 'Treatment plans built around your history, lifestyle, and goals.' },
  { title: 'Experienced consultant physician',
    description: 'MD-qualified, fellowship-trained in diabetology, with academic teaching experience.' },
  { title: 'Affordable consultation',
    description: 'Quality specialist care without unnecessary cost.' },
  { title: 'Minimal waiting time',
    description: 'Your time matters; appointments are managed to reduce delays.' },
  { title: 'Comprehensive diabetes care',
    description: 'From diagnosis to foot care to long-term monitoring, under one roof.' },
  { title: 'Modern diagnostic facilities',
    description: 'ECG, blood sugar, day-care IV fluids, nebulization, and more — on-site.' },
  { title: 'Ethical medical practice',
    description: 'Honest advice, no unnecessary tests or procedures.' },
];

export const facilities = [
  { icon: 'testpipe',    title: 'Blood sample collection centre', description: 'On-site collection; samples processed through our partner laboratory.' },
  { icon: 'droplet',     title: 'Blood sugar testing',        description: 'Immediate, point-of-care glucose testing during your visit.' },
  { icon: 'heartbeat',   title: 'ECG',                        description: 'On-site electrocardiogram for heart health screening.' },
  { icon: 'lungs',       title: 'Nebulization',               description: 'On-site respiratory treatment for asthma and COPD flare-ups.' },
  { icon: 'activity',    title: 'Blood pressure monitoring',  description: 'Accurate, routine BP checks at every visit.' },
  { icon: 'shoe',        title: 'Diabetic foot examination',  description: 'Routine screening for early nerve and circulation damage.' },
  { icon: 'clipboard',   title: 'Diet charting',              description: 'Personalised meal plans tuned to Tamil Nadu food habits and your daily routine.' },
  { icon: 'droplet',     title: 'Day-care IV fluids',         description: 'Short-stay IV rehydration and medication for adults, under clinical supervision.' },
];

export const journey = [
  { n: 1, label: 'Consult' },
  { n: 2, label: 'Investigate' },
  { n: 3, label: 'Diagnose' },
  { n: 4, label: 'Treat' },
  { n: 5, label: 'Follow up' },
];

export const googleReviews = {
  rating: 4.9,
  count: 59,
  url: 'https://maps.app.goo.gl/z6f6vA3YHe4HdBQeA',
};

export const testimonials = [
  {
    quote:
      "Hands down the best in business in Coimbatore. Among many doctors — especially diabetologists and big corporates who are mainly focussed on making money — he's one of the few who is still with a service mindset and approachable character.",
    name: 'Mohamed Siyadh',
    date: '2 months ago',
    rating: 5,
    featured: true,
    source: 'Google',
  },
  {
    quote:
      'The doctor is very kind hearted. He speaks very kindly with patience. My sugar level was 450, within 1 month now I got it down to 270.',
    name: 'Rumaisha',
    date: '6 months ago',
    rating: 5,
    source: 'Google',
  },
  {
    quote:
      'An excellent doctor who listens carefully, explains clearly, and truly cares for patients. I had a very positive experience and highly recommend.',
    name: 'Sumaiya Abdulrahman',
    date: '6 months ago',
    rating: 5,
    source: 'Google',
  },
  {
    quote:
      'Very good. Health improved a lot after my visit. Doctor is very friendly and approachable. Staff also very good. Highly recommended.',
    name: 'Kalaivani Saravanan',
    date: '4 months ago',
    rating: 5,
    source: 'Google',
  },
  {
    quote:
      'The hospital provided excellent care with compassionate staff and clean facilities. The doctors were attentive and explained everything clearly.',
    name: 'Mohammed Safir',
    date: 'a year ago',
    rating: 5,
    source: 'Google',
  },
  {
    quote:
      'Thanks doctor for handling patients with care — my mom is better than before. I strongly recommend him.',
    name: 'Pravin Kumar',
    date: 'a year ago',
    rating: 5,
    source: 'Google',
  },
  {
    quote:
      'Very well caring doctor. Affordable fee. Good staff.',
    name: 'Shiva Kumar',
    date: '6 months ago',
    rating: 5,
    source: 'Google',
  },
  {
    quote:
      'My husband had been suffering from Rheumatoid Arthritis for the past 6 years. We consulted many doctors and tried several treatments, but nothing gave him relief. We even underwent treatment in Andhra, but that too did not help.',
    name: 'Renuga',
    date: 'a month ago',
    rating: 4,
    source: 'Google',
    truncated: true,
  },
  {
    quote:
      'I have been searching for the best diabetic doctor. Then I came across DR.CPS Speciality and Diabetic Clinic. I must say I was highly impressed with the level of care I received. The prescribed treatment was so effective.',
    name: 'Devi',
    date: '9 months ago',
    rating: 5,
    source: 'Google',
    truncated: true,
  },
  {
    quote:
      'I recently visited Dr. Chakravarthi for a cold, and I must say I was highly impressed with the level of care I received. Dr. Chakravarthi was not only knowledgeable but also extremely attentive and patient. They took the time to thoroughly explain everything.',
    name: 'Sri Balaji R',
    date: '2 years ago',
    rating: 5,
    source: 'Google',
    truncated: true,
  },
];

export const faqs = [
  { q: 'What should I bring to my first consultation?',
    a: 'Please bring any previous medical records, current medications, and recent lab reports if available. This helps Dr. Chakravarthi build an accurate picture of your health history from the very first visit.' },
  { q: 'Do you treat both new and existing diabetic patients?',
    a: 'Yes. We see newly diagnosed patients who need a clear treatment plan, as well as long-term diabetics whose management may need adjustment or a fresh second opinion.' },
  { q: 'Is HbA1c testing available at the clinic?',
    a: 'Yes. Routine blood sugar is checked on-site through a point-of-care device during your consultation. HbA1c and other lab tests are handled through our on-site blood sample collection centre — samples are processed at our partner laboratory and reports shared with you directly.' },
  { q: 'Do you have an in-house pharmacy?',
    a: 'Yes. Prescribed medications are available directly at the clinic for your convenience.' },
  { q: 'How often should a diabetic patient have a check-up?',
    a: 'This depends on how well-controlled your condition is, but most diabetic patients benefit from review every 3 months, with annual screening for complications like foot, eye, and kidney health.' },
  { q: "Can I get a second opinion if I'm already being treated elsewhere?",
    a: "Absolutely. A second opinion consultation is one of our core services — we'll review your current treatment honestly and recommend next steps." },
  { q: 'Do you treat conditions other than diabetes?',
    a: 'Yes. As a general physician and consultant, Dr. Chakravarthi treats a wide range of conditions including hypertension, thyroid disorders, respiratory illness, gastrointestinal issues, and more.' },
  { q: 'Is the clinic suitable for senior citizens?',
    a: 'Yes, we offer a dedicated, patient and unhurried approach for senior citizen consultations, with attention to the specific needs of age-related conditions.' },
  { q: 'How do I book an appointment?',
    a: 'You can book online through our website, call the clinic directly, or message us on WhatsApp.' },
  { q: 'Do you offer preventive health check-up packages?',
    a: 'Yes, we offer structured preventive health packages designed for early detection of diabetes, hypertension, and related conditions — recommended for anyone over 35 or with a family history of these conditions.' },
];

export const patientEducation = [
  { title: 'Diabetes',                  body: 'A condition where the body cannot properly regulate blood sugar, either due to insufficient insulin (Type 1) or insulin resistance (Type 2). Long-term, uncontrolled diabetes can damage the eyes, kidneys, nerves, and heart — which is why regular monitoring matters as much as medication.' },
  { title: 'High blood pressure',       body: 'Often called the "silent" condition because it rarely causes symptoms until it has already affected the heart, kidneys, or brain. Regular checks, even when you feel fine, are essential.' },
  { title: 'Cholesterol disorders',     body: 'Imbalanced cholesterol levels quietly increase heart disease risk over years. Diet, exercise, and medication (when needed) work together to bring levels back to a healthy range.' },
  { title: 'Thyroid problems',          body: 'An underactive or overactive thyroid can affect weight, energy, mood, and heart rate. A simple blood test and consistent monitoring usually keep it well controlled.' },
  { title: 'Fever & viral illness',     body: 'Most fevers are short-lived viral illnesses, but persistent or recurring fever needs proper evaluation to rule out other causes.' },
  { title: 'Asthma & COPD',             body: 'Chronic respiratory conditions that benefit enormously from a structured treatment plan and, when needed, nebulization support.' },
  { title: 'Tuberculosis',              body: 'A serious but fully treatable infectious disease when diagnosed early and treated with a complete medication course.' },
  { title: 'Fatty liver',               body: 'Increasingly common, often linked to obesity and diabetes. Usually reversible with early lifestyle intervention.' },
  { title: 'Gastritis, ulcer & GERD',   body: 'Digestive conditions causing discomfort, often manageable with the right combination of medication and dietary change.' },
  { title: 'Chronic kidney disease',    body: 'Frequently a silent complication of long-term diabetes or hypertension; early screening is the best protection.' },
  { title: 'Urinary infections',        body: 'Common, uncomfortable, and easily treated when caught early — but recurring infections need closer evaluation.' },
  { title: 'Anaemia & deficiencies',    body: 'A frequent, often-missed cause of persistent tiredness, easily identified through simple blood tests.' },
  { title: 'Obesity & metabolic syndrome', body: 'A cluster of related risk factors — excess weight, high blood pressure, abnormal cholesterol, and elevated blood sugar — that together significantly raise long-term health risk.' },
  { title: 'Gout, arthritis, osteoporosis', body: 'Joint and bone conditions that affect mobility and quality of life, manageable with the right diagnosis and ongoing care.' },
  { title: 'Allergies & respiratory infections', body: 'Common conditions that, when recurrent, often point to an underlying pattern worth investigating.' },
];

export const values = [
  { title: 'Integrity',           description: 'Honest diagnosis and treatment, always.' },
  { title: 'Compassion',          description: 'Every patient treated with empathy and respect.' },
  { title: 'Excellence',          description: 'Clinical rigour backed by continuous learning.' },
  { title: 'Patient safety',      description: 'Safety as the foundation of every decision.' },
  { title: 'Ethical practice',    description: 'No unnecessary tests, procedures, or medication.' },
  { title: 'Continuous learning', description: 'Staying current with evolving medical evidence.' },
  { title: 'Respect',             description: "For every patient's time, dignity, and concerns." },
  { title: 'Transparency',        description: 'Clear communication about diagnosis, cost, and treatment options.' },
];

export const about = {
  story: [
    'DR.CPS Speciality & Diabetic Clinic was founded with a clear purpose: to bring ethical, affordable, evidence-based outpatient care to Podanur and the wider Coimbatore community — care that treats the whole patient, not just a list of symptoms.',
    'We saw a gap between rushed, transactional consultations and the kind of patient-centred, long-term medical relationships that actually improve health outcomes — especially for chronic, lifestyle-driven conditions like diabetes, hypertension, and thyroid disorders, which need years of partnership, not a single prescription. This clinic exists to close that gap.',
  ],
  mission:
    'To provide compassionate, ethical, affordable, evidence-based healthcare with emphasis on prevention, early diagnosis, and long-term wellness.',
  vision:
    'To become one of the most trusted physician and diabetes care centres in Coimbatore by delivering world-class outpatient medical care.',
  difference:
    'Most clinics treat diabetes as a single condition. We treat it as part of a connected picture — your heart, your kidneys, your weight, your thyroid, and your day-to-day lifestyle all factor into how we manage your care. This cardio-metabolic, whole-person approach means fewer surprises down the line and a treatment plan that actually fits how you live.',
};

// Conditions commonly treated on the /services/general-physician page.
export const gpConditions = [
  'Fever & viral illness', 'High blood pressure', 'Cholesterol disorders',
  'Asthma & COPD', 'Gastritis, peptic ulcer & GERD', 'Urinary infections',
  'Anaemia & vitamin deficiencies', 'Allergies', 'Respiratory infections',
  'Arthritis', 'Gout', 'Osteoporosis',
];

// Diabetes clinic offerings (structured for the dedicated service page)
export const diabetesOfferings = [
  { title: 'HbA1c testing',              description: 'The gold-standard test for long-term blood sugar control, done through our on-site collection centre and partner lab.', icon: 'droplet' },
  { title: 'Diabetic foot examination',  description: 'Routine checks to catch early signs of nerve damage or poor circulation before they become serious.', icon: 'shoe' },
  { title: 'Biothesiometry',             description: 'Precise testing for diabetic nerve damage, often missed in standard check-ups.', icon: 'activity' },
  { title: 'Kidney function screening',  description: 'Regular monitoring for diabetic nephropathy, one of diabetes\u2019 most serious silent complications.', icon: 'kidney' },
  { title: 'Diet & lifestyle counselling', description: 'Practical, realistic dietary guidance tailored to Tamil Nadu food habits and your daily routine.', icon: 'clipboard' },
  { title: 'Weight loss support',        description: 'For patients whose diabetes management depends on sustainable weight reduction.', icon: 'scale' },
  { title: 'Complication management',    description: 'Coordinated care for eye, heart, kidney, and nerve complications that diabetes can cause over time.', icon: 'heartbeat' },
];

export const diabetesAudience = [
  'Newly diagnosed Type 1 or Type 2 diabetics seeking clear, structured guidance',
  'Long-term diabetics whose sugar control has become difficult to manage',
  'Pregnant women diagnosed with gestational diabetes',
  'Pre-diabetics looking to prevent progression through early intervention',
  'Patients seeking a second opinion on their current diabetes treatment',
];

// Facilities page groups (spec §8)
export const facilityGroups = [
  {
    title: 'Diagnostic & clinical facilities',
    subtitle: 'Point-of-care testing and clinical services carried out in the clinic.',
    items: facilities,
  },
  {
    title: 'Pharmacy & support services',
    subtitle: 'Everything else that keeps long-term care on track.',
    items: [
      { icon: 'pill',      title: 'In-house pharmacy',       description: 'Prescribed medication available on-site, no extra stop needed.' },
      { icon: 'clipboard', title: 'Preventive health packages', description: 'Structured screening bundles for different risk profiles.' },
      { icon: 'stethoscope', title: 'Vaccination guidance',  description: 'Age- and condition-appropriate vaccination advice.' },
      { icon: 'message',   title: 'Patient education & counselling', description: 'Practical lifestyle guidance you can actually follow.' },
      { icon: 'calendar',  title: 'Follow-up reminders',     description: 'So long-term monitoring doesn\u2019t fall through the cracks.' },
      { icon: 'clipboard', title: 'Regular health camps',    description: 'Community screening initiatives for early detection.' },
    ],
  },
];

// Gallery groups (Airbnb photo-tour inspired). Each item currently renders
// as a labelled placeholder frame; swap `src` in later without any code
// change — the frame component reads `src` first, falls back to placeholder.
//
// Aspect ratios: 'wide' = 4/3, 'portrait' = 3/4, 'square' = 1/1, 'hero' = 16/9.
export const galleryGroups = [
  {
    id: 'reception',
    title: 'Reception & waiting area',
    caption: 'The first thing you see when you walk in — clean, quiet, unhurried.',
    items: [
      { label: 'Reception desk',   aspect: 'hero',     icon: 'clipboard' },
      { label: 'Waiting area',     aspect: 'portrait', icon: 'body' },
      { label: 'Clinic signage',   aspect: 'square',   icon: 'map' },
    ],
  },
  {
    id: 'consultation',
    title: 'Consultation room',
    caption: 'Where every visit begins.',
    items: [
      { label: 'Consultation desk',      aspect: 'wide',     icon: 'stethoscope' },
      { label: 'Examination bed',        aspect: 'portrait', icon: 'body' },
      { label: 'Diagnostic instruments', aspect: 'square',   icon: 'heartbeat' },
    ],
  },
  {
    id: 'diagnostic',
    title: 'Diagnostic & clinical area',
    caption: 'ECG, blood sugar, nebulization, and day-care IV fluids — all on-site.',
    items: [
      { label: 'ECG bay',              aspect: 'wide',     icon: 'heartbeat' },
      { label: 'Blood collection',     aspect: 'portrait', icon: 'testpipe' },
      { label: 'Nebulization corner',  aspect: 'square',   icon: 'lungs' },
      { label: 'Day-care IV bay',      aspect: 'wide',     icon: 'droplet' },
    ],
  },
  {
    id: 'pharmacy',
    title: 'In-house pharmacy',
    caption: 'Prescribed medication, dispensed on-site — no extra stop.',
    items: [
      { label: 'Pharmacy counter', aspect: 'wide',   icon: 'pill' },
      { label: 'Dispensing area',  aspect: 'square', icon: 'pill' },
    ],
  },
  {
    id: 'exterior',
    title: 'Getting here',
    caption: 'SIFA Tower on Podanur Main Road, near Karuparayan Kovil bus stop.',
    items: [
      { label: 'Clinic entrance', aspect: 'hero',     icon: 'map' },
      { label: 'Street view',     aspect: 'portrait', icon: 'arrowRight' },
    ],
  },
];
