/**
 * Page de réinitialisation de mot de passe.
 *
 * [Note pédagogique] On affiche TOUJOURS le même message de succès, que l'email
 * existe ou non en base. C'est une protection contre l'énumération de comptes :
 * un attaquant ne doit pas pouvoir deviner quelles adresses sont enregistrées.
 */
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '@/api/auth';
import { getApiErrorMessage } from '@/api/errors';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const detail = await requestPasswordReset(email);
      setMessage(detail);
    } catch (err) {
      setError(getApiErrorMessage(err, t('forgot.error')));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('forgot.title')}</h1>
        <p className="text-sm text-slate-500 mb-6">{t('forgot.desc')}</p>

        {message ? (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded">
            {message}
            <div className="mt-3">
              <Link to="/login" className="text-indigo-600 hover:underline">
                {t('forgot.back')}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t('forgot.email')}
                </label>
                <input
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? t('forgot.loading') : t('forgot.submit')}
              </button>
            </form>

            <p className="text-sm text-slate-500 mt-4 text-center">
              <Link to="/login" className="text-indigo-600 hover:underline">
                {t('forgot.back')}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
