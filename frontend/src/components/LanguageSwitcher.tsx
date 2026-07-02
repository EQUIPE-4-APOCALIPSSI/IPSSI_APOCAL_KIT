import { useTranslation } from 'react-i18next';

const FLAGS: Record<string, string> = { fr: '🇫🇷', en: '🇬🇧' };

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const toggle = () => {
    const next = current === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(next);
  };

  return (
    <button
      onClick={toggle}
      className="text-sm px-2 py-1 rounded hover:bg-slate-100 transition"
      title={current === 'fr' ? 'Switch to English' : 'Passer en français'}
    >
      {FLAGS[current]} {current.toUpperCase()}
    </button>
  );
}
