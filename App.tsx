
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
    if (['EUROPA', 'ASIEN', 'AFRIKA', 'NORDAMERIKA', 'SÜDAMERIKA', 'OZEANIEN'].includes(newFilter)) {
      const continentMap: Record<string, string> = {
        'EUROPA': 'Europa',
        'ASIEN': 'Asien',
        'AFRIKA': 'Afrika',
        'NORDAMERIKA': 'Nordamerika',
        'SÜDAMERIKA': 'Südarmerika',
        'OZEANIEN': 'Ozeanien'
      };
      filtered = filtered.filter(c => c.continent === continentMap[newFilter]);
    }

    // Sorting/Randomizing
    if (newFilter === 'ALPHABETICAL') {
      filtered.sort((a, b) => a.name.localeCompare(b.name, 'de'));
    } else if (newFilter === 'RANDOM_10') {
      filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
    } else if (newFilter === 'RANDOM_20') {
      filtered = filtered.sort(() => 0.5 - Math.random()).slice(0, 20);
    } else {
      // Default shuffle for flashcards and quiz if not alphabetical
      filtered = filtered.sort(() => 0.5 - Math.random());
    }

    // Special case for Quiz: Quiz always needs 10 questions
    if (newMode === 'quiz' && filtered.length < 10) {
      const extra = countries
        .filter(c => !filtered.includes(c))
        .sort(() => 0.5 - Math.random())
        .slice(0, 10 - filtered.length);
      filtered = [...filtered, ...extra].sort(() => 0.5 - Math.random());
    } else if (newMode === 'quiz') {
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
    <div className="min-h-screen max-w-md mx-auto bg-slate-50 shadow-xl overflow-hidden flex flex-col">
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
      
      {/* Safe Area Padding for iPhone */}
      <div className="h-8 bg-slate-50 w-full shrink-0" />
    </div>
  );
};

export default App;
