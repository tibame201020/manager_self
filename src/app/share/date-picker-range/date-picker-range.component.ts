import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-date-picker-range',
  templateUrl: './date-picker-range.component.html',
  styleUrls: ['./date-picker-range.component.css']
})
export class DatePickerRangeComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  maxDate = new Date();
  range = this.formBuilder.group({
    start: [new Date(new Date().setDate(this.maxDate.getDate() - 30))],
    end: [this.maxDate],
  });
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.newItemEvent.emit(this.range.value);
    this.range.valueChanges.subscribe({
      next: value => {
        this.newItemEvent.emit(this.range.value);
    }
    })
  }

}
