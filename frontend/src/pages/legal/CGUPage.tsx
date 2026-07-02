/** Conditions Générales d'Utilisation — CGU complètes. */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Objet',
    hint: "Les présentes CGU régissent l'accès et l'utilisation du service EduTutor IA, une plateforme de révision personnalisée permettant de générer des quiz à partir de cours (PDF ou texte) via intelligence artificielle (LLM local).",
  },
  {
    title: 'Acceptation des conditions',
    hint: "En créant un compte et en utilisant le service, l'utilisateur accepte pleinement et sans réserve les présentes CGU. L'utilisateur déclare avoir la capacité juridique nécessaire pour contracter.",
  },
  {
    title: 'Accès au service',
    hint: "Le service est accessible depuis un navigateur web moderne après création d'un compte. L'accès nécessite une connexion Internet et un équipement compatible. L'éditeur s'efforce d'assurer une disponibilité continue, sans garantie absolue (projet pédagogique).",
  },
  {
    title: 'Compte utilisateur',
    hint: "La création du compte se fait par email et mot de passe (≥ 8 caractères). L'utilisateur est responsable de la confidentialité de son mot de passe. Les informations fournies doivent être exactes. Tout accès via le compte est réputé émaner du titulaire.",
  },
  {
    title: 'Comportements interdits',
    hint: "Il est interdit de :\n• Utiliser le service à des fins illégales\n• Tenter de contourner les limitations techniques ou de sécurité\n• Uploader des contenus illicites, diffamatoires ou offensants\n• Tenter de manipuler les prompts pour injecter des instructions malveillantes\n• Accéder aux données d'autres utilisateurs",
  },
  {
    title: 'Contenu généré par IA',
    hint: "Les quiz sont générés automatiquement par un LLM (Llama 3.1 8B via Ollama). Les réponses peuvent contenir des erreurs ou des hallucinations. L'utilisateur est invité à vérifier les informations. L'éditeur ne saurait être tenu responsable de l'exactitude des contenus générés.",
  },
  {
    title: 'Responsabilité',
    hint: "Le service est fourni « en l'état » dans le cadre d'un projet pédagogique. L'éditeur décline toute responsabilité en cas de dommage direct ou indirect résultant de l'utilisation du service. La responsabilité de l'éditeur est limitée au préjudice direct prouvé.",
  },
  {
    title: 'Propriété intellectuelle',
    hint: "Le code source du projet est sous licence CC BY-NC-SA 4.0. Les contenus déposés par l'utilisateur (cours, textes) restent sa propriété. Les quiz générés sont partagés entre l'utilisateur et l'éditeur (anonymisés pour analyse).",
  },
  {
    title: 'Modification des CGU',
    hint: "Les CGU peuvent être modifiées à tout moment. Les utilisateurs seront informés par email en cas de changement substantiel. L'utilisation continue du service après modification vaut acceptation des nouvelles CGU.",
  },
  {
    title: 'Droit applicable et litiges',
    hint: "Les présentes CGU sont régies par le droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant toute action judiciaire. À défaut, le tribunal compétent est celui de Paris.",
  },
];

export default function CGUPage() {
  return (
    <LegalScaffold
      title="Conditions Générales d'Utilisation"
      intro="Les règles d'utilisation du service EduTutor IA, acceptées par chaque utilisateur."
      sections={SECTIONS}
    />
  );
}
