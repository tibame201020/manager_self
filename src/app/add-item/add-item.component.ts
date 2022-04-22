import { EditItemComponent } from './../edit-item/edit-item.component';
import { AddFormComponent } from './../add-form/add-form.component';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddItemService } from '../add-item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<number>();

  constructor(public dialog: MatDialog, public AddItemService: AddItemService) { }

  ngOnInit(): void {
  }
  addItem() {
    this.openDialog();
  }
  saveItems() {
    this.AddItemService.saveItems().subscribe(
      res => {
        if (res) {
          this.AddItemService.itemList = [];
          this.newItemEvent.emit(this.AddItemService.itemList.length);
        }
      }
    );
  }

  openDialog() {
    this.dialog.open(AddFormComponent, {
      height: '37%',
      width: '80%'
    });
  }

  deleteItem(index: number) {
    this.AddItemService.deleteItemByIndex(index);
  }

  openEditDialog(index: number) {
    this.dialog.open(EditItemComponent, {
      height: '60%',
      width: '25%',
      data:{
        index:index
      }
    })
  }

  getSubCategory(category: string, SubCategory: string) {
    return this.AddItemService.getSubCategory(category, SubCategory);
  }

  getCategory (category:string) {
    return this.AddItemService.getCategory(category);
  }

}
