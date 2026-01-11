
import React, { useState, useMemo, useEffect } from 'react';
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
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Generate 10 questions from current session data
  const quizQuestions: QuizQuestion[] = useMemo(() => {
    return data.map((country) => {
      // Get 3 random wrong capitals
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
    
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
      }
    }, 800);
  };

  const getGermanGrade = (score: number) => {
    if (score === 10) return '1+';
    if (score === 9) return '1';
    if (score >= 7) return '2';
    if (score >= 5) return '3';
    if (score >= 3) return '4';
    return '5';
  };

  const getGradeMessage = (grade: string) => {
    switch(grade) {
      case '1+': return 'Hervorragend! Perfekt gemacht!';
      case '1': return 'Sehr gut!';
      case '2': return 'Gut gemacht!';
      case '3': return 'Befriedigend. Übe weiter!';
      case '4': return 'Ausreichend. Da ist noch Luft nach oben.';
      default: return 'Nicht bestanden. Versuch es noch einmal!';
    }
  };

  if (isFinished) {
    const finalGrade = getGermanGrade(score);
    return (
      <div className="flex-1 flex flex-col p-6 items-center justify-center text-center">
        <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Beendet</h2>
        <p className="text-slate-500 mb-8">Du hast {score} von {quizQuestions.length} Fragen richtig beantwortet.</p>
        
        <div className="bg-white rounded-3xl shadow-xl p-8 w-full mb-8 border border-slate-100">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Deine Note</p>
          <div className="text-6xl font-black text-blue-600 mb-4">{finalGrade}</div>
          <p className="text-slate-700 font-medium">{getGradeMessage(finalGrade)}</p>
        </div>

        <button 
          onClick={onBack}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 active:scale-95 transition-transform"
        >
          Zum Hauptmenü
        </button>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="flex items-center justify-between mb-6 pt-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="flex-1 mx-4">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-300" 
              style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="text-xs font-bold text-slate-400">
          {currentQuestionIndex + 1}/10
        </div>
      </div>

      <div className="flex-1 flex flex-col pt-4">
        <div className="mb-10 text-center">
          <span className="text-blue-500 text-sm font-bold uppercase tracking-widest block mb-2">Hauptstadt gesucht</span>
          <h3 className="text-4xl font-bold text-slate-800">{currentQuestion.country.name}</h3>
        </div>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let bgColor = 'bg-white';
            let textColor = 'text-slate-700';
            let borderColor = 'border-slate-200';

            if (selectedOption) {
              if (option === currentQuestion.correctAnswer) {
                bgColor = 'bg-emerald-500';
                textColor = 'text-white';
                borderColor = 'border-emerald-600';
              } else if (option === selectedOption) {
                bgColor = 'bg-rose-500';
                textColor = 'text-white';
                borderColor = 'border-rose-600';
              }
            }

            return (
              <button
                key={idx}
                disabled={!!selectedOption}
                onClick={() => handleOptionClick(option)}
                className={`w-full py-5 px-6 rounded-2xl text-left font-bold text-lg border-b-4 transition-all active:translate-y-1 ${bgColor} ${textColor} ${borderColor} shadow-sm`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      
      <div className="mt-8 text-center text-slate-400 text-sm">
        Aktuelle Punktzahl: <span className="font-bold text-slate-600">{score}</span>
      </div>
    </div>
  );
};

export default QuizView;
