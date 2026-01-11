
import React, { useState, useMemo } from 'react';
import { countries } from '../data';
import { Country } from '../types';

interface SearchViewProps {
  onBack: () => void;
}

const SearchView: React.FC<SearchViewProps> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return countries.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) || 
      c.capital.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }, [query]);

  const handleSelect = (country: Country) => {
    setSelectedCountry(country);
    setQuery(country.name);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      <div className="p-6 pt-8 bg-white shadow-sm border-b border-slate-100">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-bold text-slate-800 ml-2">Ländersuche</h2>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            autoFocus
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-slate-100 border-none rounded-2xl text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            placeholder="Land oder Hauptstadt eingeben..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedCountry(null);
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {selectedCountry ? (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 flex flex-col items-center text-center">
              <span className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-4 bg-blue-50 px-3 py-1 rounded-full">
                {selectedCountry.continent}
              </span>
              <h3 className="text-2xl text-slate-400 mb-1">Land</h3>
              <div className="text-4xl font-bold text-slate-800 mb-8">{selectedCountry.name}</div>
              
              <div className="w-full h-px bg-slate-100 mb-8" />
              
              <h3 className="text-2xl text-blue-400 mb-1">Hauptstadt</h3>
              <div className="text-4xl font-bold text-blue-600">{selectedCountry.capital}</div>
            </div>
            <button 
              onClick={() => { setQuery(''); setSelectedCountry(null); }}
              className="w-full mt-6 text-slate-400 font-bold py-3 hover:text-slate-600"
            >
              Suche leeren
            </button>
          </div>
        ) : query.trim() ? (
          <div className="space-y-2">
            {suggestions.length > 0 ? (
              suggestions.map((country, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(country)}
                  className="w-full bg-white p-5 rounded-2xl flex justify-between items-center shadow-sm border border-slate-100 active:bg-blue-50 active:scale-[0.98] transition-all"
                >
                  <div className="text-left">
                    <div className="font-bold text-slate-800">{country.name}</div>
                    <div className="text-xs text-slate-400 font-medium uppercase tracking-tighter">{country.continent}</div>
                  </div>
                  <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-slate-300 mb-2">
                  <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-slate-400">Keine Ergebnisse für "{query}"</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 italic">Tippe ein Land ein, um die Hauptstadt zu finden.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
