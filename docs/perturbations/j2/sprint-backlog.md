# Sprint Backlog mis à jour — perturbation J1

## Objectif

Réduire la latence perçue de génération des quiz et documenter une décision technique fondée sur des mesures.

## Stories impactées

### Story 1 — Génération de quiz rapide et fiable
- Avant : 13 points
- Après : 16 points
- Justification : ajout d’investigation sur la latence, comparaison de modèles et validation de la bascule potentielle.

### Story 2 — Amélioration de l’expérience utilisateur pendant la génération
- Avant : 8 points
- Après : 10 points
- Justification : intégration de mesures de benchmark et préparation d’un changement de modèle si nécessaire.

## Tâches ajoutées

### Investigation
- Mettre en place un benchmark reproductible sur 3 modèles.
- Mesurer p50, p95, qualité subjective et consommation matérielle.
- Documenter les résultats dans un tableau de synthèse.

### Bascule / préparation
- Évaluer la possibilité de basculer vers un modèle plus léger.
- Préparer la configuration et la procédure de changement si la décision est validée.
- Documenter l’ADR associé à la décision.

## Résumé

La perturbation a conduit à re-estimer le backlog avec des tâches supplémentaires d’investigation et de préparation de bascule. L’objectif n’est pas seulement d’augmenter la vitesse, mais aussi de justifier techniquement la décision auprès du sponsor et du PO.
