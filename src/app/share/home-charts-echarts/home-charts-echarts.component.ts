import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home-charts-echarts',
  templateUrl: './home-charts-echarts.component.html',
  styleUrls: ['./home-charts-echarts.component.css']
})
export class HomeChartsEchartsComponent implements OnInit {

  @Input() xAxisData!: string[];
  @Input() accountData!: any[];
  @Input() fitData!: any[];
  @Input() eatData!: any[];
  options: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.xAxisData) {
      this.generateChart();
    }
  }

  generateChart() {
    const account = '每日支出總金額';
    const eat = '每日進食總熱量';
    const fit = '每日運動總熱量';
    this.options = {
      legend: {
        x: 'center',
        y: 'top'
      },
      tooltip: {
      },
      xAxis: {
        type: 'category',
        data: this.xAxisData,
      },
      yAxis: {
        scale: true,
      },
      series: [
        {
          name: account,
          type: 'line',
          data: this.accountData,
          animationDelay: (idx: number) => idx * 10,
          itemStyle: {
            normal: {
              color: 'lightblue'
            }
          }
        },
        {
          name: eat,
          type: 'line',
          data: this.eatData,
          animationDelay: (idx: number) => idx * 10,
          itemStyle: {
            normal: {
              color: 'lightgreen'
            }
          }
        },
        {
          name: fit,
          type: 'line',
          data: this.fitData,
          animationDelay: (idx: number) => idx * 10,
          itemStyle: {
            normal: {
              color: 'red'
            }
          }
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5
    };
  }

}
