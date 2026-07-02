# ADR — Choix du modèle LLM pour réduire la latence de génération

## Contexte

Le benchmark de référence a mis en évidence une latence inacceptable pour le scénario de génération de quiz : après l’upload d’un cours, le temps de réponse observé ou attendu pour obtenir 10 questions est trop élevé pour une expérience utilisateur fluide. Dans un cadre d’itération produit, cette observation justifie une recherche de modèle plus adapté à un usage interactif.

## Positionnement du problème

Le choix ne se limite pas à “le meilleur modèle possible”, mais à “le meilleur compromis entre qualité, latence et ressources”, selon trois contraintes :
- l’utilisateur attend une réponse rapide ;
- la génération doit rester suffisamment fiable pour un usage pédagogique ;
- l’infrastructure disponible doit supporter l’exécution sans surcharge mémoire.

Ce problème est donc analysé dans le cadre d’un benchmark comparatif, avec un focus sur la performance perçue et la faisabilité d’intégration dans le produit.

## Options envisagées

| Option | Avantages | Inconvénients |
|---|---|---|
| Garder le modèle actuel (Llama 3.1 8B) | Qualité perçue élevée | Latence trop élevée, expérience utilisateur dégradée |
| Basculer vers Llama 3.2 3B | Gain de latence important, mémoire plus faible, meilleur compromis | Qualité légèrement inférieure au modèle actuel |
| Basculer vers Phi-3 mini | Latence correcte, faible empreinte | Qualité un peu moins stable que Llama 3.2 3B |

## Justification théorique du choix

Le raisonnement retenu repose sur un principe simple : pour une application interactive, la qualité perçue dépend autant de la rapidité de réponse que de la qualité brute du modèle. Un modèle plus petit peut donc être plus pertinent qu’un modèle plus grand si la différence de qualité reste acceptable et si la réduction de latence améliore fortement l’expérience utilisateur dans le cadre du benchmark de référence.

Dans cette logique :
- Llama 3.1 8B est vu comme un modèle plus qualitatif, mais trop lent pour un cas d’usage où l’attente utilisateur est critique ;
- Llama 3.2 3B est considéré comme un bon compromis, car il réduit fortement le temps de génération tout en conservant une qualité suffisante pour des quiz pédagogiques ;
- Phi-3 mini est une alternative crédible, mais légèrement moins robuste dans cette hypothèse de compromis.

## Résultats théoriques de référence

Les valeurs suivantes sont à considérer comme des résultats de référence, utiles pour orienter la décision, et non comme des mesures validées par un benchmark réel :

- Llama 3.1 8B : p50 ≈ 42 s, p95 ≈ 51 s, qualité ≈ 4,6/5
- Llama 3.2 3B : p50 ≈ 12 s, p95 ≈ 18 s, qualité ≈ 4,1/5
- Phi-3 mini : p50 ≈ 14 s, p95 ≈ 22 s, qualité ≈ 4,2/5

## Décision retenue

Retenir Llama 3.2 3B comme modèle de référence pour la prochaine itération, avec une validation en préproduction avant déploiement complet.

## Conséquences

Cette décision doit être confirmée par un benchmark réel en environnement de préproduction, afin de vérifier si les gains théoriques observés dans la comparaison se traduisent bien en pratique.

### Positives
- Réduction très significative du temps d’attente utilisateur.
- Meilleure perception de réactivité du produit.
- Moins de risque d’abandon pendant la génération.

### Négatives
- Qualité légèrement inférieure au modèle actuel sur certains cas.
- Nécessité de vérifier la stabilité du prompt, de la validation JSON et de la qualité des sorties dans un benchmark réel.

### À surveiller
- Qualité des questions sur des cours plus longs ou plus techniques.
- Variabilité des temps de réponse selon la charge machine.
- Impact sur la satisfaction globale des étudiants.

## Sources

- Meta AI, « Introducing Llama 3.1: Our most capable models to date » : https://ai.meta.com/blog/meta-llama-3-1/
- Meta AI, « The Llama 3 Herd of Models » (arXiv) : https://arxiv.org/abs/2407.21783
- Meta, modèle Llama 3.2 3B Instruct sur Hugging Face : https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct
- Microsoft, « Phi-3 Technical Report » (arXiv) : https://arxiv.org/abs/2404.14219
- Kaplan et al., « Scaling Laws for Neural Language Models » (arXiv) : https://arxiv.org/abs/2001.08361

## Limite à garder en tête

Ce document repose sur une logique de comparaison théorique et sur un cadrage produit. Il ne remplace pas un benchmark réel avant toute décision d’architecture finale.
