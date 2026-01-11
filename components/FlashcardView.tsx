
import React, { useState } from 'react';
import { Country } from '../types';

interface FlashcardViewProps {
  data: Country[];
  onBack: () => void;
  filterLabel: string;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ data, onBack, filterLabel }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const country = data[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
    }, 150);
  };

  if (!country) return null;

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="flex items-center justify-between mb-8 pt-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{filterLabel}</h2>
          <p className="text-xs text-slate-400">{currentIndex + 1} von {data.length}</p>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center">
        <div 
          className="relative w-full aspect-[4/5] perspective-1000 cursor-pointer"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={`relative w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front Side */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 border border-slate-100">
              <span className="text-blue-500 text-sm font-bold uppercase mb-4 tracking-widest">{country.continent}</span>
              <h3 className="text-4xl font-bold text-slate-800 text-center">{country.name}</h3>
              <p className="mt-8 text-slate-400 text-sm">Tippe zum Umdrehen</p>
            </div>
            
            {/* Back Side */}
            <div className="absolute inset-0 backface-hidden bg-blue-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 rotate-y-180">
              <span className="text-blue-200 text-sm font-bold uppercase mb-4 tracking-widest">Die Hauptstadt ist:</span>
              <h3 className="text-4xl font-bold text-white text-center">{country.capital}</h3>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-between mt-12 gap-4">
          <button 
            onClick={handlePrev}
            className="flex-1 bg-slate-200 text-slate-600 py-4 rounded-2xl font-bold active:scale-95 transition-transform"
          >
            Zurück
          </button>
          <button 
            onClick={handleNext}
            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 active:scale-95 transition-transform"
          >
            Nächste
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardView;
