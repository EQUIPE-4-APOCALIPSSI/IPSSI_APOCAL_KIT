# Politique de rétention des données — EduTutor IA

> **Contexte** : Document produit dans le cadre de la perturbation J3-bis (RGPD)
> et de l'US-15 (Export RGPD — droit d'accès Art. 15).

---

## 1. Données collectées

| Catégorie | Données | Durée de conservation | Justification |
|-----------|---------|----------------------|---------------|
| **Compte** | Email, prénom, nom, hash bcrypt du mot de passe | 3 ans après dernière connexion | Contrat (CGU Art. 6 RGPD) |
| **Profil** | Statut vérification email, date création | 3 ans après dernière connexion | Contrat |
| **Quiz** | Titre, texte source, score, dates | Jusqu'à suppression du compte | Contrat |
| **Réponses** | Options choisies par question | Jusqu'à suppression du compte | Contrat |
| **Tokens** | Token d'authentification | Jusqu'à déconnexion ou changement mdp | Nécessité technique |
| **Logs** | Adresse IP, user-agent, timestamps | 1 an (rotation automatique) | Intérêt légitime (sécurité) |

## 2. Base légale du traitement

| Finalité | Base légale (RGPD) |
|----------|-------------------|
| Création et gestion du compte | Exécution du contrat (Art. 6.1.b) |
| Génération de quiz | Exécution du contrat (Art. 6.1.b) |
| Envoi d'emails (validation, reset) | Exécution du contrat (Art. 6.1.b) |
| Statistiques de progression | Intérêt légitime (Art. 6.1.f) |
| Sécurité et prévention des abus | Intérêt légitime (Art. 6.1.f) |
| Conformité légale (RGPD, CNIL) | Obligation légale (Art. 6.1.c) |

## 3. Droits des utilisateurs

Conformément au RGPD, tout utilisateur dispose des droits suivants :

| Droit | Article RGPD | Comment l'exercer |
|-------|--------------|-------------------|
| **Accès** | Art. 15 | Export via le bouton « Exporter mes données » dans le profil |
| **Rectification** | Art. 16 | Modifier son profil depuis la page /profile |
| **Suppression (droit à l'oubli)** | Art. 17 | Supprimer son compte depuis la page /profile (zone de danger) |
| **Portabilité** | Art. 20 | Export ZIP via le bouton « Exporter mes données » |
| **Opposition** | Art. 21 | Nous contacter par email (voir CGU) |
| **Réclamation** | Art. 77 | Saisir la CNIL (www.cnil.fr) |

## 4. Sous-traitants et destinataires

| Prestataire | Données partagées | Localisation | Garantie RGPD |
|-------------|------------------|-------------|---------------|
| **Brevo** (SMTP) | Email uniquement | UE (France) | DPA signé |
| **Ollama** (LLM local) | Aucune (tout reste sur le serveur) | Locale | Souverain |
| **Fournisseur cloud LLM** (si activé) | Texte du cours | Variable | Voir ADR du fournisseur choisi |

> ⚠️ **Par défaut, Ollama local est utilisé** : aucune donnée ne quitte le serveur.
> En cas d'activation d'un fournisseur cloud, les données du cours sont transmises
> à ce fournisseur (enjeu de conformité — voir perturbation J3-bis).

## 5. Procédure de purge

- **Comptes inactifs** : une revue trimestrielle identifie les comptes sans
  connexion depuis 3 ans → suppression automatique après email d'avertissement
  (30 jours de délai).
- **Logs techniques** : rotation automatique (logs > 1 an archivés puis supprimés).
- **Suppression manuelle** : l'utilisateur peut supprimer son compte à tout moment
  depuis la page /profile (destruction immédiate de toutes les données).

## 6. Contact

Pour toute question relative à la politique de rétention ou pour exercer vos
droits RGPD : **email référent données** (voir page Mentions légales).

---

*Document généré le 30/06/2026 dans le cadre du projet EduTutor IA — APOCAL'IPSSI 2026.*
