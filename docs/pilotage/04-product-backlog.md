# Product Backlog — extension J4 (3 axes)

> Ces user stories **s'ajoutent** au backlog complet (US-01 → US-23) et l'enrichissent des 3 axes.
> Format **INVEST** · priorisation **MoSCoW** · estimation en **SP**.

| ID | User story | Axe | Persona | MoSCoW | SP |
|---|---|---|---|---|---|
| **US-24** | En tant qu'utilisateur en situation de handicap, je veux naviguer au clavier avec focus visible et contrastes RGAA, afin de réviser sans souris. | RGAA | Lucia | **Must** | 8 |
| **US-25** | En tant qu'étudiant·e, je veux choisir la langue de l'interface (FR/EN/ES), afin de réviser dans ma langue. | i18n | Lucia | **Must** | 8 |
| **US-26** | En tant qu'étudiant·e, je veux que le quiz soit généré dans ma langue, afin de réviser en EN/ES. | i18n | Lucia | **Should** | 5 |
| **US-27** | En tant qu'administrateur, je veux un cache Redis + test de charge k6, afin de tenir 1000 utilisateurs simultanés. | Scale | Thomas | **Must** | 13 |
| **US-28** | En tant qu'administrateur, je veux un fournisseur LLM de secours, afin de maintenir le service si Ollama tombe. | Scale | Thomas | **Could** | 5 |

**Justification MoSCoW** : **RGAA (US-24) = Must** — condition **non négociable** de l'État. Les fondations **i18n (US-25)** et **scalabilité (US-27)** sont **Must** (charge nationale). US-26/US-28 en Should/Could.
