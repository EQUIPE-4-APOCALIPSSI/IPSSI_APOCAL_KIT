/**
 * Gabarit commun aux pages légales (Lot 5).
 *
 * Un site qui collecte des données personnelles DOIT légalement publier ces informations.
 * URL du cours de référence sur la réglementation des données :
 *  https://mohamedelafrit.com/teaching/Reglementation_des_Donnees
 */
import type { ReactNode } from 'react';

export type LegalSection = {
  /** Titre de la rubrique (ce que la loi attend de voir). */
  title: string;
  /** Indication pour l'équipe : quoi écrire dans cette rubrique. */
  hint: string;
};

type Props = {
  title: string;
  intro: string;
  sections: LegalSection[];
  /** Contenu libre optionnel ajouté après les rubriques. */
  children?: ReactNode;
};

export default function LegalScaffold({ title, intro, sections, children }: Props) {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{title}</h1>
      <p className="text-slate-600 mb-6">{intro}</p>

      <div className="space-y-6">
        {sections.map((section, i) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-slate-900 mb-1">
              {i + 1}. {section.title}
            </h2>
            <p className="text-sm text-slate-500 italic">{section.hint}</p>
          </section>
        ))}
      </div>

      {children}

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200">
        Dernière mise à jour : <em>le 01 juillet 2026</em>. Document rédigé dans le cadre
        pédagogique APOCAL'IPSSI 2026.
      </p>
    </article>
  );
}
