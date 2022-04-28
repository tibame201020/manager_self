import { ItemService } from './../../item.service';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import { SplitItemsService } from 'src/app/split-items.service';
import { UserInfoService } from '../user-info.service';
import { MatDialog } from '@angular/material/dialog';
import { EditAddItemsComponent } from '../edit-add-items/edit-add-items.component';
import { AddItem } from 'src/app/model/addItem';
import { AddItemService } from 'src/app/add-item.service';

@Component({
  selector: 'app-home-calendar',
  templateUrl: './home-calendar.component.html',
  styleUrls: ['./home-calendar.component.css']
})
export class HomeCalendarComponent implements OnInit {

  @Input() itemLength!: number;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.dateClick.bind(this),
    datesSet: this.handleDatesRender.bind(this),
    eventClick: this.eventClick.bind(this),
    events: [
      {
        title: 'eats',
        start: '2022-04-22',
        backgroundColor: 'blue'
      },
      {
        title: 'fit',
        start: '2022-04-22',
        backgroundColor: 'red'
      }
    ]
  };

  accountColor = 'lightblue';
  eatColor = 'lightgreen';
  fitColor = 'red';

  selected = new Date().toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("-", "").replace("-", "").replace("/", "").replace("/", "");
  start: any;
  end: any;
  dayDetailData: any;
  selectedText = new Date().toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("/", "-").replace("/", "-");
  @Output() refresh = new EventEmitter<string>();

  accounts: AddItem[] = [];
  eats: AddItem[] = [];
  fits: AddItem[] = [];
  notes: AddItem[] = [];
  constructor(private ItemService: ItemService,
    private SplitItemsService: SplitItemsService,
    private UserInfoService: UserInfoService,
    public dialog: MatDialog,
    public AddItemService: AddItemService) { }

  ngOnInit(): void {
    this.getDayData();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.itemLength == 0) {
      this.getDayData();
      this.getRangeData();
    }
  }

  dateClick(arg: any) {
    this.selectedText = arg.dateStr.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" });
    this.selected = arg.dateStr.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("-", "");
    this.getDayData();
  }

  getDayData() {
    if (this.UserInfoService.isLogin()) {
      this.ItemService.getItemsByCategory(this.getPath(), this.selected, this.selected).subscribe(
        res => {
          this.dayDetailData = res;
          this.init();
        }
      )
    }
  }

  getRangeData() {
    this.ItemService.getItemsByCategory(this.getPath(), this.start, this.end).subscribe(
      res => {
        if (res) {
          let groupByCategoryArray = this.SplitItemsService.splitItmGroupByKey(res, 'category', '');
          let events: any[] = [];
          groupByCategoryArray.forEach((item: { dataArray: any[]; key: any; }) => {
            const category = item.key;
            if ('note' == category) {
              return;
            }
            let groupByDateArray = this.SplitItemsService.splitItmGroupByKey(item.dataArray, 'date', '');
            let tmpEvents = this.SplitItemsService.generateFullcalendarEvents(groupByDateArray);
            tmpEvents.forEach(element => {
              if ('account' == category) {
                element.title = '$' + element.title
                element.backgroundColor = this.accountColor
              } else if ('eat' == category) {
                element.title = '' + element.title + 'cal'
                element.backgroundColor = this.eatColor
              } else {
                element.title = '' + element.title + 'cal'
                element.backgroundColor = this.fitColor;
              }
            });
            events = events.concat(tmpEvents);
          });
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
    if (this.UserInfoService.isLogin()) {
      this.getRangeData();
    }
  }

  eventClick(arg: any) {
    this.selectedText = arg.event.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("/", "-");
    this.selected = arg.event.start.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("-", "");
    this.getDayData();
  }

  getPath() {
    return window.location.pathname.replace('/manager_self/', '')
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

  init() {
    let groupByCategoryObj = this.SplitItemsService.splitItmGroupByKey(this.dayDetailData, 'category', 'obj');

    if (groupByCategoryObj['account']) {
      this.accounts = groupByCategoryObj['account']
    } else {
      this.accounts = [];
    }
    if (groupByCategoryObj['eat']) {
      this.eats = groupByCategoryObj['eat']
    } else {
      this.eats = [];
    }
    if (groupByCategoryObj['fit']) {
      this.fits = groupByCategoryObj['fit']
    } else {
      this.fits = [];
    }
    if (groupByCategoryObj['note']) {
      this.notes = groupByCategoryObj['note']
    } else {
      this.notes = [];
    }
  }
}
