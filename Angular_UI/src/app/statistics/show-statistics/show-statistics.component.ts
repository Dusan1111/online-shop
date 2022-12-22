import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StatisticsService } from 'src/app/services/statisticsService';

@Component({
  selector: 'app-show-statistics',
  templateUrl: './show-statistics.component.html',
  styleUrls: ['./show-statistics.component.css']
})
export class ShowStatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) { }

  lineChartData: ChartDataSets[] = [
    {
      data: [] = [],
      label: 'Profit in RSD'
    },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartLegend = true;
  lineChartType: ChartType = "line";
  lineChartPlugins: any = [];

  // Define colors of chart segments
  lineChartColors: Color[] = [
    { // dark grey
      backgroundColor: 'rgba(185, 237, 244, 1)',
      borderColor: 'rgba(29, 133, 252, 1)',
    },
  ];

  ngOnInit(): void {
    this.getChartData(2021);
  }

  getChartData(year: any) {
    let list: any = [];
    this.lineChartLabels = [];
    this.lineChartData[0].data = [];

    this.statisticsService.getChartData(year).subscribe(data => {
      list = data;
    for (const [key, value] of Object.entries(list)) {
      this.lineChartLabels.push(key);
      this.lineChartData[0].data.push(value as number);
      }
    });
  }

  graphYearSelected(event: any) {
    console.log(event.target.value)
    this.getChartData(event.target.value);
  }
}
