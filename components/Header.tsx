
import React from 'react';
import { Type, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
          <Type className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">TextCase Pro</h1>
          <p className="text-xs text-slate-400 font-medium">Editor de Capitalização Inteligente</p>
        </div>
      </div>
      <div className="bg-white p-2 rounded-full shadow-sm border border-slate-100">
        <Sparkles className="w-5 h-5 text-indigo-400" />
      </div>
    </header>
  );
};

export default Header;
