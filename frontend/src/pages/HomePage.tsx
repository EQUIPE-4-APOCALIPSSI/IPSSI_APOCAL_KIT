import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          <Trans i18nKey="home.title">
            Révise mieux,{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-amber-500 bg-clip-text text-transparent">
              grâce à l'IA.
            </span>
          </Trans>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t('home.subtitle')}</p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {user ? (
            <>
              <Link to="/upload" className="btn-primary px-6 py-3 text-base">
                {t('home.createQuiz')}
              </Link>
              <Link to="/history" className="btn-secondary px-6 py-3 text-base">
                {t('home.myHistory')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn-primary px-6 py-3 text-base">
                {t('home.cta')}
              </Link>
              <Link to="/login" className="btn-secondary px-6 py-3 text-base">
                {t('home.login')}
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-2xl mb-2">📄</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('home.cardUpload')}</h3>
          <p className="text-sm">{t('home.cardUploadDesc')}</p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">🤖</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('home.cardQcm')}</h3>
          <p className="text-sm">{t('home.cardQcmDesc')}</p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2">📈</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('home.cardProgress')}</h3>
          <p className="text-sm">{t('home.cardProgressDesc')}</p>
        </div>
      </section>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded text-sm">
        <strong className="text-slate-900">{t('home.banner')}</strong> {t('home.bannerDesc')}{' '}
        <a
          href="https://github.com/melafrit/IPSSI_APOCAL_KIT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline"
        >
          README
        </a>
        .
      </div>
    </div>
  );
}
