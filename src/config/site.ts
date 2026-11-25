/**
 * Coordonnées et liens de Clickers Community, centralisés ici pour être modifiés sans toucher aux composants.
 */

export const contactEmail = 'communityclickers50@gmail.com';

/** Numéro WhatsApp au format international sans + ni espaces. PUBLIC_WHATSAPP_NUMBER permet de le remplacer. */
export const whatsappNumber: string = (
  import.meta.env.PUBLIC_WHATSAPP_NUMBER || '50946894829'
).replace(/\D/g, '');

/** Numéro affiché (téléphone et WhatsApp). */
export const phoneDisplay = '+509 4689-4829';

/** Lien d'appel téléphonique. */
export const phoneHref = 'tel:+50946894829';

/** Lien wa.me avec message prérempli, ou chaîne vide si le numéro n'est pas configuré. */
export function getWhatsAppHref(message: string): string {
  return whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : '';
}

/** Lien de réservation Cal.com (compte de l'agence, validé par le client). PUBLIC_BOOKING_URL permet de le remplacer. */
export const bookingUrl: string =
  import.meta.env.PUBLIC_BOOKING_URL || 'https://cal.com/gedeon-freycinet-eobavh/30min';

/** Chemin Cal.com (ex. « equipe/30min ») utilisé par la fenêtre de réservation intégrée. */
export const calLink: string = (() => {
  try {
    const url = new URL(bookingUrl);
    return url.hostname.endsWith('cal.com') ? url.pathname.replace(/^\/|\/$/g, '') : '';
  } catch {
    return '';
  }
})();

/**
 * Attributs d'un lien « Prendre rendez-vous ».
 * Avec JavaScript, le clic ouvre l'agenda Cal.com dans une fenêtre sur le site (voir BookingModal) ;
 * sans JavaScript, le lien ouvre Cal.com dans un nouvel onglet. Sans lien de réservation : page Contact.
 */
export function getBookingLink(label: string, hint: string, fallbackHref: string) {
  return bookingUrl
    ? {
        href: bookingUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `${label} ${hint}`,
        'data-booking': calLink || undefined,
      }
    : { href: fallbackHref };
}

/**
 * Adresse qui reçoit les formulaires (webhook n8n / Make), appelée depuis le navigateur.
 * Le site est statique : cette adresse est donc visible publiquement. Le webhook doit filtrer
 * le spam (champ « website » = pot de miel) et valider les données côté serveur.
 */
export const formEndpoint: string = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';

export type SocialNetwork = 'facebook' | 'linkedin' | 'instagram' | 'tiktok' | 'youtube';

export interface SocialLink {
  network: SocialNetwork;
  name: string;
  /** Vide tant que le client n'a pas fourni le lien : affiché comme « bientôt ». */
  href: string;
}

// TODO(client): fournir les liens LinkedIn, Instagram, TikTok et YouTube (emplacements prévus)
export const socialLinks: SocialLink[] = [
  {
    network: 'facebook',
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61552959704472',
  },
  { network: 'linkedin', name: 'LinkedIn', href: '' },
  { network: 'instagram', name: 'Instagram', href: '' },
  { network: 'tiktok', name: 'TikTok', href: '' },
  { network: 'youtube', name: 'YouTube', href: '' },
];

export interface Partner {
  /** Libellé générique traduit (utilisé tant que le nom ne peut pas être cité). */
  labelKey: string;
  icon: 'public' | 'education' | 'creators';
  /** Nom réel, à renseigner seulement avec l'accord du partenaire. */
  name?: string;
  /** Chemin d'un logo dans public/ (ex. '/partenaires/logo.svg'). */
  logo?: string;
}

// TODO(client): fournir noms et logos des partenaires qui acceptent d'être cités (ex. le ministère)
export const partners: Partner[] = [
  { labelKey: 'trust.public', icon: 'public' },
  { labelKey: 'trust.education', icon: 'education' },
  { labelKey: 'trust.creators', icon: 'creators' },
];

/** Réseaux dont le lien est connu (pour le JSON-LD et les liens actifs). */
export const activeSocialLinks = socialLinks.filter((s) => s.href);
