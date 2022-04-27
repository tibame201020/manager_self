import { FormBuilder, FormGroup } from '@angular/forms';
import { SplitItemsService } from './../split-items.service';
import { UserInfoService } from 'src/app/share/user-info.service';
import { AddItem, AddItemGroupByKey } from './../model/addItem';
import { ItemService } from './../item.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HOME_SIDE_BAR_CONFIG } from '../home/side-bar-config';
import { SideBarService } from '../side-bar/side-bar.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { MatDialog } from '@angular/material/dialog';
import { EditAddItemsComponent } from '../share/edit-add-items/edit-add-items.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  category = 'note';

  notes: AddItem[] = [];
  selected: Date = new Date();
  selectedText = new Date().toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("/", "-").replace("/", "-");

  constructor(private SideBarService: SideBarService,
    private ItemService: ItemService,
    public UserInfoService: UserInfoService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.SideBarService.setSideBar(HOME_SIDE_BAR_CONFIG);
    this.getNotesData();
  }

  getNotesData() {
    this.selectedText = this.selected.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("/", "-").replace("/", "-");
    this.ItemService.getItemsByCategory(this.category,
      this.selected.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }),
      this.selected.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" })
    ).subscribe(
      res => {
        this.notes = res;
      })
  }

  changeSelect() {
    this.getNotesData();
  }

  refreshData(itemLength: number) {
    if (itemLength == 0) {
      this.ItemService.getItemsByCategory(this.category,
        this.selected.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }),
        this.selected.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" })).subscribe(
        res => {
          this.notes = res;
        }
      )
    }
  }

  openEdit(date: string) {
    const dialogRef = this.dialog.open(EditAddItemsComponent , {
      width: '750px',
      minHeight:'200px',
      maxHeight:'500px',
      data: date
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getNotesData();
    });
  }

}
