import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-line-echarts',
  templateUrl: './line-echarts.component.html',
  styleUrls: ['./line-echarts.component.css']
})
export class LineEchartsComponent implements OnInit {

  @Input() xAxisData!: any;
  @Input() yAxisData!: any;
  options: any;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.xAxisData && this.yAxisData) {
      this.generateChart();
    }
  }

  generateChart() {
    const title = this.getTitle();
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
          name: title,
          type: 'line',
          data: this.yAxisData,
          animationDelay: (idx: number) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5
    };
  }

  getTitle() {
    const path = window.location.pathname.replace("/", "");
    switch (path) {
      case 'account':
        return '每日總支出';
      case 'eat':
        return '每日進食總熱量(卡路里)';
      case 'fit':
        return '每日消耗總熱量(卡路里)';
      default:
        return '';
    }
  }
}
