
import React from 'react';
import { TextStats as ITextStats } from '../types';

interface Props {
  stats: ITextStats;
}

const TextStats: React.FC<Props> = ({ stats }) => {
  return (
    <div className="flex gap-6 mt-4 px-1">
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Caracteres</span>
        <span className="text-lg font-bold text-slate-700">{stats.characters}</span>
      </div>
      <div className="flex flex-col border-l border-slate-200 pl-6">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Palavras</span>
        <span className="text-lg font-bold text-slate-700">{stats.words}</span>
      </div>
      <div className="flex flex-col border-l border-slate-200 pl-6">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Frases</span>
        <span className="text-lg font-bold text-slate-700">{stats.sentences}</span>
      </div>
    </div>
  );
};

export default TextStats;
