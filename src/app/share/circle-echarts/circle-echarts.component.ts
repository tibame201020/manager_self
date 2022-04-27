import { Input, SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-echarts',
  templateUrl: './circle-echarts.component.html',
  styleUrls: ['./circle-echarts.component.css']
})
export class CircleEchartsComponent implements OnInit {

  @Input() data: any;
  options: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.setOption();
    }
  }

  setOption() {

    const data: { value: number; name: string; }[] = [];
    this.data.forEach((element: { total: any; subCategory: any; }) => {
      data.push({
        value: element.total,
        name: element.subCategory
      });
    });
    this.options = {
      legend: {
        x: 'left',
        y: 'top'
      },
      tooltip: {},
      series: [
        {
          name: 'composition',
          type: 'pie',
          radius: '85%',
          center: ['35%', '50%'],
          data: data,
          itemStyle: {
            normal: {
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              label: {
                show: true,
                formatter: '{b}{d}%',
                distance: 0.7
              }
            }
          }
        }
      ]
    }
  }

}
