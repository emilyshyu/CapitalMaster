
import React, { useState, useMemo } from 'react';
import { Country, QuizQuestion } from '../types';
import { countries } from '../data';

interface QuizViewProps {
  data: Country[];
  onBack: () => void;
}

const QuizView: React.FC<QuizViewProps> = ({ data, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Generate and lock questions to prevent re-shuffling on state updates
  const quizQuestions: QuizQuestion[] = useMemo(() => {
    return data.map((country) => {
      const wrongOptions = countries
        .filter(c => c.capital !== country.capital)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(c => c.capital);
      
      const options = [...wrongOptions, country.capital].sort(() => 0.5 - Math.random());
      
      return {
        country,
        options,
        correctAnswer: country.capital
      };
    });
  }, [data]);

  const handleOptionClick = (option: string) => {
    if (selectedOption) return; 
    setSelectedOption(option);
    if (option === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const getGermanGrade = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return '1+';
    if (percentage >= 90) return '1';
    if (percentage >= 80) return '2';
    if (percentage >= 65) return '3';
    if (percentage >= 50) return '4';
    return '6';
  };

  if (isFinished) {
    const finalGrade = getGermanGrade(score, quizQuestions.length);
    return (
      <div className="flex-1 flex flex-col p-8 items-center justify-center text-center animate-in fade-in duration-700">
        <div className="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-emerald-200 rotate-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Abgeschlossen!</h2>
        
        <div className="bg-white rounded-[3rem] shadow-2xl p-12 w-full mb-10 border border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-blue-500"></div>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-4">Deine Note</p>
          <div className="text-8xl font-black text-blue-600 mb-6 tracking-tighter">{finalGrade}</div>
          <p className="text-slate-500 font-bold text-lg">{score} von {quizQuestions.length} richtig</p>
        </div>

        <button 
          onClick={onBack} 
          className="w-full bg-slate-900 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl active:scale-95 transition-all border-b-8 border-slate-700"
        >
          ZURÜCK ZUM MENÜ
        </button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-10 pt-6">
        <button onClick={onBack} className="p-3 bg-white rounded-2xl shadow-sm text-slate-400 active:scale-75 transition-transform border border-slate-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1 mx-6">
          <div className="h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-blue-500 transition-all duration-700 ease-out" 
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-sm font-black text-slate-400 font-mono bg-white px-3 py-1 rounded-lg border border-slate-100">
          {currentQuestionIndex + 1}/{quizQuestions.length}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="mb-12 text-center">
          <span className="text-blue-500 text-sm font-black uppercase tracking-[0.2em] block mb-3">DIE HAUPTSTADT VON...</span>
          <h3 className="text-4xl font-black text-slate-800 leading-tight tracking-tight">{currentQuestion.country.name}</h3>
        </div>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let style = "bg-white border-slate-200 text-slate-700";
            if (selectedOption) {
              if (option === currentQuestion.correctAnswer) {
                style = "bg-emerald-500 border-emerald-700 text-white shadow-xl shadow-emerald-100 scale-[1.02]";
              } else if (option === selectedOption) {
                style = "bg-rose-500 border-rose-700 text-white shadow-xl shadow-rose-100";
              } else {
                style = "bg-slate-50 border-slate-100 text-slate-300 opacity-40";
              }
            }

            return (
              <button
                key={idx}
                disabled={!!selectedOption}
                onClick={() => handleOptionClick(option)}
                className={`w-full py-6 px-8 rounded-[2rem] text-left font-black text-xl border-b-[6px] transition-all flex items-center justify-between ${style} ${!selectedOption && 'hover:border-blue-300 active:translate-y-1 active:border-b-0 shadow-sm'}`}
              >
                <span className="truncate">{option}</span>
                {selectedOption && option === currentQuestion.correctAnswer && (
                   <svg className="w-8 h-8 shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                )}
              </button>
            );
          })}
        </div>

        <div className="h-28 flex items-center justify-center">
          {selectedOption && (
            <button 
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl animate-in slide-in-from-bottom-6 border-b-8 border-blue-800 active:translate-y-1 active:border-b-4"
            >
              WEITERGEHEN →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizView;
