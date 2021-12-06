export interface WeatherResponse {
  current: WeatherDaily;
  daily: WeatherDaily[];
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}

export interface WeatherDaily {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: object;
  humidty: number;
  moon_phase: number;
  moonrise: number;
  moonset: number;
  pop: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  uvi: number;
  weather: any[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
