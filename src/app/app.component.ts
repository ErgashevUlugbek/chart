import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherApiService } from 'src/app/services/weather-api.service';
import { WeatherDaily, WeatherResponse } from './models/weather-response.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public tempreatures: number[] = [];
  subscription!: Subscription;
  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    this.subscription = this.weatherApiService
      .getDataFor7Days()
      .subscribe((data: WeatherResponse) => {
        data.daily.map((day: WeatherDaily) => {
          this.tempreatures.push(
            this.kelvinToCelcius(day.temp.night),
            this.kelvinToCelcius(day.temp.morn),
            this.kelvinToCelcius(day.temp.day),
            this.kelvinToCelcius(day.temp.eve)
          );
        });
      });
  }

  kelvinToCelcius(kelvin: number) {
    return Math.round(kelvin - 273.15);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
