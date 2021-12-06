import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherResponse } from '../models/weather-response.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private url =
    'http://api.openweathermap.org/data/2.5/onecall?lat=41&lon=69&exclude=minutely,hourly&APPID=53d98d29642ba12c4beeb02c4f566d59';
  constructor(private http: HttpClient) {}

  getDataFor7Days(): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(this.url);
  }
}
