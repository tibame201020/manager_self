import { UserInfoService } from 'src/app/share/user-info.service';
import { AddItem } from './../model/addItem';
import { AddItemService } from './../add-item.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddFormComponent implements OnInit {

  pathNow = window.location.pathname.replace('/manager_self/', '');

  formGroup: FormGroup = this.formBuilder.group({
    date: [new Date(), Validators.required],
    category: [this.pathNow == 'home' ? 'account' : this.pathNow, Validators.required],

  });

  accountFormGroup: FormGroup = this.formBuilder.group({
    accountCategory: ['0', Validators.required],
    accountName: ['', Validators.required],
    accountMoney: ['', Validators.required]
  });
  eatFormGroup: FormGroup = this.formBuilder.group({
    eatCategory: ['0', Validators.required],
    eatName: ['', Validators.required],
    eatCal: ['', Validators.required]
  });
  fitFormGroup: FormGroup = this.formBuilder.group({
    fitCategory: ['0', Validators.required],
    fitName: ['', Validators.required],
    fitCal: ['', Validators.required]
  });
  noteFormGroup: FormGroup = this.formBuilder.group({
    note: ['', Validators.required]
  });


  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddFormComponent>,
    private AddItemService: AddItemService,
    private UserInfoService:UserInfoService) { }

  ngOnInit() {
  }

  addToList() {
    let item: AddItem = {
      sub: '',
      // date: this.formGroup.value.date.toLocaleString('zh-TW', { year: "numeric", month: "2-digit", day: "2-digit" }),
      date: this.formGroup.value.date,
      category: this.formGroup.value.category,
      subCategory: '',
      itemName: '',
      itemValue: null
    };
    if (this.formGroup.value.category == 'account') {
      item.subCategory = this.accountFormGroup.value.accountCategory;
      item.itemName = this.accountFormGroup.value.accountName;
      item.itemValue = this.accountFormGroup.value.accountMoney;
    }
    if (this.formGroup.value.category == 'eat') {
      item.subCategory = this.eatFormGroup.value.eatCategory;
      item.itemName = this.eatFormGroup.value.eatName;
      item.itemValue = this.eatFormGroup.value.eatCal;
    }
    if (this.formGroup.value.category == 'fit') {
      item.subCategory = this.fitFormGroup.value.fitCategory;
      item.itemName = this.fitFormGroup.value.fitName;
      item.itemValue = this.fitFormGroup.value.fitCal;
    }
    if (this.formGroup.value.category == 'note') {
      item.itemName = this.noteFormGroup.value.note;
    }
    this.AddItemService.addItemList(item);

    this.dialogRef.close();
  }

  checkFormField(): boolean {
    if (this.formGroup.value.category == 'account') {
      return this.formGroup.valid && this.accountFormGroup.valid
    }
    if (this.formGroup.value.category == 'eat') {
      return this.formGroup.valid && this.eatFormGroup.valid
    }
    if (this.formGroup.value.category == 'fit') {
      return this.formGroup.valid && this.fitFormGroup.valid
    }
    if (this.formGroup.value.category == 'note') {
      return this.formGroup.valid && this.noteFormGroup.valid
    }
    return false;
  }

}
