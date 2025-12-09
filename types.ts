export interface QnA {
  question: string;
  answer: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO format or Specific date string
  lunarDate?: string;
  category: string;
  description: string; // Teaser text
  fullDescription: string;
  image: string;
  qa: QnA[];
}

export interface Food {
  id: string;
  name: string;
  description: string;
  details: string;
  image: string;
}

export enum Tab {
  HOME = 'home',
  FOOD = 'food',
  ABOUT = 'about'
}