import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { WeatherResponse } from '../models/weather-response.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  private url =
    'https://api.openweathermap.org/data/2.5/onecall?lat=41&lon=69&units=metric&exclude=minutely,hourly&APPID=53d98d29642ba12c4beeb02c4f566d59';
  constructor(private http: HttpClient) {}

  getDataFor7Days(): Observable<WeatherResponse> {
    return this.http
      .get<WeatherResponse>(this.url)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let response: string = 'Error: ';
    if (error.status === 0) {
      console.error('An error occured: ', error.error);
    } else {
      console.error(
        `Backend returned ${error.status} code, body was `,
        error.error
      );
    }
    return throwError(() => alert(response + error.statusText));
  }
}
