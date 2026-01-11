
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
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];
    return countries.filter(c => 
      c.name.toLowerCase().includes(trimmed) || 
      c.capital.toLowerCase().includes(trimmed)
    ).slice(0, 10);
  }, [query]);

  return (
    <div className="flex-1 flex flex-col bg-white animate-in slide-in-from-bottom-10 duration-300">
      <div className="p-6 pt-10">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="p-2 -ml-2 text-slate-800 bg-slate-100 rounded-full active:scale-90 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-black text-slate-800 ml-4">Suche</h2>
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            autoFocus
            type="text"
            className="block w-full pl-12 pr-4 py-5 bg-slate-50 border-2 border-transparent rounded-[1.5rem] text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-500 focus:ring-0 transition-all font-bold text-lg"
            placeholder="Land oder Stadt..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedCountry(null);
            }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        {selectedCountry ? (
          <div className="animate-in fade-in zoom-in duration-500 pt-4">
            <div className="bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 text-center relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              
              <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
                {selectedCountry.continent}
              </span>
              
              <div className="space-y-10">
                <div>
                  <p className="text-slate-500 text-sm font-bold uppercase mb-2">Land</p>
                  <h3 className="text-4xl font-black text-white">{selectedCountry.name}</h3>
                </div>
                
                <div className="h-px bg-slate-800 w-1/2 mx-auto"></div>
                
                <div>
                  <p className="text-blue-500 text-sm font-bold uppercase mb-2 tracking-widest">Hauptstadt</p>
                  <h3 className="text-5xl font-black text-blue-400">{selectedCountry.capital}</h3>
                </div>
              </div>
            </div>
            <button 
              onClick={() => { setQuery(''); setSelectedCountry(null); }}
              className="w-full mt-8 text-slate-400 font-black py-4 active:text-blue-500 transition-colors uppercase tracking-widest text-sm"
            >
              Neue Suche
            </button>
          </div>
        ) : query.trim() ? (
          <div className="space-y-3">
            {suggestions.length > 0 ? (
              suggestions.map((country, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCountry(country);
                    setQuery(country.name);
                  }}
                  className="w-full bg-slate-50 p-6 rounded-3xl flex justify-between items-center active:bg-blue-600 active:text-white group transition-all"
                >
                  <div className="text-left">
                    <div className="font-black text-lg text-slate-800 group-active:text-white">{country.name}</div>
                    <div className="text-xs text-slate-400 font-bold group-active:text-blue-200">{country.continent}</div>
                  </div>
                  <div className="w-10 h-10 bg-white group-active:bg-blue-500 rounded-2xl flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-blue-600 group-active:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-300 text-lg font-bold">Nichts gefunden 🕵️‍♂️</p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-300">
             <svg className="w-20 h-20 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
             <p className="font-bold text-slate-400 italic">Such nach einem Land...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
