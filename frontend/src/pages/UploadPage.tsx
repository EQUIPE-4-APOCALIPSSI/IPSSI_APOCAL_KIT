import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { generateQuiz } from '@/api/llm';
import { getApiErrorMessage } from '@/api/errors';

export default function UploadPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState<'pdf' | 'text'>('text');
  const [pdf, setPdf] = useState<File | null>(null);
  const [sourceText, setSourceText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const quiz = await generateQuiz({
        title,
        pdf: mode === 'pdf' ? (pdf ?? undefined) : undefined,
        source_text: mode === 'text' ? sourceText : undefined,
      });
      navigate(`/quiz/${quiz.id}`);
    } catch (err) {
      setError(getApiErrorMessage(err, t('upload.error')));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('upload.title')}</h1>
      <p className="text-slate-600 mb-6">
        {t('upload.subtitle')}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">{t('upload.courseTitle')}</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('upload.placeholderTitle')}
            className="input"
          />
        </div>

        <div>
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setMode('text')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                mode === 'text'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
                              {t('upload.textMode')}
            </button>
            <button
              type="button"
              onClick={() => setMode('pdf')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                mode === 'pdf'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
                              {t('upload.pdfMode')}
            </button>
          </div>

          {mode === 'text' ? (
            <textarea
              required
              rows={10}
              minLength={200}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
                            placeholder={t('upload.placeholderText')}
              className="input"
            />
          ) : (
            <input
              type="file"
              accept=".pdf,application/pdf"
              required
              onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
              className="input"
            />
          )}
          {mode === 'text' && (
            <p className="text-xs text-slate-500 mt-1">
                            {sourceText.length} / 200 {t('upload.charsMin')}
            </p>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? t('upload.loading') : t('upload.submit')}
        </button>

        <p className="text-xs text-slate-500 text-center">
                    {t('upload.desc')}
        </p>
      </form>
    </div>
  );
}
