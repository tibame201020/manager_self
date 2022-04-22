import { AddItemService } from './../../add-item.service';
import { AddItem } from './../../model/addItem';
import { ItemService } from './../../item.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.dateClick.bind(this),
  };
  category:string = window.location.pathname.replace("/", "");
  selected = new Date().toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("-", "").replace("-", "").replace("/", "").replace("/", "");

  data:AddItem[] = [];
  constructor(
    private ItemService:ItemService,
    public AddItemService:AddItemService
  ) { }

  ngOnInit(): void {
    this.getDayData();
  }

  dateClick(arg:any) {
    this.selected = arg.dateStr.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll("-", "");
    this.getDayData();
  }

  getDayData() {
    this.ItemService.getItemsByCategory(this.category, this.selected, this.selected).subscribe(
      res => {
        console.log(res);
        this.data = res;
      }
    )
  }

}
