
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clipboard, 
  Copy, 
  Trash2, 
  ALargeSmall, 
  CaseUpper, 
  CaseLower, 
  Type as TypeIcon,
  ArrowLeftRight,
  Eraser, 
  CheckCircle2,
  ExternalLink,
  AlertCircle
} from 'lucide-react';
import Header from './components/Header';
import TextStats from './components/TextStats';
import { TextStats as ITextStats, TransformationType } from './types';
import { 
  toSentenceCase, 
  toTitleCase, 
  toAlternatingCase, 
  toInverseCase, 
  cleanExtraSpaces 
} from './utils/textTransforms';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const [pasteError, setPasteError] = useState(false);
  const [stats, setStats] = useState<ITextStats>({ characters: 0, words: 0, sentences: 0 });

  useEffect(() => {
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    const sentences = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    setStats({ characters: chars, words, sentences });
  }, [text]);

  const handlePaste = async () => {
    setPasteError(false);
    try {
      if (!navigator.clipboard || !navigator.clipboard.readText) {
        throw new Error('Clipboard API not available');
      }
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      console.warn('Falha ao ler área de transferência:', err);
      setPasteError(true);
      setTimeout(() => setPasteError(false), 4000);
    }
  };

  const handleCopy = () => {
    if (!text) return;
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const transform = (type: TransformationType) => {
    if (!text) return;
    let newText = text;
    switch (type) {
      case 'lowercase': newText = text.toLowerCase(); break;
      case 'uppercase': newText = text.toUpperCase(); break;
      case 'titlecase': newText = toTitleCase(text); break;
      case 'sentencecase': newText = toSentenceCase(text); break;
      case 'alternating': newText = toAlternatingCase(text); break;
      case 'inverse': newText = toInverseCase(text); break;
      case 'clean': newText = cleanExtraSpaces(text); break;
    }
    setText(newText);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex flex-col items-center justify-start">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100 mb-6">
        <Header />

        {/* Text Area Container */}
        <div className="relative group">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite ou cole seu texto aqui..."
            className="w-full h-64 md:h-80 p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white outline-none text-slate-700 text-lg leading-relaxed transition-all resize-none shadow-inner"
          />
          
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setText('')}
              className="p-2 bg-white/80 backdrop-blur text-rose-500 rounded-lg shadow-sm hover:bg-rose-50 transition-colors"
              title="Limpar tudo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button 
              onClick={handlePaste}
              className={`p-2 bg-white/80 backdrop-blur rounded-lg shadow-sm transition-colors flex items-center gap-2 ${
                pasteError ? 'text-amber-600 bg-amber-50' : 'text-indigo-600 hover:bg-indigo-50'
              }`}
              title="Colar"
            >
              <Clipboard className="w-4 h-4" />
              <span className="text-xs font-semibold">Colar</span>
            </button>
          </div>

          {pasteError && (
            <div className="absolute bottom-4 left-4 right-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Acesso à área de transferência bloqueado pelo navegador. Use <b>Ctrl+V</b> ou <b>Cmd+V</b>.</span>
              </div>
            </div>
          )}
        </div>

        <TextStats stats={stats} />

        {/* Transformations Grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-3">
          <TransformButton 
            onClick={() => transform('sentencecase')} 
            icon={<ALargeSmall className="w-5 h-5" />} 
            label="Frase case"
          />
          <TransformButton 
            onClick={() => transform('lowercase')} 
            icon={<CaseLower className="w-5 h-5" />} 
            label="minúsculas"
          />
          <TransformButton 
            onClick={() => transform('uppercase')} 
            icon={<CaseUpper className="w-5 h-5" />} 
            label="MAIÚSCULAS"
          />
          <TransformButton 
            onClick={() => transform('titlecase')} 
            icon={<TypeIcon className="w-5 h-5" />} 
            label="Título Case"
          />
          <TransformButton 
            onClick={() => transform('alternating')} 
            icon={<ArrowLeftRight className="w-5 h-5 rotate-90" />} 
            label="AlTeRnAdO"
          />
          <TransformButton 
            onClick={() => transform('clean')} 
            icon={<Eraser className="w-5 h-5" />} 
            label="Limpar Espaços"
          />
        </div>

        {/* Action Button */}
        <div className="mt-10">
          <button
            onClick={handleCopy}
            disabled={!text}
            className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 transition-all transform active:scale-95 font-bold text-lg shadow-lg ${
              copied 
                ? 'bg-emerald-500 text-white shadow-emerald-200' 
                : 'bg-indigo-600 text-white shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:shadow-none disabled:active:scale-100'
            }`}
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-6 h-6 animate-bounce" />
                Copiado com Sucesso!
              </>
            ) : (
              <>
                <Copy className="w-6 h-6" />
                Copiar Texto Formatado
              </>
            )}
          </button>
        </div>

        {/* UX Feedback / Tips */}
        <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 italic">
                Dica: O texto é atualizado automaticamente ao clicar nas opções acima.
            </p>
        </div>
      </div>

      {/* Footer Creditos */}
      <footer className="w-full text-center py-4">
        <p className="text-sm text-slate-500 font-medium">
          Desenvolvido por{' '}
          <a 
            href="https://ridolfiweb.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-800 transition-colors inline-flex items-center gap-1 group border-b border-transparent hover:border-indigo-300"
          >
            RidolfiWEB
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </p>
      </footer>
    </div>
  );
};

interface TransformButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TransformButton: React.FC<TransformButtonProps> = ({ onClick, icon, label }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-slate-100 bg-white hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-md transition-all group"
    >
      <div className="text-slate-400 group-hover:text-indigo-600 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-tight group-hover:text-indigo-700">
        {label}
      </span>
    </button>
  );
};

export default App;
