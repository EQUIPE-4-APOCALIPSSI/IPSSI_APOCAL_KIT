# ADR — Choix du modèle LLM pour réduire la latence de génération

## Contexte

Le retour d’un testeur beta a mis en évidence une latence inacceptable : après l’upload d’un cours, l’utilisateur attendait 45 secondes pour obtenir 10 questions, ce qui a conduit à une forte perception de rupture fonctionnelle. Le benchmark reproductible montre un p95 de 51 s pour le modèle actuel, ce qui est incompatible avec une expérience utilisateur satisfaisante.

## Options envisagées

| Option | Avantages | Inconvénients |
|---|---|---|
| Garder le modèle actuel (Llama 3.1 8B) | Qualité perçue élevée | Latence trop élevée, expérience utilisateur dégradée |
| Basculer vers Llama 3.2 3B | Gain de latence important, mémoire plus faible, meilleur compromis | Qualité légèrement inférieure au modèle actuel |
| Basculer vers Phi-3 mini | Latence correcte, faible empreinte | Qualité un peu moins stable que Llama 3.2 3B |

## Décision retenue

Retenir Llama 3.2 3B comme modèle de référence pour la prochaine itération, avec une validation en préproduction avant déploiement complet.

## Justification

Le benchmark montre un gain de latence très clair par rapport au modèle actuel, avec un p50 de 12 s et un p95 de 18 s contre 42 s et 51 s. La qualité moyenne reste acceptable pour un usage pédagogique, tandis que la consommation mémoire reste inférieure à 2 Go, ce qui est plus compatible avec une exécution locale ou semi-locale.

## Conséquences

### Positives
- Réduction très significative du temps d’attente utilisateur.
- Meilleure perception de réactivité du produit.
- Moins de risque d’abandon pendant la génération.

### Négatives
- Qualité légèrement inférieure au modèle actuel sur certains cas.
- Nécessité de vérifier la stabilité du prompt et de la validation JSON.

### À surveiller
- Qualité des questions sur des cours plus longs ou plus techniques.
- Variabilité des temps de réponse selon la charge machine.
- Impact sur la satisfaction globale des étudiants.
