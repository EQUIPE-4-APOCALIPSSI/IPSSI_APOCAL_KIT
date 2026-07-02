/** Politique de confidentialité — conformité RGPD (Art. 13-14). */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Responsable du traitement',
    hint: "L'équipe projet EduTutor IA (IPSSI — APOCAL'IPSSI 2026) est responsable du traitement des données collectées via l'application. Contact : equipe4@edututor-ia.fr",
  },
  {
    title: 'Données personnelles collectées',
    hint: "• Email (identifiant de connexion)\n• Prénom et nom (optionnels)\n• Mot de passe (hashé, jamais stocké en clair)\n• Texte des cours uploadés ou collés\n• Quiz générés et réponses soumises\n• Token d'authentification (localStorage navigateur)\n• Date de création du compte et dernière connexion",
  },
  {
    title: 'Finalités du traitement',
    hint: "• Création et gestion du compte utilisateur\n• Génération de quiz via LLM local (Ollama)\n• Correction et notation des quiz\n• Affichage de l'historique et des statistiques de progression\n• Export des données (droit d'accès Art. 15)\n• Communication par email (validation, reset mot de passe)",
  },
  {
    title: 'Base légale',
    hint: 'Le traitement repose sur :\n• Contrat (Art. 6.1.b RGPD) : création du compte, génération de quiz, correction\n• Intérêt légitime (Art. 6.1.f RGPD) : statistiques de progression, sécurité\n• Consentement (Art. 6.1.a RGPD) : pour les cookies non essentiels\n• Obligation légale (Art. 6.1.c RGPD) : conservation des données pour conformité RGPD',
  },
  {
    title: 'Durée de conservation',
    hint: "• Données de compte : 3 ans après la dernière connexion\n• Quiz et réponses : jusqu'à suppression du compte\n• Logs de connexion : 1 an (rotation automatique)\n• Token d'authentification : jusqu'à déconnexion ou changement de mot de passe\nVoir la politique de rétention complète : /docs/legal/retention.md",
  },
  {
    title: 'Destinataires des données',
    hint: "• Équipe projet (accès limité aux besoins du développement)\n• Brevo (envoi d'emails — SMTP, données transférées : email uniquement)\n• Aucun autre tiers n'a accès aux données\nLe LLM Ollama fonctionne EN LOCAL : aucune donnée de cours ne quitte le serveur.",
  },
  {
    title: 'Transferts hors UE',
    hint: "Par défaut (Ollama local) : aucune donnée ne sort de l'UE.\nSi un fournisseur cloud LLM est activé (Gemini, Groq, etc.), les textes de cours sont transmis à ce prestataire. Consultez l'ADR correspondant pour la localisation des données.\nBrevo : emails traités depuis des serveurs situés en France.",
  },
  {
    title: 'Vos droits',
    hint: 'Conformément au RGPD, vous disposez des droits suivants, exerçables depuis votre page /profile :\n• Accès (Art. 15) : bouton « Exporter mes données » → ZIP\n• Rectification (Art. 16) : modifier votre profil en ligne\n• Effacement (Art. 17) : supprimer votre compte (zone de danger)\n• Portabilité (Art. 20) : export ZIP en JSON + CSV\n• Opposition (Art. 21) : nous contacter par email\n• Réclamation (Art. 77) : saisir la CNIL — www.cnil.fr',
  },
  {
    title: 'Cookies',
    hint: "Ce site utilise uniquement le localStorage du navigateur pour stocker le token d'authentification (donnée technique, pas un cookie au sens strict). Aucun cookie tiers, aucune piste de suivi. Voir la page Politique des cookies.",
  },
  {
    title: 'Contact & réclamation',
    hint: 'Référent données : equipe4@edututor-ia.fr\nDroit de réclamation auprès de la CNIL : 3 Place de Fontenoy, 75007 Paris — www.cnil.fr',
  },
];

export default function ConfidentialitePage() {
  return (
    <LegalScaffold
      title="Politique de confidentialité"
      intro="Comment les données personnelles des utilisateurs sont collectées, utilisées et protégées (RGPD)."
      sections={SECTIONS}
    />
  );
}
