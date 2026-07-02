/**
 * Révision des erreurs (MVP2 — Lot 6, fonctionnalité démo).
 *
 * Liste toutes les questions que l'utilisateur a ratées (sa dernière réponse
 * était fausse), en montrant SA réponse (en rouge) et la BONNE réponse (en
 * vert). Objectif pédagogique pour l'apprenant : apprendre de ses erreurs.
 */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getMistakes, type Mistake } from '@/api/quizzes';
import { getApiErrorMessage } from '@/api/errors';

function OptionRow({
  text,
  isCorrect,
  isSelected,
}: {
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
}) {
  let cls = 'border-slate-200 text-slate-600';
  let tag = '';
  if (isCorrect) {
    cls = 'border-emerald-400 bg-emerald-50 text-emerald-900';
    tag = '✓ Bonne réponse';
  } else if (isSelected) {
    cls = 'border-rose-400 bg-rose-50 text-rose-900';
    tag = '✗ Votre réponse';
  }
  return (
    <div className={`flex items-center justify-between gap-3 px-3 py-2 border rounded ${cls}`}>
      <span>{text}</span>
      {tag && <span className="text-xs font-semibold whitespace-nowrap">{tag}</span>}
    </div>
  );
}

export default function ReviewMistakesPage() {
  const { t } = useTranslation();
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMistakes()
      .then((res) => setMistakes(res.mistakes))
      .catch((err) => setError(getApiErrorMessage(err, 'Impossible de charger vos erreurs.')))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">{t('common.loading')}</p>;
  if (error) return <p className="text-rose-600">{error}</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">{t('review.title')}</h1>
        <p className="text-slate-500 text-sm">
          {mistakes.length === 0
            ? t('review.empty')
            : `${mistakes.length} ${mistakes.length > 1 ? 'questions' : 'question'} ${t('review.title')}`}
        </p>
      </div>

      {mistakes.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">🎯</div>
          <p className="text-slate-600 mb-4">{t('review.emptyDesc')}</p>
          <Link to="/upload" className="btn-primary">
            {t('review.createQuiz')}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {mistakes.map((m) => (
            <div key={`${m.quiz_id}-${m.index}`} className="card">
              <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                <span className="font-mono text-xs text-slate-500">
                  Quiz #{m.quiz_id} · Question {m.index}
                </span>
                <Link to={`/quiz/${m.quiz_id}`} className="text-xs text-indigo-600 hover:underline">
                  Refaire ce quiz →
                </Link>
              </div>
              <h3 className="font-semibold text-slate-900 mb-3">{m.prompt}</h3>
              <div className="space-y-2">
                {m.options.map((opt, i) => (
                  <OptionRow
                    key={i}
                    text={opt}
                    isCorrect={i === m.correct_index}
                    isSelected={i === m.selected_index}
                  />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {t('review.fromQuiz', { title: m.quiz_title })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
