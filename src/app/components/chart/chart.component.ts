import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { Options } from 'highcharts/highstock';
import IndicatorsCore from 'highcharts/indicators/indicators';
import IndicatorZigzag from 'highcharts/indicators/zigzag';
IndicatorsCore(Highcharts);
IndicatorZigzag(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  @Input() data!: number[];
  today = new Date();
  Highcharts: typeof Highcharts = Highcharts;
  isHighcharts = typeof Highcharts === 'object';
  series!: Highcharts.SeriesOptionsType[] | undefined;

  chartOptions: Options = {
    chart: {
      width: 1000,
    },

    title: {
      text: 'Weekly tempreature',
      style: {
        fontSize: '2rem',
        fontWeight: 'bold',
      },
    },

    yAxis: {
      opposite: false,
      lineWidth: 1,
      tickWidth: 1,
      title: {
        text: 'Tempreature &#8451;',
        style: {
          fontSize: '1rem',
        },
      },
    },

    tooltip: {
      valueSuffix: ' &#8451;',
    },

    plotOptions: {
      series: {
        pointInterval: 6 * 3600 * 1000,
        pointStart: Date.UTC(
          this.today.getFullYear(),
          this.today.getMonth(),
          this.today.getDate()
        ),
        marker: {
          enabled: true,
          radius: 3,
          lineWidth: 1,
        },
      },
    },
    series: [
      {
        type: 'spline',
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.series = this.chartOptions.series;
    this.series
      ? this.series[0].type === 'spline'
        ? (this.series[0].data = this.data)
        : []
      : [];
  }
}
