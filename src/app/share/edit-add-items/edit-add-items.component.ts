import { ItemDetailComponent } from './../item-detail/item-detail.component';
import { AddItemService } from './../../add-item.service';
import { AddItem } from './../../model/addItem';
import { ItemService } from './../../item.service';
import { Component, Inject, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-edit-add-items',
  templateUrl: './edit-add-items.component.html',
  styleUrls: ['./edit-add-items.component.css']
})
export class EditAddItemsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditAddItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public date: string,
    private formBuilder: FormBuilder,
    private ItemService: ItemService,
    public AddItemService: AddItemService,
    public dialog: MatDialog
  ) { }
  selectDate: Date = new Date(this.date);

  formGroup: FormGroup = this.formBuilder.group({
    date: [this.selectDate, Validators.required]
  });

  displayedColumns: string[] = ['category', 'subCategory', 'name', 'value', 'edit'];

  dataSource: AddItem[] = [];

  ngOnInit(): void {
    this.dateChange();
    this.getData(this.formGroup.value.date);
  }

  dateChange() {
    this.formGroup.controls['date'].valueChanges.subscribe(value => {
      this.getData(value)
    })
  }

  getData(value: Date) {
    const date = value.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }).replace("/", "").replace("/", "");
    let category = window.location.pathname.replace('/', '');
    this.ItemService.getItemsByCategory(category, date, date).subscribe(
      res => {
        this.dataSource = res;
      }
    )
  }

  getCategory(category: string) {
    return this.AddItemService.getCategory(category);
  }

  getSubCategory(category: string, subCategory: string) {
    return this.AddItemService.getSubCategory(category, subCategory + '');
  }

  edit(item: any) {
    const dialogRef = this.dialog.open(
      ItemDetailComponent, {
      data: item
    })
    dialogRef.afterClosed().subscribe(result => {
      this.getData(this.formGroup.value.date);
    });
  }

  del(item: any) {
    Swal.fire({
      title: 'Do you want to delete this record?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ItemService.delItem(item.id).subscribe(
          res => {
            if (res) {
              Swal.fire({
                title: 'Success',
                text: 'The Item Has Been Delete',
                icon: 'success',
                showConfirmButton: false,
                timer: 800
              })
              this.getData(this.formGroup.value.date);
            }
          }
        )
      }
    })
  }


}
