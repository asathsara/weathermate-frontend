export interface Weather {
  city: string;
  temp: number;
  description: string;
  searchedAt: string;
}

export type History = Weather[];