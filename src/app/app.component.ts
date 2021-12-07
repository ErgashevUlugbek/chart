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
  public temperatures: number[] = [];
  subscription!: Subscription;
  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit(): void {
    this.subscription = this.weatherApiService
      .getDataFor7Days()
      .subscribe((data: WeatherResponse) => {
        data.daily.map((day: WeatherDaily) => {
          console.log(day);
          this.temperatures.push(
            day.temp.night,
            day.temp.morn,
            day.temp.day,
            day.temp.eve
          );
        });
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
