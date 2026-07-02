import { useTranslation } from 'react-i18next';

const LANGUAGES: { code: string; flag: string; label: string }[] = [
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language?.split('-')[0] || 'fr';

  const nextLang = () => {
    const idx = LANGUAGES.findIndex((l) => l.code === current);
    return LANGUAGES[(idx + 1) % LANGUAGES.length]!;
  };

  const toggle = () => {
    const next = nextLang();
    i18n.changeLanguage(next.code);
  };

  const lang = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];
  if (!lang) return null;

  return (
    <button
      onClick={toggle}
      className="text-sm px-2 py-1 rounded hover:bg-slate-100 transition"
      title={lang.label}
    >
      {lang.flag} {lang.code.toUpperCase()}
    </button>
  );
}
