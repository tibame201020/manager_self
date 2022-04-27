import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { AddItem } from 'src/app/model/addItem';
import { SplitItemsService } from 'src/app/split-items.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {


  @Input() data!: AddItem[];
  @Input() range!: any;
  circleEchartsData: any;
  dateRange: any;
  start: any;
  end: any;
  dateArray: string[] = [];
  lineEchartsData: any;

  constructor(private SplitItemsService: SplitItemsService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.generateDateArray();
      this.generateCircleData();
    }
  }

  generateDateArray() {
    this.start = new Date(this.range.start);
    this.end = new Date(this.range.end);
    let dateArray: string[] = [];
    for (let date = this.start; date <= this.end; date.setDate(date.getDate() + 1)) {
      dateArray.push(date.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("/", "-"));
    }
    this.dateArray = dateArray;
    this.generateLineData();
  }

  generateLineData() {
    let groupByDateObj = this.SplitItemsService.splitItmGroupByKey(this.data, 'date', 'obj');
    this.lineEchartsData = this.SplitItemsService.generateLineEchartsData(this.dateArray, groupByDateObj);

  }

  generateCircleData() {
    let groupBySubCategoryArray = this.SplitItemsService.splitItmGroupByKey(this.data, 'subCategory', '');
    let circleEchartsData = this.SplitItemsService.generateCircleEchartsData(groupBySubCategoryArray);
    this.circleEchartsData = circleEchartsData;
  }

}
