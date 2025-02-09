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
  TemplateRef,
  signal,
  OnInit,
  ContentChild,
  HostBinding,
  DoCheck,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  Validator,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { getErrorMessage } from '../../utils/form-control-error-helper.service';

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
export class FormInputComponent
  implements ControlValueAccessor, Validator, DoCheck
{
  private elementRef = inject(ElementRef);

  // Generate unique ID for input
  readonly inputId = `input-${Math.random().toString(36).slice(2, 11)}`;

  // Content Children
  @ContentChild('prefix') prefixTemplate?: TemplateRef<any>;
  @ContentChild('suffix') suffixTemplate?: TemplateRef<any>;

  // Host bindings for form states
  @HostBinding('class.ng-touched') get isTouched() {
    return this.touched();
  }
  @HostBinding('class.ng-untouched') get isUntouched() {
    return !this.touched();
  }
  @HostBinding('class.ng-dirty') get isDirty() {
    return this.dirty();
  }
  @HostBinding('class.ng-pristine') get isPristine() {
    return !this.dirty();
  }
  @HostBinding('class.ng-valid') get isValid() {
    return !this.validationError();
  }
  @HostBinding('class.ng-invalid') get isInvalid() {
    return !!this.validationError();
  }

  // Inputs
  label = input<string>('');
  placeholder = input<string>('');
  type = input<'text' | 'password' | 'email' | 'number' | 'tel' | 'url'>(
    'text'
  );
  size = input<'small' | 'normal' | 'large'>('normal');
  required = input<boolean>(false);
  readonly = input<boolean>(false);
  description = input<string>('');
  prefixIcon = input<string>('');
  suffixIcon = input<string>('');
  name = input<string>('');
  error = input<string>('');
  // Model signals
  value = model<string>('');
  disabled = model<boolean>(false);

  // Internal state signals
  focused = signal<boolean>(false);
  touched = signal<boolean>(false);
  dirty = signal<boolean>(false);
  private control: AbstractControl | null = null;

  getErrors(){
    return getErrorMessage(this.control, this.name());
  }

  // Validation state
  validationError = computed(() => {
    // Check both required property and validator
    if (this.required() || this.hasRequiredValidator) {
      if (!this.value()) {
        return { required: true };
      }
    }
    return null;
  });

  // Track if we have a required validator
  hasRequiredValidator = false;

  //Track if user wants to show password
  showPassword = false;

  // Computed properties
  floatingLabel = computed(() => {
    return this.focused() || this.value() !== '';
  });

  constructor() {
    effect(() => {
      this.updateInputVariables();
    });
  }

  ngDoCheck() {
    if (this.control) {
      // Sync control states
      if (this.control.touched !== this.touched()) {
        this.touched.set(this.control.touched);
      }

      if (this.control.dirty !== this.dirty()) {
        this.dirty.set(this.control.dirty);
      }

      // Re-run validation
      this.control.updateValueAndValidity();
    }
  }

  private updateInputVariables() {
    // Update CSS variables on the host element
    const el = this.elementRef.nativeElement;
    el.style.setProperty('--input-focus-ring', `40040`);
    el.style.setProperty('--input-label', '500');
  }

  // ControlValueAccessor Implementation
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
    this.dirty.set(false); // Reset dirty state when value is written externally
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
    this.dirty.set(true);
    this.markAsTouched();

    // Trigger validation on change
    if (this.control) {
      this.control.updateValueAndValidity();
    }
  }

  onFocus() {
    this.focused.set(true);
  }

  onBlur() {
    this.focused.set(false);
    this.markAsTouched();
  }

  markAsTouched() {
    if (!this.touched()) {
      this.touched.set(true);
      this.onTouched();
      // Trigger validation when marked as touched
      if (this.control) {
        this.control.updateValueAndValidity();
      }
    }
  }

  // Validator Implementation
  validate(control: AbstractControl): ValidationErrors | null {
    // Store reference to control for later use
    this.control = control;

    // Check if the control has a required validator
    this.hasRequiredValidator = control.hasValidator(Validators.required);

    // Sync touched state with control
    if (control.touched !== this.touched()) {
      this.touched.set(control.touched);
    }

    // Sync dirty state with control
    if (control.dirty !== this.dirty()) {
      this.dirty.set(control.dirty);
    }

    // Return validation result
    return this.validationError();
  }

  // Helper method to check if input is disabled
  isInputDisabled(): boolean {
    return this.disabled();
  }

  // Helper methods for prefix/suffix
  hasPrefix(): boolean {
    return !!this.prefixTemplate || !!this.prefixIcon();
  }

  hasSuffix(): boolean {
    return !!this.suffixTemplate || !!this.suffixIcon();
  }
}
