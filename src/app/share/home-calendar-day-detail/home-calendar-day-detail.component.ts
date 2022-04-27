import { EditAddItemsComponent } from './../edit-add-items/edit-add-items.component';
import { SplitItemsService } from 'src/app/split-items.service';
import { AddItem } from './../../model/addItem';
import { Component, OnInit, Inject, Input, SimpleChanges } from '@angular/core';
import { AddItemService } from 'src/app/add-item.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home-calendar-day-detail',
  templateUrl: './home-calendar-day-detail.component.html',
  styleUrls: ['./home-calendar-day-detail.component.css']
})
export class HomeCalendarDayDetailComponent implements OnInit {

  constructor(
    private SplitItemsService: SplitItemsService,
    public AddItemService: AddItemService,
    public dialog: MatDialog
  ) { }

  @Input() data!: any;
  @Input() date!: any;
  accounts: AddItem[] = [];
  eats: AddItem[] = [];
  fits: AddItem[] = [];
  notes: AddItem[] = [];

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.init();
    }
  }

  init() {
    let groupByCategoryObj = this.SplitItemsService.splitItmGroupByKey(this.data, 'category', 'obj');

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

  openEdit(date: string) {
    this.dialog.open(EditAddItemsComponent , {
      width: '750px',
      data: date
    })
  }

}
