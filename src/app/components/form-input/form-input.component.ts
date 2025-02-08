import {
  Component,
  input,
  output,
  model,
  forwardRef,
  computed,
  effect,
  inject,
  ElementRef,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
// import { ButtonVariant } from '../../../pages/theme-builder/types/colors';
// import { ThemeSettingsService } from '../../../services/theme-settings.service';
// import { ColorSettingsService } from '../../../services/color-settings.service';

@Component({
  selector: 'form-imput',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor, Validator {
  // private themeSettingsService = inject(ThemeSettingsService);
  // private colorSettingsService = inject(ColorSettingsService);
  private elementRef = inject(ElementRef);

  // Inputs

  placeholder = input<string>('');
  type = input<'text' | 'password' | 'email' | 'number' | 'tel' | 'url'>(
    'text'
  );
  // variant = input<ButtonVariant>('primary');
  size = input<'small' | 'normal' | 'large'>('normal');
  required = input<boolean>(false);
  readonly = input<boolean>(false);
  description = input<string>('');
  error = input<string>('');

  // Model signals
  value = model<string>('');
  disabled = model<boolean>(false);

  // Internal state signals
  focused = signal<boolean>(false);
  touched = signal<boolean>(false);

  // Validation state

  constructor() {
    console.log('FormInputComponent Constructor Initialized');
    effect(() => {
      console.log('Effect triggered: Value =', this.value());
      this.floatingLabel();
    });
  }

  // ControlValueAccessor Implementation
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
    console.log('Write Value:', value); // Debugging log
    this.floatingLabel(); // Ensure floating label updates
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value.set(input.value);
    this.onChange(input.value);
  }

  onFocus() {
    this.focused.set(true);
  }

  onBlur() {
    this.focused.set(false);
    this.touched.set(true);
    this.onTouched();
  }

  // Validator Implementation
  validate(control: AbstractControl): ValidationErrors | null {
    return this.validationError();
  }

  // Helper method to check if input is disabled
  isInputDisabled(): boolean {
    return this.disabled();
  }
  validationError = computed(() => {
    if (this.required() && !this.value()) {
      return { required: true }; //from he it adds the label
    }
    return null;
  }); // Computed properties
  floatingLabel = computed(() => {
    console.log('Floating Label Check:', this.focused(), this.value());
    return this.focused() || this.value() !== '';
  });
  label = input<string>('');
  private updateInputVariables() {
    // const settings = this.themeSettingsService.settings();
    // const colors = this.colorSettingsService.colors();
    // const currentVariant = this.variant();
    // const variantSettings = settings.input.variants[currentVariant];
    // const variantColors = colors[currentVariant];

    // Update CSS variables on the host element
    const el = this.elementRef.nativeElement;
    el.style.setProperty('--input-focus-ring', `50040`);
    el.style.setProperty('--input-label', '700');
  }
}
