import { AddItemService } from './../add-item.service';
import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  data: any;

  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,
    public AddItemService: AddItemService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public recvData: any
    ) { }
  ngOnInit(): void {
    console.log(this.recvData.index);
    if (!this.AddItemService.getEditItemToTmpItem(this.recvData.index)) {
      this.dialogRef.close();
    } else {
      this.data = this.AddItemService.getEditItemToTmpItem(this.recvData.index);
      this.form = this.formInit();
      this.categoryChanged();
    }
  }

  categoryChanged() {
    this.form.controls['category'].valueChanges.subscribe(value => {
      if ('note' == value) {
        this.form.patchValue({
          subCategory: '0',
          itemName: null,
          itemValue: '0'
        })
      } else {
        this.form.patchValue({
          subCategory: '0',
          itemName: null,
          itemValue: null
        })
      }
    });
  }

  formInit() {
    return this.formBuilder.group({
      date: [this.data.date, Validators.required],
      category: [this.data.category, Validators.required],
      subCategory: [this.data.subCategory, Validators.required],
      itemName: [this.data.itemName, Validators.required],
      itemValue: [this.data.itemValue, Validators.required]
    });
  }

  saveToItemList() {
    this.AddItemService.saveEditItem(this.form.value, this.recvData.index);
    this.dialogRef.close();
  }

}
