import StaticPage, { staticMetadata, MailLink } from '@/components/StaticPage';
import { EMAILS } from '@/lib/static-pages.mjs';
import { SITE_NAME, absoluteUrl } from '@/lib/site';

export const metadata = staticMetadata('/contact');

const CONTACTS = [
  { k: 'tips', title: 'Story tips', text: 'Have information the public should know? Send it to our newsroom.', type: 'news tips' },
  { k: 'corrections', title: 'Corrections', text: 'Spotted an error? Tell us the headline and what needs fixing.', type: 'corrections' },
  { k: 'editorial', title: 'Editorial', text: 'Questions for editors, right-of-reply requests and feedback.', type: 'editorial' },
  { k: 'advertising', title: 'Advertising', text: 'Media kits, sponsorships and partnerships.', type: 'advertising' },
  { k: 'careers', title: 'Careers', text: 'Introductions, freelance pitches and applications.', type: 'careers' },
  { k: 'privacy', title: 'Privacy', text: 'Data access, deletion and privacy questions.', type: 'privacy' },
];

export default function Page() {
  return (
    <StaticPage
      path="/contact"
      wide
      jsonLd={{
        mainEntity: {
          '@type': 'NewsMediaOrganization',
          '@id': `${absoluteUrl('/')}#organization`,
          name: SITE_NAME,
          email: EMAILS.general,
          contactPoint: CONTACTS.map((c) => ({
            '@type': 'ContactPoint',
            contactType: c.type,
            email: EMAILS[c.k],
            availableLanguage: 'English',
          })),
        },
      }}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CONTACTS.map((c) => (
          <div key={c.k} className="border border-[#e2e2df] bg-[#f7f7f5] p-5">
            <h2 className="m-0 font-serif text-[20px] font-black">{c.title}</h2>
            <p className="my-2 font-serif text-[15px] leading-[1.5] text-[#555]">{c.text}</p>
            <MailLink k={c.k} />
          </div>
        ))}
      </div>
      <p className="mt-8 font-serif text-[15px] text-[#555]">General enquiries: <MailLink k="general" /></p>
    </StaticPage>
  );
}
