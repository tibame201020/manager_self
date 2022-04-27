import { ItemService } from './../../item.service';
import { AddItemService } from 'src/app/add-item.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditItemComponent } from 'src/app/edit-item/edit-item.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public recvData: any,
    private ItemService:ItemService
    ) { }
  ngOnInit(): void {
    if (!this.recvData) {
      this.dialogRef.close();
    } else {
      this.form = this.formInit();
    }
  }


  formInit() {
    let itemValue = this.recvData.itemValue;
    if (this.recvData.category == 'note') {
      itemValue = 'note';
    }


    return this.formBuilder.group({
      itemName: [this.recvData.itemName, Validators.required],
      itemValue: [itemValue, Validators.required]
    });
  }

  saveToDB() {
    let item = Object.assign(this.recvData, this.form.value);
    Swal.fire({
      title: 'Do you want to save this change?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'confirm'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ItemService.saveChangeItem(item).subscribe(
          res => {
            if (res) {
              Swal.fire({
                title: 'Success',
                text: 'The Item Has Been Change',
                icon: 'success',
                showConfirmButton: false,
                timer: 800
              })
              this.dialogRef.close();
            }
          }
        )
      }
    })
  }

}
