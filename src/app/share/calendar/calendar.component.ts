import { AddItemService } from './../../add-item.service';
import { AddItem } from './../../model/addItem';
import { ItemService } from './../../item.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarOptions, formatDate } from '@fullcalendar/angular';
import { SplitItemsService } from 'src/app/split-items.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAddItemsComponent } from '../edit-add-items/edit-add-items.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.dateClick.bind(this),
    datesSet: this.handleDatesRender.bind(this),
    eventClick: this.eventClick.bind(this),
  };
  selected = new Date().toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("-", "").replace("-", "").replace("/", "").replace("/", "");
  selectedText = new Date().toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("/", "-").replace("/", "-");
  start: any;
  end: any;
  data: AddItem[] = [];
  circleEchartsData: any;

  @Input() itemLength!: number;
  @Output() refresh = new EventEmitter<string>();

  constructor(
    private ItemService: ItemService,
    public AddItemService: AddItemService,
    private SplitItemsService: SplitItemsService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDayData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.itemLength == 0) {
      this.getRangeData();
      this.getDayData();
    }
  }

  dateClick(arg: any) {
    this.selected = arg.dateStr.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("-", "");
    this.selectedText = arg.dateStr.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" });
    this.getDayData();
  }

  getDayData() {
    this.ItemService.getItemsByCategory(this.getPath(), this.selected, this.selected).subscribe(
      res => {
        this.data = res;
        let groupBySubCategoryArray = this.SplitItemsService.splitItmGroupByKey(this.data, 'subCategory', '');
        let circleEchartsData = this.SplitItemsService.generateCircleEchartsData(groupBySubCategoryArray);
        this.circleEchartsData = circleEchartsData;
        this.itemLength = 1;
      }
    )
  }

  getRangeData() {
    this.ItemService.getItemsByCategory(this.getPath(), this.start, this.end).subscribe(
      res => {
        if (res) {
          let groupByDateArray = this.SplitItemsService.splitItmGroupByKey(res, 'date', '');
          let events = this.SplitItemsService.generateFullcalendarEvents(groupByDateArray);
          this.calendarOptions.events = events;
        }
      }
    )
  }


  handleDatesRender(arg: any) {
    const start = arg.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("-", "").replaceAll("/", "");
    const end = arg.end.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("-", "").replaceAll("/", "");
    this.start = start;
    this.end = end
    this.getRangeData();
  }

  eventClick(arg: any) {
    this.selectedText = arg.event.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("/", "-");
    this.selected = arg.event.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("-", "");
    this.getDayData();
  }

  getPath() {
    return window.location.pathname.replace('/manager_self/', '');
  }

  openEdit(date: string) {
    const dialogRef = this.dialog.open(EditAddItemsComponent , {
      width: '750px',
      minHeight:'200px',
      maxHeight:'500px',
      data: date
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getDayData();
      this.getRangeData();
      this.refresh.emit('refresh')
    });
  }
}
