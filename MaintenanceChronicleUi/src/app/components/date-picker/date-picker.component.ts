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
// Replace with a valid locale object or remove if not needed
const cs = {
  days: ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'],
  daysShort: ['Po.', 'Út.', 'St.', 'Čt.', 'Pá.', 'So.', 'Ne.'],
  daysMin: ['Po.', 'Út.', 'St.', 'Čt.', 'Pá.', 'So.', 'Ne.'],
  months: [
    'Leden',
    'Únor',
    'Březen',
    'Duben',
    'Květen',
    'Červen',
    'Červenec',
    'Srpen',
    'Září',
    'Říjen',
    'Listopad',
    'Prosinec',
  ],
  monthsShort: [
    'Led.',
    'Ún.',
    'Bř.',
    'Du.',
    'Kv',
    'Čvn.',
    'Čvc.',
    'Srp.',
    'Zá.',
    'Ří.',
    'Lis.',
    'Pro.',
  ],
  today: 'Dnes',
  weekStart: 0,
  clear: 'Resetovat',
  format: 'dd.mm.yyyy',
};
import { DatePipe } from '@angular/common';

@Component({
  selector: 'mach:date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
    DatePipe,
  ],
})
export class DatePickerComponent implements OnInit {
  @Input() id: string = 'datepicker-default';
  @Input() label: string = 'Select date';
  @Input() format: string = 'd.m. Y';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() date: string = "";
  @Output() dateChange = new EventEmitter<string>();

  private datepickerInstance: any;
  private onChange: any = () => {};
  private onTouched: any = () => {};

  displayValue = () => {
    if (this.date && !(this.datepickerInstance && this.datepickerInstance.selectedDates.length > 0)) {
      return this.datePipe.transform(this.date, "dd.MM. yyyy") || '';
    } else if (this.datepickerInstance && this.datepickerInstance.selectedDates.length > 0) {
      return this.datePipe.transform(this.datepickerInstance.selectedDates[0].toISOString(), "dd.MM.yyyy") || '';
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
    console.log(this.date)
    const datepickerEl = document.getElementById(this.id);
    if (!datepickerEl) return;

    // Initialize the Flowbite datepicker
    const options = {
      // format: this.format, // Keep internal format standard
      locales: cs,
      dateFormat: this.format, // Set the date format for display
      language: 'cs', // Set the language to Czech
    };
    console.log('asdfasdfasdfasd');
    this.datepickerInstance = flatpickr(datepickerEl, {
      locale: Czech,
      dateFormat: this.format,
    });
    console.log(new Date().toISOString());
    this.datepickerInstance.setDate(new Date().toISOString(), true);
    console.log(this.datepickerInstance);
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

  onInputChange(event: Event): void {
    this.date = this.datepickerInstance.selectedDates[0].toISOString();
    console.log(this.date);
    this.dateChange.emit(this.date);
  }

  onBlur(): void {
    this.onTouched();
  }
}
