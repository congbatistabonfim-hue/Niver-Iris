import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gold-400 p-2 rounded-full text-white">
            <Sparkles size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-serif font-bold text-gray-900">Celebrando 45 Anos</h1>
            <p className="text-xs text-gray-500 uppercase tracking-wider">Criador de Memórias de Viagem</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <span className="text-sm text-gray-600 hidden sm:block">Edição Especial: Rio de Janeiro & Vida</span>
           <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-gold-400 to-rose-500"></div>
        </div>
      </div>
    </header>
  );
};