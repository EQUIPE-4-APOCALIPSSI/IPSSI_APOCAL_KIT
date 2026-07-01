/** Mentions légales — conformité Art. 6 LCEN. */
import LegalScaffold, { type LegalSection } from './LegalScaffold';

const SECTIONS: LegalSection[] = [
  {
    title: 'Éditeur du site',
    hint: "EduTutor IA — Équipe 4 APOCAL'IPSSI 2026\nStatut : Projet étudiant — IPSSI\nAdresse : IPSSI Paris, 75000 Paris\nEmail : equipe4@edututor-ia.fr",
  },
  {
    title: 'Directeur de la publication',
    hint: 'Mohamed Amine EL AFRIT — formateur référent\nEmail : melafrit@ipssi.edu',
  },
  {
    title: 'Hébergeur',
    hint: "Infrastructure Docker déployée sur VPS OVH\nOVH SAS — 2 rue Kellermann, 59100 Roubaix, France\nTél. : 1007\nLes données sont hébergées dans la région Gravelines (France).",
  },
  {
    title: 'Propriété intellectuelle',
    hint: "Le code source du projet est distribué sous licence CC BY-NC-SA 4.0.\nLe nom et le logo EduTutor IA sont la propriété de l'équipe projet.\nLes contenus générés par les utilisateurs leur appartiennent.\nLe modèle Llama 3.1 8B est distribué par Meta sous licence communautaire Llama 3.1.",
  },
  {
    title: 'Contact',
    hint: "Pour toute question juridique ou réclamation : equipe4@edututor-ia.fr\nOu via le formulaire de contact sur la page /profile de l'application.",
  },
];

export default function MentionsLegalesPage() {
  return (
    <LegalScaffold
      title="Mentions légales"
      intro="Informations légales obligatoires identifiant l'éditeur et l'hébergeur du site."
      sections={SECTIONS}
    />
  );
}
