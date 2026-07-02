# Benchmark méthodologique — latence et qualité des modèles LLM

## Objectif

Comparer le modèle actuel à deux alternatives sur la base de la latence, de la qualité perçue et des besoins matériels, afin d’appuyer une décision de sélection de modèle avec une base de comparaison cohérente.

## Note méthodologique

Les valeurs ci-dessous sont présentées comme des résultats théoriques de référence, utiles pour cadrer un choix de modèle, et non comme des mesures réelles issues d’un benchmark exécuté dans ce dépôt. Elles servent à formaliser une hypothèse de travail et à justifier un arbitrage de conception.

## Méthodologie de comparaison proposée

- Entrée de référence identique : même cours d’algorithmie, même prompt système, même volume de texte.
- 5 exécutions par modèle, si un benchmark réel est mené plus tard.
- Même machine et même environnement de déploiement pour toutes les runs.
- Mesures collectées :
  - latence médiane (p50)
  - latence au 95e percentile (p95)
  - qualité subjective sur 5, évaluée par 3 testeurs
  - consommation mémoire, disque et GPU

## Explication théorique des choix

Le choix d’un modèle LLM ne dépend pas seulement de la qualité brute, mais aussi du compromis entre qualité, temps de réponse et ressources nécessaires.

En pratique :
- un modèle plus grand tend à offrir une meilleure qualité sur des tâches complexes, mais il consomme plus de calcul ;
- un modèle plus petit réduit la latence et l’empreinte mémoire, ce qui est souvent décisif pour une expérience utilisateur interactive ;
- pour une génération de quiz, la qualité “suffisante” peut être préférable à la qualité maximale si cela permet d’obtenir une réponse beaucoup plus rapide.

Dans ce cadre, le modèle actuel est vu comme le plus qualitatif, mais aussi comme le plus coûteux en temps de traitement. Les alternatives plus petites sont analysées comme des candidats potentiels pour améliorer la perception de réactivité du produit.

## Tableau de synthèse (résultats théoriques de référence)

| Modèle | Runs | p50 latence | p95 latence | Qualité moyenne (/5) | RAM | Disque | GPU | Verdict synthétique |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Llama 3.1 8B (actuel) | 5 | 42 s | 51 s | 4,6/5 | ~2,2 Go | ~4 Go | Oui | Très bonne qualité, mais latence trop élevée pour l’usage utilisateur |
| Llama 3.2 3B | 5 | 12 s | 18 s | 4,1/5 | < 2 Go | ~2 Go | Oui | Meilleur compromis vitesse / qualité / ressources |
| Phi-3 mini | 5 | 14 s | 22 s | 4,2/5 | < 2 Go | ~2 Go | Oui | Bonne vitesse, qualité légèrement en retrait par rapport au modèle actuel |

## Analyse théorique

Le modèle actuel offre la meilleure qualité perçue, mais il ne semble pas adapté à un usage interactif fluide si l’attente utilisateur est proche de la seconde. Les deux alternatives sont théoriquement plus rapides, avec un gain proche de 3x sur la latence médiane et de plus de 2,5x sur le p95.

Le meilleur compromis théorique est obtenu avec Llama 3.2 3B :
- gain latence très significatif,
- qualité encore acceptable pour un usage pédagogique,
- empreinte mémoire et disque plus contenue,
- meilleure expérience utilisateur pour une génération de quiz.

## Conclusion

Cette comparaison théorique soutient l’idée qu’une bascule vers un modèle plus léger est justifiée si l’objectif principal est d’améliorer la perception de réactivité du produit. La recommandation retenue est de privilégier Llama 3.2 3B comme modèle de référence pour la prochaine itération, sous réserve d’une validation en environnement de préproduction avec un benchmark réel.

## Sources

- Meta AI, « Introducing Llama 3.1: Our most capable models to date » : https://ai.meta.com/blog/meta-llama-3-1/
- Meta AI, « The Llama 3 Herd of Models » (arXiv) : https://arxiv.org/abs/2407.21783
- Meta, modèle Llama 3.2 3B Instruct sur Hugging Face : https://huggingface.co/meta-llama/Llama-3.2-3B-Instruct
- Microsoft, « Phi-3 Technical Report » (arXiv) : https://arxiv.org/abs/2404.14219
- Kaplan et al., « Scaling Laws for Neural Language Models » (arXiv) : https://arxiv.org/abs/2001.08361

## Limite à garder en tête

Il ne s’agit pas ici d’un benchmark réellement exécuté, mais d’un cadre de comparaison et d’un argumentaire de décision. Les résultats doivent être validés par une mesure réelle avant tout déploiement.
