// Site-wide settings. Anything left as an empty string is simply left off the pages.

export const site = {
  name: 'AweVida',
  url: 'https://awevida.com',
  description:
    'Fifteen years ago, as a side business and to fulfill an incurable itch for expressing her creativity through exciting house projects, Gabi got into residential real estate.',

  // Formspree: create a form at formspree.io and paste its ID here (the part after /f/ in the endpoint).
  formspreeId: 'mjygrbab',

  // Contact page details. Fill these in to show them; empty ones are hidden.
  email: '',
  basedIn: '',

  // The "Follow" button in the footer and the Follow link on the Contact page (Instagram).
  follow: { label: 'Follow @AWEVIDA_COMMUNITY', handle: '@AWEVIDA_COMMUNITY', href: 'https://www.instagram.com/awevida_community/' },

  // Footer social links (shown on the home page). Links with an empty href are hidden.
  socialLinks: [
    { label: 'Instagram', href: 'https://www.instagram.com/awevida_community/' },
    { label: 'Facebook', href: 'https://www.facebook.com/awevidatoday' },
    { label: 'LinkedIn', href: '' },
    { label: 'YouTube', href: '' },
  ],

  // Extra text after "© <year> AweVida." in the footer, if you want any.
  legalNote: '',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About Gabi', href: '/about/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Contact', href: '/contact/' },
];

// The scrolling band of rooms at the bottom of every page.
export const strip = [
  { id: '9066e961be0a02ffb6133dc9e1d7a040', alt: 'Living room with a stone fireplace and vaulted plank ceiling' },
  { id: '92b0300f7ea86394e81e78cb5db333a8', alt: 'Screened porch with a white sectional under live oaks' },
  { id: '0486becc7716a7794ca841c224fb00ac', alt: 'Porch with two rope-hung bed swings' },
  { id: '5b8a6163c3d1008b2ee1defd344c55b0', alt: 'Bunk room with a playhouse counter and stools' },
  { id: '2bf2ca2387d04f7835b7a3e20a46bdf5', alt: 'Sunroom with a white sectional and woven chairs' },
  { id: 'bb4dc000ec39d2f3107888a67d54a8ac', alt: 'Living room with a round straw mirror and reclaimed wood table' },
  { id: 'e9d6dc319c32379b0bbbd2f4f0e68b1b', alt: 'Living room with a marble fireplace and coffered ceiling' },
  { id: 'd413c6ed41c0e7cb40aecaf140609688', alt: 'Bedroom with striped bedding and a reclaimed wood bench' },
];
