
import React, { useState } from 'react';
import { FilterType, AppMode } from '../types';

interface HomeProps {
  onStart: (mode: AppMode, filter: FilterType) => void;
  onSearch: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart, onSearch }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('ALL');

  const filters: { label: string; value: FilterType }[] = [
    { label: 'Alle Länder', value: 'ALL' },
    { label: 'Europa', value: 'EUROPA' },
    { label: 'Asien', value: 'ASIEN' },
    { label: 'Afrika', value: 'AFRIKA' },
    { label: 'Nordamerika', value: 'NORDAMERIKA' },
    { label: 'Südamerika', value: 'SÜDAMERIKA' },
    { label: 'Ozeanien', value: 'OZEANIEN' },
    { label: 'A-Z', value: 'ALPHABETICAL' },
    { label: 'Mix 10', value: 'RANDOM_10' },
    { label: 'Mix 20', value: 'RANDOM_20' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-slate-50">
      <header className="mb-10 text-center pt-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl shadow-blue-200 rotate-3">
           <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Hauptstadt-Meister</h1>
        <p className="text-slate-400 font-semibold text-sm">Entdecke die Welt auf Deutsch</p>
      </header>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-5 px-1">
          <h2 className="text-xl font-black text-slate-800">Einheit</h2>
          <button 
            onClick={onSearch}
            className="flex items-center text-blue-600 font-black text-sm bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100 active:scale-90 transition-transform"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            SUCHE
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedFilter(f.value)}
              className={`py-4 px-4 rounded-2xl text-sm font-black transition-all border-b-[4px] ${
                selectedFilter === f.value
                  ? 'bg-blue-600 text-white border-blue-800 shadow-lg shadow-blue-100 -translate-y-1'
                  : 'bg-white text-slate-600 border-slate-200 active:translate-y-0.5 active:border-b-0'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-auto space-y-4 pb-10">
        <button
          onClick={() => onStart('flashcards', selectedFilter)}
          className="w-full bg-blue-600 text-white py-5 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-blue-200 active:scale-[0.97] transition-all flex items-center justify-center space-x-3 border-b-8 border-blue-800"
        >
          <span>📖 LERNEN</span>
        </button>

        <button
          onClick={() => onStart('quiz', selectedFilter)}
          className="w-full bg-emerald-500 text-white py-5 rounded-[1.5rem] font-black text-xl shadow-2xl shadow-emerald-100 active:scale-[0.97] transition-all flex items-center justify-center space-x-3 border-b-8 border-emerald-700"
        >
          <span>🎯 QUIZ STARTEN</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
