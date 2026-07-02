# Vision Board — EduTutor IA (J4 : passage à l'échelle)

> Perturbation **J4** · Équipe 4 · intègre les **3 axes** : scalabilité, accessibilité RGAA, i18n.

> **Vision** : *faire d'EduTutor la plateforme de révision nationale — accessible à tous (RGAA), dans sa langue (i18n), et capable de tenir la charge — sans renoncer à la souveraineté des données.*

| Quadrant | Contenu (avec les 3 axes) |
|---|---|
| **Groupe cible** | Étudiant·e (national + **international**) · Enseignant·e · **Personnes en situation de handicap (Lucia)** · Établissement (B2B, futur) |
| **Besoins** | Réviser vite sur son cours · repérer les décrocheurs · **accès équitable (handicap)** · **usage dans sa langue** · **service disponible sous forte charge** |
| **Produit** | PDF/texte → 10 QCM (LLM local) · **accessible RGAA** · **multilingue (UI + IA)** · **architecture scalable** (cache Redis, autoscaling) |
| **Objectifs métier** | **O8** conformité **RGAA** (condition marché public) · **O9** i18n (FR/EN/ES) · **O10** tenir 1000 utilisateurs simultanés (p95 < 20 s) |

**Décision d'architecte** : les 3 axes forment la **Release 3** ; RGAA est **Must** (condition non négociable de l'État).
