# RGPD : 3 articles à connaître

Le Règlement Général sur la Protection des Données est en vigueur en UE depuis
2018. Pour un POC qui manipule des données utilisateurs, 3 articles sont à
maîtriser.

---

## Art. 15 — Droit d'accès

L'utilisateur peut demander à voir toutes les données que vous détenez sur lui,
dans un format **machine-readable**. Vous avez **1 mois** pour répondre.

> ✅ **Implémenté** — endpoint `GET /api/accounts/me/export/` (US-15)

---

## Art. 17 — Droit à l'effacement (droit à l'oubli)

L'utilisateur peut exiger la suppression de ses données. Vous devez purger tout
(DB, logs, sauvegardes).

> ✅ **Implémenté** — suppression de compte depuis `/profile` (zone de danger)

---

## Art. 20 — Droit à la portabilité

Les données exportées doivent être dans un format **réutilisable** (JSON, CSV,
pas PDF).

> ✅ **Implémenté** — export ZIP contenant `user.json` + `quizzes.json` +
> `reponses.csv` + `audit.json`

---

## 🔒 Privacy by design

Le principe clé : **concevoir dès le départ** les endpoints d'export, la
politique de rétention et l'audit trail. Pas en patch dans 6 mois sous pression
CNIL.

---

*Document généré le 01/07/2026 — Projet EduTutor IA (APOCAL'IPSSI 2026)*
