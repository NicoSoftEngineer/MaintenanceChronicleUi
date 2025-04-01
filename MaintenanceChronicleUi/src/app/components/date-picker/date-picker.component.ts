import flatpickr from 'flatpickr';
import { Czech } from 'flatpickr/dist/l10n/cs.js';
// datepicker.component.ts
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  forwardRef,
  AfterContentChecked,
  AfterContentInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Datepicker, DatepickerOptions } from 'flowbite';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mach:date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    },
    DatePipe,
  ],
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
  id: string = 'datepicker-default';
  @Input() label: string = 'Select date';
  @Input() format: string = 'd.m. Y';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  date: string = "";

  private datepickerInstance: any;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  displayValue = () => {
    if (this.date && !(this.datepickerInstance && this.datepickerInstance.selectedDates.length > 0)) {
      return this.datePipe.transform(this.date, "dd.MM. yyyy") || '';
    } else if (this.datepickerInstance && this.datepickerInstance.selectedDates.length > 0) {
      return this.datePipe.transform(this.datepickerInstance.selectedDates[0].toISOString(), "dd.MM. yyyy") || '';
    }
    else {
      return '';
    }
  }

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    // Wait for the DOM to be ready
    setTimeout(() => {
      this.initDatepicker();
    }, 100);
  }

  initDatepicker(): void {
    const datepickerEl = document.getElementById(this.id);
    if (!datepickerEl) return;

    // Initialize the Flowbite datepicker
    const options = {
      // format: this.format, // Keep internal format standard
      locale: Czech,
      dateFormat: this.format, // Set the date format for display
      language: 'cs', // Set the language to Czech
    };

    this.datepickerInstance = flatpickr(datepickerEl, options);
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const selectedDate = new Date(Date.UTC(this.datepickerInstance.selectedDates[0].getFullYear(), this.datepickerInstance.selectedDates[0].getMonth(), this.datepickerInstance.selectedDates[0].getDate()));
    this.date = selectedDate.toISOString();
    console.log(`Input value changed: ${this.date}`);
    this.onChange(this.date);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur(): void {
    this.onTouched();
  }

  writeValue(date: string): void {
    this.date = date;
    if (this.datepickerInstance) {
      this.datepickerInstance.setDate(date, true, this.format);
    }
  }
}
