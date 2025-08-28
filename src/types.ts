export interface Weather {
  city: string;
  temp: number;
  description: string;
  searchedAt: string; // keep as string since backend sends ISO or formatted date
}

// If you want a collection of history
export type History = Weather[];