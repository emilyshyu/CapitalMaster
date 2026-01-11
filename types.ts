
export interface Country {
  name: string;
  capital: string;
  continent: string;
}

export type AppMode = 'home' | 'flashcards' | 'quiz' | 'search';

export type FilterType = 
  | 'ALL' 
  | 'EUROPA' 
  | 'ASIEN' 
  | 'AFRIKA' 
  | 'NORDAMERIKA' 
  | 'SÜDAMERIKA' 
  | 'OZEANIEN'
  | 'RANDOM_10'
  | 'RANDOM_20'
  | 'ALPHABETICAL';

export interface QuizQuestion {
  country: Country;
  options: string[];
  correctAnswer: string;
}
