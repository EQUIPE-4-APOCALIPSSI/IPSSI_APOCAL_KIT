/**
 * Page de réinitialisation du mot de passe.
 *
 * L'utilisateur arrive ici via le lien reçu par email :
 *   /reset-password?uid=...&token=...
 * On lit uid + token dans l'URL, on demande le nouveau mot de passe, puis on
 * appelle le backend qui valide le token (mécanisme standard Django).
 */
import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { confirmPasswordReset } from '@/api/auth';
import { getApiErrorMessage } from '@/api/errors';

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const uid = params.get('uid') ?? '';
  const token = params.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const linkInvalid = !uid || !token;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError(t('reset.mismatch'));
      return;
    }
    setLoading(true);
    try {
      const detail = await confirmPasswordReset(uid, token, password);
      setMessage(detail);
      // Redirige vers la connexion après un court instant.
      setTimeout(() => navigate('/login', { replace: true }), 2000);
    } catch (err) {
      setError(getApiErrorMessage(err, t('reset.error')));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('reset.title')}</h1>

        {linkInvalid ? (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {t('reset.invalidLink')}{' '}
            <Link to="/forgot-password" className="text-indigo-600 hover:underline">
              « mot de passe oublié »
            </Link>
            .
          </div>
        ) : message ? (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded">
            {message} {t('reset.redirecting')}
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mb-6">{t('reset.desc')}</p>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t('reset.password')}
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoFocus
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {t('reset.confirm')}
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="input"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? t('reset.loading') : t('reset.submit')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
