
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
    { label: 'Alphabetisch', value: 'ALPHABETICAL' },
    { label: 'Zufällig (10)', value: 'RANDOM_10' },
    { label: 'Zufällig (20)', value: 'RANDOM_20' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <header className="mb-8 text-center pt-8 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
           <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Hauptstadt-Meister</h1>
        <p className="text-slate-500">Lerne die Hauptstädte der Welt</p>
      </header>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4 px-1">
          <h2 className="text-lg font-semibold text-slate-700">Einheit wählen</h2>
          <button 
            onClick={onSearch}
            className="flex items-center text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
          >
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Suche
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedFilter(f.value)}
              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                selectedFilter === f.value
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <div className="mt-auto space-y-4 pb-8">
        <button
          onClick={() => onStart('flashcards', selectedFilter)}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 active:scale-95 transition-transform flex items-center justify-center space-x-2"
        >
          <span>Lernen (Flashcards)</span>
        </button>

        <button
          onClick={() => onStart('quiz', selectedFilter)}
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-emerald-200 active:scale-95 transition-transform flex items-center justify-center space-x-2"
        >
          <span>Quiz starten</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
