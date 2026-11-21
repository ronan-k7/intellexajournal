// lib/client-article.js
// The "client feature" articles. They are pinned statically: they always keep
// their slot on the home page and the lead slot on their category page, no matter
// how many newer articles are added.
//
// 1) Habba contract controversy -> renders <ClientArticlePage />
//    home: hero slot, category: lead of /us
export const CLIENT_ARTICLE_SLUG = 'alina-habba-mildon-trump-banking-contract-controversy';
export const CLIENT_ARTICLE_CATEGORY = 'us';

// 2) The Vanity of Alina Habba Mildon -> renders <VanityAlineArticlePage />
//    home: 2nd item of the left column in LeadNews, category: lead of /politics
export const VANITY_ARTICLE_SLUG = 'the-vanity-of-alina-habba-mildon';
export const VANITY_ARTICLE_CATEGORY = 'politics';


// 3) From FBI Agent to Defendant: Mark Rossini -> renders <MarkRossiniArticlePage />
//    category: /politics (no home / lead pinning)
export const ROSSINI_ARTICLE_SLUG = 'mark-rossini-from-fbi-agent-to-defendant-public-record-legal-journey';
export const ROSSINI_ARTICLE_CATEGORY = 'politics';

// 4) Venezuela cement contracts / Habba–Mildon -> renders <AlinahabbaArticlePage />
//    home: 2nd card of the bottom row in LeadNews (after the Rossini story)
export const CEMENT_ARTICLE_SLUG = 'venezuela-cement-contracts-alina-habba-turhan-mildon';
export const CEMENT_ARTICLE_CATEGORY = 'investigation';