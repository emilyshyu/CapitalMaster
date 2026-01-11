
import React, { useState, useCallback } from 'react';
import { countries } from './data';
import { AppMode, FilterType, Country } from './types';
import Home from './components/Home';
import FlashcardView from './components/FlashcardView';
import QuizView from './components/QuizView';
import SearchView from './components/SearchView';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>('home');
  const [filter, setFilter] = useState<FilterType>('ALL');
  const [currentSessionData, setCurrentSessionData] = useState<Country[]>([]);

  const startSession = useCallback((newMode: AppMode, newFilter: FilterType) => {
    let filtered = [...countries];
    
    // Continent filters
    const continentMap: Record<string, string> = {
      'EUROPA': 'Europa',
      'ASIEN': 'Asien',
      'AFRIKA': 'Afrika',
      'NORDAMERIKA': 'Nordamerika',
      'SÜDAMERIKA': 'Südarmerika',
      'OZEANIEN': 'Ozeanien'
    };

    if (continentMap[newFilter]) {
      filtered = filtered.filter(c => c.continent === continentMap[newFilter]);
    }

    // Logic for Random Mix or A-Z
    if (newFilter === 'ALPHABETICAL') {
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'de'));
    } else if (newFilter === 'RANDOM_10') {
      filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    } else if (newFilter === 'RANDOM_20') {
      filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, 20);
    } else {
      filtered = filtered.sort(() => 0.5 - Math.random());
    }

    // Quiz Session Setup (Always exactly 10 if possible)
    if (newMode === 'quiz') {
      if (filtered.length < 10) {
        const extra = countries
          .filter(c => !filtered.includes(c))
          .sort(() => 0.5 - Math.random())
          .slice(0, 10 - filtered.length);
        filtered = [...filtered, ...extra].sort(() => 0.5 - Math.random());
      }
      filtered = filtered.slice(0, 10);
    }

    setCurrentSessionData(filtered);
    setFilter(newFilter);
    setMode(newMode);
  }, []);

  const goBack = useCallback(() => {
    setMode('home');
  }, []);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-slate-50 shadow-2xl flex flex-col relative">
      <div className="flex-1 flex flex-col">
        {mode === 'home' && (
          <Home onStart={startSession} onSearch={() => setMode('search')} />
        )}
        
        {mode === 'flashcards' && (
          <FlashcardView 
            data={currentSessionData} 
            onBack={goBack} 
            filterLabel={filter}
          />
        )}
        
        {mode === 'quiz' && (
          <QuizView 
            data={currentSessionData} 
            onBack={goBack}
          />
        )}

        {mode === 'search' && (
          <SearchView onBack={goBack} />
        )}
      </div>
      
      {/* Bottom Safe Area Background */}
      <div className="h-[env(safe-area-inset-bottom)] bg-slate-50 w-full shrink-0" />
    </div>
  );
};

export default App;
