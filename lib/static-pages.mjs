// Content + SEO data for every footer page. Used by the Next.js routes AND by
// scripts/generate-seo-files.mjs (sitemap + feed), so keep this file plain ESM
// with no '@/' imports.
export const LAST_UPDATED = '2026-10-31';
export const LAST_UPDATED_LABEL = 'October 31, 2026';

export const EMAILS = {
  general: 'contact@intellexajournal.com',
  editorial: 'editorial@intellexajournal.com',
  corrections: 'corrections@intellexajournal.com',
  tips: 'tips@intellexajournal.com',
  advertising: 'advertising@intellexajournal.com',
  careers: 'careers@intellexajournal.com',
  privacy: 'privacy@intellexajournal.com',
  legal: 'legal@intellexajournal.com',
};

export const PAGES = {
  '/about': {
    title: 'About Us',
    metaTitle: 'About Intellexa Journal | Independent Local Reporting',
    metaDescription: 'Learn who we are, what we cover and the standards behind Intellexa Journal, an independent news publication covering world, U.S., business, finance, politics, health and technology.',
    schema: 'AboutPage',
    eyebrow: 'About',
    intro: 'Intellexa Journal is an independent news publication built on one idea: readers deserve clear, accurate and accountable reporting, from local communities to the global stage.',
    sections: [
      { heading: 'Who we are', paragraphs: [
        'We are a digital-first newsroom publishing original reporting, analysis and investigations across eight desks: World, U.S., Business, Finance, Politics, Health, Technology and Investigation.',
        'Every story is published under the Intellexa Journal Staff byline and stands behind our editorial standards.' ] },
      { heading: 'What we believe', list: [
        'Accuracy first. We would rather be right than first.',
        'Independence. Our coverage is not shaped by advertisers, donors or political interests.',
        'Transparency. We explain how we know what we report and correct errors openly.',
        'Public service. We focus on stories that affect health, money, rights and daily life.' ] },
      { heading: 'How we work', paragraphs: [
        'Our reporting follows the standards set out in our Editorial Policy, Corrections Policy and Source Methodology. Sponsored content is always labelled and never written by the newsroom.' ],
        links: [ { label: 'Editorial Policy', href: '/policies/editorial' }, { label: 'Corrections Policy', href: '/policies/corrections' }, { label: 'Source Methodology', href: '/policies/methodology' } ] },
      { heading: 'Get in touch', paragraphs: [ 'Story tip, correction or question? Visit our contact page and we will point you to the right desk.' ],
        links: [ { label: 'Contact Us', href: '/contact' }, { label: 'Meet the team', href: '/team' } ] },
    ],
  },
  '/team': {
    title: 'Our Team',
    metaTitle: 'Our Team | Intellexa Journal Staff',
    metaDescription: 'Meet the Intellexa Journal Staff covering world affairs, U.S. news, business, finance, politics, health, technology and investigations.',
    schema: 'CollectionPage',
    eyebrow: 'Newsroom',
    intro: 'Intellexa Journal Staff is the newsroom behind every story we publish.',
    sections: [],
  },
  '/advertise': {
    title: 'Advertise With Us',
    metaTitle: 'Advertise With Intellexa Journal | Reach Engaged News Readers',
    metaDescription: 'Reach informed readers across politics, finance, health and technology. Learn about advertising and sponsored content options at Intellexa Journal.',
    schema: 'WebPage',
    eyebrow: 'Partnerships',
    intro: 'Put your brand in front of an engaged, news-literate audience while keeping a hard line between advertising and editorial.',
    sections: [
      { heading: 'Advertising options', list: [
        'Display advertising across the homepage, section fronts and article pages.',
        'Sponsored content clearly labelled “Sponsored” or “Advertisement”.',
        'Newsletter sponsorships.',
        'Custom partnerships for events and special reports.' ] },
      { heading: 'Our standards', paragraphs: [
        'Advertisers have no influence over our reporting. Sponsored content is produced separately from the newsroom, labelled clearly, and never presented as news coverage. We reserve the right to decline ads that are misleading, harmful or inconsistent with our values.' ] },
      { heading: 'Request a media kit', paragraphs: [ 'Email our partnerships team with your goals, timing and budget range and we will respond within three business days.' ],
        email: 'advertising' },
    ],
  },
  '/careers': {
    title: 'Careers',
    metaTitle: 'Careers at Intellexa Journal | Join Our Newsroom',
    metaDescription: 'Explore careers and freelance opportunities at Intellexa Journal. We are always interested in reporters, editors, designers and engineers who care about accurate journalism.',
    schema: 'WebPage',
    eyebrow: 'Join us',
    intro: 'We are building a newsroom where careful reporting and good craft matter. If that sounds like you, we would like to hear from you.',
    sections: [
      { heading: 'Who we look for', list: [
        'Reporters and editors with a track record of accurate, original work.',
        'Data journalists and researchers who can verify documents and datasets.',
        'Designers, developers and product thinkers who care about readers.',
        'Freelancers with deep expertise on a beat we cover.' ] },
      { heading: 'Current openings', paragraphs: [ 'There are no open positions listed at the moment. We still welcome introductions, and we keep strong applications on file for future roles.' ] },
      { heading: 'How to apply', paragraphs: [ 'Send a short introduction, your CV and three links to your best work. Tell us which desk or role interests you.' ], email: 'careers' },
      { heading: 'Equal opportunity', paragraphs: [ 'Intellexa Journal is an equal opportunity employer. We welcome applicants of every background and do not discriminate on any protected characteristic.' ] },
    ],
  },
  '/contact': {
    title: 'Contact Us',
    metaTitle: 'Contact Intellexa Journal | Tips, Corrections and Enquiries',
    metaDescription: 'Contact the Intellexa Journal newsroom to send a story tip, request a correction, ask about advertising or reach our editors.',
    schema: 'ContactPage',
    eyebrow: 'Contact',
    intro: 'Choose the right inbox below so your message reaches the right people faster.',
    sections: [],
  },
  '/newsletters': {
    title: 'Newsletters',
    metaTitle: 'Newsletters | Get Intellexa Journal Headlines by Email',
    metaDescription: 'Subscribe to Intellexa Journal newsletters for the latest headlines, in-depth analysis and exclusive updates delivered to your inbox.',
    schema: 'WebPage',
    eyebrow: 'Stay informed',
    intro: 'The stories that shape our world, delivered to your inbox. Free to join and easy to leave.',
    sections: [
      { heading: 'What you will receive', list: [
        'A concise daily briefing of the top stories across all desks.',
        'Deep dives and investigations when they publish.',
        'Occasional editor’s notes explaining how we reported a story.' ] },
      { heading: 'Your privacy', paragraphs: [ 'We only use your email address to send the newsletters you choose. You can unsubscribe in one click at any time. Read our Privacy Policy for details.' ],
        links: [ { label: 'Privacy Policy', href: '/policies/privacy' } ] },
    ],
  },
  '/policies': {
    title: 'Policies',
    metaTitle: 'Policies | Editorial, Privacy, Terms and Standards at Intellexa Journal',
    metaDescription: 'Read every Intellexa Journal policy in one place: editorial standards, corrections, privacy, terms, cookies, ownership and funding, right of reply and source methodology.',
    schema: 'CollectionPage',
    eyebrow: 'Policies',
    intro: 'Our standards and the rules that govern this site, in one place.',
    sections: [],
  },
  '/policies/editorial': {
    title: 'Editorial Policy',
    metaTitle: 'Editorial Policy | Intellexa Journal Standards and Independence',
    metaDescription: 'The editorial standards that guide Intellexa Journal reporting: accuracy, independence, fairness, sourcing, conflicts of interest and the separation of advertising from news.',
    schema: 'WebPage', parent: 'policies', eyebrow: 'Policy',
    intro: 'These principles guide every story we publish.',
    sections: [
      { heading: 'Accuracy and verification', paragraphs: [ 'Facts in our stories are checked against primary sources wherever possible: documents, data, official records and direct accounts. Claims we cannot verify are attributed or left out.' ] },
      { heading: 'Independence', paragraphs: [ 'Editorial decisions are made by editors and reporters alone. Advertisers, sponsors, donors and subjects of coverage cannot approve, change or kill a story.' ] },
      { heading: 'Fairness and balance', paragraphs: [ 'We seek comment from people and organisations criticised in our reporting and give them a fair chance to respond before publication.' ] },
      { heading: 'Conflicts of interest', paragraphs: [ 'Staff must disclose financial or personal interests relevant to their coverage. Where a conflict cannot be managed, the story is reassigned.' ] },
      { heading: 'Anonymous sources', paragraphs: [ 'We use anonymous sourcing only when information is important, cannot be obtained on the record, and the source is reliable. Editors know the identity of every anonymous source.' ] },
      { heading: 'Advertising and sponsorship', paragraphs: [ 'Advertising and sponsored content are separate from the newsroom and always labelled.' ] },
      { heading: 'Use of AI tools', paragraphs: [ 'AI tools may assist with research, transcription or formatting. Published reporting is written, reviewed and approved by human editors who remain responsible for its accuracy.' ] },
    ],
  },
  '/policies/corrections': {
    title: 'Corrections Policy',
    metaTitle: 'Corrections Policy | How Intellexa Journal Fixes Errors',
    metaDescription: 'How Intellexa Journal handles mistakes: how to report an error, how quickly we respond, and how corrections and updates are labelled on our stories.',
    schema: 'WebPage', parent: 'policies', eyebrow: 'Policy',
    intro: 'When we get something wrong, we fix it quickly and say so plainly.',
    sections: [
      { heading: 'Reporting an error', paragraphs: [ 'If you believe a story contains a factual error, email our corrections desk with the headline, the passage in question and supporting evidence.' ], email: 'corrections' },
      { heading: 'What happens next', list: [
        'We acknowledge reports promptly and review them against our sources.',
        'Confirmed errors are corrected in the story as soon as possible.',
        'Significant corrections are noted at the top or bottom of the article with the date.',
        'Minor typographical fixes may be made without a note.' ] },
      { heading: 'Updates and clarifications', paragraphs: [ 'When new information materially changes a story, we add a dated update rather than silently rewriting the record.' ] },
    ],
  },
  '/policies/privacy': {
    title: 'Privacy Policy',
    metaTitle: 'Privacy Policy | How Intellexa Journal Handles Your Data',
    metaDescription: 'Learn what personal data Intellexa Journal collects, how we use and protect it, and the rights you have over your information.',
    schema: 'WebPage', parent: 'policies', eyebrow: 'Legal',
    intro: 'Your privacy matters to us. This policy explains what we collect, why, and the choices you have.',
    sections: [
      { heading: 'Information we collect', list: [
        'Information you give us: your email address when you subscribe, and anything you send us when you contact the newsroom.',
        'Usage data: pages viewed, referring site, device and browser type, and approximate location derived from your IP address.',
        'Cookie data: see our Cookie Policy.' ] },
      { heading: 'How we use information', list: [
        'To deliver the site and the newsletters you request.',
        'To understand how readers use the site and improve it.',
        'To keep the site secure and prevent abuse.',
        'To meet legal obligations.' ] },
      { heading: 'Sharing', paragraphs: [ 'We do not sell your personal information. We share data only with service providers who help us run the site (such as hosting, analytics and email delivery) under confidentiality obligations, or when required by law.' ] },
      { heading: 'Retention and security', paragraphs: [ 'We keep personal data only as long as needed for the purposes above and use reasonable technical and organisational safeguards to protect it.' ] },
      { heading: 'Your rights', paragraphs: [ 'Depending on where you live, you may have the right to access, correct, delete or export your data, and to object to or restrict certain processing. To exercise these rights, contact us at the address below.' ], email: 'privacy' },
      { heading: 'Children', paragraphs: [ 'Our services are not directed to children under 13 and we do not knowingly collect their information.' ] },
      { heading: 'Changes', paragraphs: [ 'We may update this policy. The date at the top shows when it last changed.' ] },
    ],
  },
  '/policies/terms': {
    title: 'Terms & Conditions',
    metaTitle: 'Terms & Conditions | Using Intellexa Journal',
    metaDescription: 'The terms that apply when you read or use Intellexa Journal, including permitted use, intellectual property, disclaimers and limits of liability.',
    schema: 'WebPage', parent: 'policies', eyebrow: 'Legal',
    intro: 'By accessing Intellexa Journal you agree to these terms. If you do not agree, please do not use the site.',
    sections: [
      { heading: 'Use of the site', paragraphs: [ 'You may read and share links to our content for personal, non-commercial use. You agree not to misuse the site, attempt to disrupt it, or scrape it in a way that harms its performance.' ] },
      { heading: 'Intellectual property', paragraphs: [ 'Articles, images, graphics and the Intellexa Journal name and logo are owned by us or our licensors and protected by copyright and trademark law. You may quote short excerpts with attribution and a link back to the original. Any other reproduction requires written permission.' ] },
      { heading: 'Third-party links', paragraphs: [ 'We link to external sites we do not control and are not responsible for their content or practices.' ] },
      { heading: 'Disclaimer', paragraphs: [ 'Content is provided for general information and is not legal, financial or medical advice. We work hard to be accurate, but the site is provided “as is” without warranties of any kind.' ] },
      { heading: 'Limitation of liability', paragraphs: [ 'To the fullest extent permitted by law, Intellexa Journal is not liable for indirect or consequential losses arising from your use of the site.' ] },
      { heading: 'Changes and contact', paragraphs: [ 'We may update these terms from time to time. Continued use means you accept the updated terms. Questions can be sent to our legal contact.' ], email: 'legal' },
    ],
  },
  '/policies/cookies': {
    title: 'Cookie Policy',
    metaTitle: 'Cookie Policy | How Intellexa Journal Uses Cookies',
    metaDescription: 'What cookies and similar technologies Intellexa Journal uses, why we use them and how you can control or disable them in your browser.',
    schema: 'WebPage', parent: 'policies', eyebrow: 'Legal',
    intro: 'Cookies are small text files stored on your device. This page explains how we use them.',
    sections: [
      { heading: 'Types of cookies', list: [
        'Essential: needed for the site to work and stay secure.',
        'Analytics: help us understand how readers use the site so we can improve it.',
        'Advertising: used by ad partners to show relevant, measured ads where enabled.' ] },
      { heading: 'Managing cookies', paragraphs: [ 'You can block or delete cookies in your browser settings. Blocking some cookies may affect how parts of the site work.' ] },
      { heading: 'Third parties', paragraphs: [ 'Some cookies are set by third-party services we use, such as analytics or advertising providers. Those providers have their own privacy policies.' ] },
      { heading: 'Questions', paragraphs: [ 'For questions about cookies, see our Privacy Policy or contact us.' ], links: [ { label: 'Privacy Policy', href: '/policies/privacy' } ] },
    ],
  },
  '/policies/ownership': {
    title: 'Ownership & Funding',
    metaTitle: 'Ownership & Funding | Who Backs Intellexa Journal',
    metaDescription: 'How Intellexa Journal is owned and funded, and the safeguards that protect editorial independence from advertisers, sponsors and owners.',
    schema: 'WebPage', parent: 'policies', eyebrow: 'Transparency',
    intro: 'Readers should know who is behind the news they read.',
    sections: [
      { heading: 'Ownership', paragraphs: [ 'Intellexa Journal is an independently owned and operated publication. It is not owned by a political party, government or campaign.' ] },
      { heading: 'How we are funded', list: [
        'Display advertising.',
        'Sponsored content, always labelled.',
        'Newsletter sponsorships and reader subscriptions where offered.' ] },
      { heading: 'Editorial firewall', paragraphs: [ 'Funding sources have no say over what we cover or how. Commercial teams do not direct editorial staff, and editors do not sell advertising.' ] },
      { heading: 'Questions', paragraphs: [ 'If you have questions about our funding or ownership, we will answer them.' ], email: 'general' },
    ],
  },
  '/policies/right-of-reply': {
    title: 'Right of Reply',
    metaTitle: 'Right of Reply Policy | Respond to Intellexa Journal Reporting',
    metaDescription: 'How individuals and organisations can respond to Intellexa Journal reporting, and how we handle requests for comment, clarification and published responses.',
    schema: 'WebPage', parent: 'policies', eyebrow: 'Policy',
    intro: 'Anyone named in our reporting has the right to respond.',
    sections: [
      { heading: 'Before publication', paragraphs: [ 'When a story contains serious allegations, we contact those concerned and give them a reasonable chance to respond before we publish.' ] },
      { heading: 'After publication', paragraphs: [ 'If you believe a story is inaccurate or unfair, email us with your response and any supporting evidence. We will review it, and where warranted publish a correction, clarification or a fair summary of your reply.' ], email: 'editorial' },
      { heading: 'What we cannot do', paragraphs: [ 'We do not remove accurate reporting because it is unwelcome, and we do not give advertisers or sponsors special treatment.' ] },
    ],
  },
  '/policies/methodology': {
    title: 'Source Methodology',
    metaTitle: 'Source Methodology | How Intellexa Journal Finds and Verifies Facts',
    metaDescription: 'How Intellexa Journal sources, verifies and attributes information, including primary documents, official data, expert interviews and how we treat uncertain claims.',
    schema: 'WebPage', parent: 'policies', eyebrow: 'Standards',
    intro: 'How we find, check and attribute what we report.',
    sections: [
      { heading: 'Source hierarchy', list: [
        'Primary sources first: official records, filings, datasets, court documents and direct statements.',
        'Named experts and eyewitnesses next.',
        'Secondary reports only when independently confirmed or clearly attributed.' ] },
      { heading: 'Verification', paragraphs: [ 'Key claims are confirmed with at least one reliable source before publication. Numbers are checked against the original dataset and the date of the data is stated.' ] },
      { heading: 'Attribution', paragraphs: [ 'We say where information came from. When we rely on another outlet’s original reporting, we credit and link to it.' ] },
      { heading: 'Uncertainty', paragraphs: [ 'When facts are disputed or developing, we say so and update the story as more is confirmed.' ] },
      { heading: 'Images', paragraphs: [ 'Images are credited or captioned, and we do not alter photographs in ways that mislead.' ] },
    ],
  },
};

export const POLICY_PATHS = Object.keys(PAGES).filter((p) => p.startsWith('/policies/'));
export const STATIC_PATHS = Object.keys(PAGES);
