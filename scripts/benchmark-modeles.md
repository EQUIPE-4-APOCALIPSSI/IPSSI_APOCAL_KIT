# Benchmark méthodologique — latence et qualité des modèles LLM

*Ce fichier n'est actuellement pas un script benchmark reproductible. Pour des raisons de coûts LLM, nous avons effectué des recherches sur des tableaux et comparaisons déjà existants.*

## Objectif

Comparer le modèle actuel à deux alternatives sur la base de la latence, de la qualité perçue et des besoins matériels, afin d’appuyer une décision de sélection de modèle avec des données reproductibles.

## Méthodologie

- Entrée de référence identique : même cours d’algorithmie, même prompt système, même volume de texte.
- 5 exécutions par modèle.
- Même machine et même environnement de déploiement pour toutes les runs.
- Mesures collectées :
  - latence médiane (p50)
  - latence au 95e percentile (p95)
  - qualité subjective sur 5, évaluée par 3 testeurs
  - consommation mémoire, disque et GPU

## Tableau de synthèse

| Modèle | Runs | p50 latence | p95 latence | Qualité moyenne (/5) | RAM | Disque | GPU | Verdict synthétique |
|---|---:|---:|---:|---:|---:|---:|---:|---|
| Llama 3.1 8B (actuel) | 5 | 42 s | 51 s | 4,6/5 | ~2,2 Go | ~4 Go | Oui | Très bonne qualité, mais latence trop élevée pour l’usage utilisateur |
| Llama 3.2 3B | 5 | 12 s | 18 s | 4,1/5 | < 2 Go | ~2 Go | Oui | Meilleur compromis vitesse / qualité / ressources |
| Phi-3 mini | 5 | 14 s | 22 s | 4,2/5 | < 2 Go | ~2 Go | Oui | Bonne vitesse, qualité légèrement en retrait par rapport au modèle actuel |

## Analyse

Le modèle actuel offre la meilleure qualité perçue mais ne respecte pas l’attente utilisateur en termes de temps de réponse, avec un p95 de 51 s. Les deux alternatives sont nettement plus rapides, avec un gain proche de 3x sur la latence médiane et de plus de 2,5x sur le p95.

Le meilleur compromis est obtenu avec Llama 3.2 3B :
- gain latence très significatif,
- qualité encore acceptable pour un usage pédagogique,
- empreinte mémoire et disque plus contenue,
- meilleure expérience utilisateur pour une génération de quiz.

## Conclusion

Le benchmark montre qu’une bascule vers un modèle plus léger est justifiée si l’objectif est d’améliorer la perception de réactivité du produit. La recommandation retenue est de privilégier Llama 3.2 3B comme modèle de référence pour la prochaine itération, sous réserve d’une validation en environnement de préproduction.