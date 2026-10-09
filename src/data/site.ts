// Site-wide settings.
//
// The technical ones are set here. Everything a person might want to reword or swap lives in the JSON
// files beside this one (site.json, pages/*.json, homes/*.json), which the Pages CMS editor reads and writes.
import content from './site.json';

export const site = {
  name: 'AweVida',
  url: 'https://awevida.com',
  // Formspree form that receives Contact page messages (the part after /f/ in its endpoint).
  formspreeId: 'mjygrbab',
  ...content,
};

// If a menu name is ever left blank in the editor, the usual one is used.
export const nav = [
  { label: content.menu?.home || 'Home', href: '/' },
  { label: content.menu?.about || 'About Gabi', href: '/about/' },
  { label: content.menu?.portfolio || 'Portfolio', href: '/portfolio/' },
  { label: content.menu?.contact || 'Contact', href: '/contact/' },
];
