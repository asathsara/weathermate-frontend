export interface Weather {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
}


export interface History{
  id: number;
  city: string;
  searchedAt: string; 
  temperature: number;
};