/**
 * Page "Mon profil".
 *
 * Trois zones :
 *   1. Mes informations  : modifier prénom / nom / email
 *   2. Mot de passe       : changer son mot de passe (ancien requis)
 *   3. Zone de danger     : supprimer définitivement son compte
 *
 * [Note pédagogique] Changer son email = re-valider (le bandeau « email non
 * confirmé » réapparaîtra). La suppression est une action DESTRUCTIVE : on la
 * protège par une confirmation au mot de passe.
 *
 * [TODO J3-bis RGPD] Ajouter ici un bouton « Exporter mes données » (droit à la
 *   portabilité) — placeholder présent plus bas, à implémenter pendant la semaine.
 * [TODO J4] Ajouter un bouton « Signaler un contenu / un quiz » — placeholder.
 */
import { useState, useEffect, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { changePassword, deleteAccount, exportData, updateProfile } from '@/api/auth';
import { getApiErrorMessage } from '@/api/errors';

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const { user, refresh } = useAuth();
  const navigate = useNavigate();

  // --- Zone 1 : informations ---
  const [firstName, setFirstName] = useState(user?.first_name ?? '');
  const [lastName, setLastName] = useState(user?.last_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [infoErr, setInfoErr] = useState<string | null>(null);
  const [infoLoading, setInfoLoading] = useState(false);

  // --- Zone 2 : mot de passe ---
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);

  // --- Export RGPD ---
  const [exportLoading, setExportLoading] = useState(false);
  const [exportMsg, setExportMsg] = useState<string | null>(null);
  const [exportErr, setExportErr] = useState<string | null>(null);

  // --- Zone 3 : suppression ---
  const [delPwd, setDelPwd] = useState('');
  const [delConfirm, setDelConfirm] = useState(false);
  const [delErr, setDelErr] = useState<string | null>(null);
  const [delLoading, setDelLoading] = useState(false);

  // Effacer les messages quand la langue change (évite d'afficher une
  // traduction périmée stockée dans le state).
  useEffect(() => {
    setInfoMsg(null);
    setInfoErr(null);
    setPwdMsg(null);
    setPwdErr(null);
    setExportMsg(null);
    setExportErr(null);
    setDelErr(null);
  }, [i18n.language]);

  const handleInfo = async (e: FormEvent) => {
    e.preventDefault();
    setInfoMsg(null);
    setInfoErr(null);
    setInfoLoading(true);
    try {
      await updateProfile({ first_name: firstName, last_name: lastName, email });
      await refresh();
      setInfoMsg(t('profile.infoUpdated'));
    } catch (err) {
      setInfoErr(getApiErrorMessage(err, t('profile.infoError')));
    } finally {
      setInfoLoading(false);
    }
  };

  const handlePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    setPwdErr(null);
    if (newPwd !== confirmPwd) {
      setPwdErr(t('profile.passwordMismatch'));
      return;
    }
    setPwdLoading(true);
    try {
      const detail = await changePassword(oldPwd, newPwd);
      setPwdMsg(detail);
      setOldPwd('');
      setNewPwd('');
      setConfirmPwd('');
    } catch (err) {
      setPwdErr(getApiErrorMessage(err, t('profile.passwordError')));
    } finally {
      setPwdLoading(false);
    }
  };

  const handleExport = async () => {
    setExportMsg(null);
    setExportErr(null);
    setExportLoading(true);
    try {
      await exportData();
      setExportMsg(t('profile.exportSuccess'));
    } catch (err) {
      setExportErr(getApiErrorMessage(err, t('profile.exportError')));
    } finally {
      setExportLoading(false);
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    setDelErr(null);
    setDelLoading(true);
    try {
      await deleteAccount(delPwd);
      await refresh(); // token effacé -> l'utilisateur passe à null
      navigate('/', { replace: true });
    } catch (err) {
      setDelErr(getApiErrorMessage(err, t('profile.deleteError')));
      setDelLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">{t('profile.title')}</h1>

      {/* Zone 1 : informations */}
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">{t('profile.infoTitle')}</h2>
        {infoMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded">
            {infoMsg}
          </div>
        )}
        {infoErr && (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {infoErr}
          </div>
        )}
        <form onSubmit={handleInfo} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t('profile.firstName')}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t('profile.lastName')}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email{' '}
              {user && !user.email_verified && (
                <span className="text-amber-600 font-normal">{t('profile.emailUnconfirmed')}</span>
              )}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <p className="text-xs text-slate-500 mt-1">{t('profile.emailChangeHint')}</p>
          </div>
          <button type="submit" disabled={infoLoading} className="btn-primary">
            {infoLoading ? t('profile.saving') : t('profile.save')}
          </button>
        </form>
      </section>

      {/* Zone 2 : mot de passe */}
      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">{t('profile.passwordTitle')}</h2>
        {pwdMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded">
            {pwdMsg}
          </div>
        )}
        {pwdErr && (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {pwdErr}
          </div>
        )}
        <form onSubmit={handlePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('profile.passwordCurrent')}
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              className="input"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t('profile.passwordNew')}
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {t('profile.passwordConfirm')}
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <button type="submit" disabled={pwdLoading} className="btn-primary">
            {pwdLoading ? t('profile.passwordLoading') : t('profile.passwordSubmit')}
          </button>
        </form>
      </section>

      {/* Export RGPD (US-15) — Droit d'accès Art. 15 */}
      <section className="card border-l-4 border-indigo-500">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">{t('profile.exportTitle')}</h2>
        <p className="text-sm text-slate-500 mb-4">{t('profile.exportDesc')}</p>
        {exportMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded">
            {exportMsg}
          </div>
        )}
        {exportErr && (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {exportErr}
          </div>
        )}
        <button
          type="button"
          onClick={handleExport}
          disabled={exportLoading}
          className="btn-primary inline-flex items-center gap-2"
        >
          {exportLoading ? <>{t('profile.exportLoading')}</> : <>{t('profile.exportSubmit')}</>}
        </button>
        <p className="text-xs text-slate-400 mt-2">{t('profile.exportHint')}</p>
      </section>

      {/* Zone 3 : danger */}
      <section className="card border-2 border-rose-200">
        <h2 className="text-lg font-semibold text-rose-700 mb-2">{t('profile.dangerTitle')}</h2>
        <p className="text-sm text-slate-600 mb-4">{t('profile.dangerDesc')}</p>
        {delErr && (
          <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
            {delErr}
          </div>
        )}
        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              {t('profile.dangerConfirm')}
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={delPwd}
              onChange={(e) => setDelPwd(e.target.value)}
              className="input"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={delConfirm}
              onChange={(e) => setDelConfirm(e.target.checked)}
            />
            {t('profile.dangerCheckbox')}
          </label>
          <button
            type="submit"
            disabled={delLoading || !delConfirm}
            className="px-4 py-2 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {delLoading ? t('profile.dangerLoading') : t('profile.dangerSubmit')}
          </button>
        </form>
      </section>
    </div>
  );
}
