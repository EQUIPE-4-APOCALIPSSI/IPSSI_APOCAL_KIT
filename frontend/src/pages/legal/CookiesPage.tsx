/** Politique de gestion des cookies — conforme RGPD. */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: "Qu'est-ce qu'un cookie ?",
    hint: 'Un cookie est un petit fichier texte déposé sur le navigateur par un site visité. Il permet de stocker des informations temporaires pour améliorer la navigation. Le localStorage utilisé par EduTutor IA est une technologie similaire : les données restent sur le navigateur et ne sont pas transmises à des tiers.',
  },
  {
    title: 'Stockages utilisés',
    hint: "• localStorage : clé « apocal_token » — contient le token d'authentification DRF\n• localStorage : clé « apocal_theme » — préférence de thème (clair/sombre)\n• Aucun cookie HTTP, aucun cookie tiers, aucun tracker (Google Analytics, Meta, etc.)",
  },
  {
    title: 'Finalité de chaque stockage',
    hint: '• apocal_token : maintien de la session connectée (nécessaire au fonctionnement)\n• apocal_theme : mémorisation du choix de thème visuel (confort utilisateur)\nStrictement technique — aucune donnée de navigation, aucune piste de suivi publicitaire.',
  },
  {
    title: 'Consentement',
    hint: "Le token d'authentification en localStorage est un stockage strictement nécessaire au fonctionnement du service : il ne requiert pas de consentement préalable (exemption GDPR Art. 5.3 ePrivacy). Aucun cookie nécessitant un consentement n'est utilisé.",
  },
  {
    title: 'Durée de conservation',
    hint: "• apocal_token : jusqu'à déconnexion, changement de mot de passe, ou expiration (supprimé automatiquement)\n• apocal_theme : persistant jusqu'à modification par l'utilisateur\nL'utilisateur peut effacer ces données à tout moment via les outils de son navigateur.",
  },
  {
    title: 'Gérer les cookies',
    hint: 'Vous pouvez supprimer les données de localStorage à tout moment :\n• Chrome : Paramètres → Confidentialité → Effacer les données de navigation → Cookies et autres données\n• Firefox : Paramètres → Vie privée → Cookies et données → Gérer les données\n• Safari : Réglages → Confidentialité → Gérer les données\n• Ou simplement : F12 → Application → Local Storage → Effacer\nLa suppression du token entraînera une déconnexion (simple reconnexion).',
  },
];

export default function CookiesPage() {
  return (
    <LegalScaffold
      title="Politique de gestion des cookies"
      intro="Les cookies et technologies de stockage utilisés par le site, et comment les gérer."
      sections={SECTIONS}
    />
  );
}
