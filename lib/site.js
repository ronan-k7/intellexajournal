// Single source of truth for brand + domain. Change here, changes everywhere.
export const SITE_NAME = 'Intellexa Journal';
export const SITE_URL = 'https://www.intellexajournal.com';
export const SITE_TAGLINE = 'Independent local reporting';
export const SITE_DESCRIPTION =
  'Intellexa Journal delivers trusted independent journalism covering world news, U.S., business, finance, politics, health, technology and investigations.';
export const SITE_LOCALE = 'en_US';
export const DEFAULT_OG_IMAGE = '/og-default.png';
export const TWITTER_HANDLE = ''; // e.g. '@intellexajournal' — fill when account exists

export const absoluteUrl = (path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p === '/' ? SITE_URL : `${SITE_URL}${p}`;
};
