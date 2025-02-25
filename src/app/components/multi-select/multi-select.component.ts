import { Component, input, output, signal, model, forwardRef, computed, effect, inject, ElementRef, ViewChild, TemplateRef, OnDestroy, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'mach:multiSelect',
  standalone: true,
  imports: [CommonModule, FormsModule, OverlayModule],
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelect),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MultiSelect),
      multi: true
    }
  ]
})
export class MultiSelect implements ControlValueAccessor, Validator, OnDestroy {
  private elementRef = inject(ElementRef);

  readonly inputId = `input-${Math.random().toString(36).slice(2, 11)}`;
  // ViewChild references
  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild('dropdownTemplate', { static: false }) dropdownTemplate!: TemplateRef<any>;

  // Inputs
  options = input.required<any[]>();
  placeholder = input<string>('Select options...');
  label = input<string>('');
  readonly = input<boolean>(false);
  maxSelections = input<number | undefined>(undefined);
  minSelections = input<number | undefined>(undefined);
  required = input<boolean>(false);
  showSelectAll = input<boolean>(false);
  showClear = input<boolean>(false);
  closeOnSelect = input<boolean>(false);
  error = input<string>('');

  // Model signals
  disabled = model<boolean>(false);

  // Internal state
  selectedOptions = signal<any[]>([]);
  isOpen = signal<boolean>(false);
  touched = signal<boolean>(false);

  // Outputs
  selectionChange = output<any[]>();
  open = output<void>();
  close = output<void>();

  // Overlay
  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal | null = null;

  constructor( private overlay: Overlay,
    private viewContainerRef: ViewContainerRef) {
    // Create effect to update styles when variant changes
    effect(() => {
      this.updateInputVariables();
    });
  }

  private updateInputVariables() {

    // Update CSS variables on the host element
    const el = this.elementRef.nativeElement;
  }

  // Computed values
  hasValue = computed(() => this.selectedOptions().length > 0);

  validationError = computed(() => {
    if (this.required() && this.selectedOptions().length === 0) {
      return { required: true };
    }
    const minSel = this.minSelections();
    const maxSel = this.maxSelections();
    if (minSel !== undefined && this.selectedOptions().length < minSel) {
      return { min: true };
    }
    if (maxSel !== undefined && this.selectedOptions().length > maxSel) {
      return { max: true };
    }
    return null;
  });

  validationMessage = computed(() => {
    if (this.required() && this.selectedOptions().length === 0) {
      return 'Please select at least one option';
    }
    const minSel = this.minSelections();
    const maxSel = this.maxSelections();
    if (minSel !== undefined && this.selectedOptions().length < minSel) {
      return `Please select at least ${minSel} options`;
    }
    if (maxSel !== undefined && this.selectedOptions().length > maxSel) {
      return `Please select no more than ${maxSel} options`;
    }
    return '';
  });

  toggleDropdown() {
    if (!this.disabled() && !this.readonly()) {
      this.isOpen() ? this.closeDropdown() : this.openDropdown();
    }
  }

  private openDropdown() {
    console.log(this.options());
    console.log(this.selectedOptions());

    if (this.overlayRef) return;

    const triggerElement = this.trigger?.nativeElement;

    if (!triggerElement || !this.dropdownTemplate) return;
    if (!this.dropdownTemplate) {
      console.error('dropdownTemplate is undefined');
      return;
    }
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        positionStrategy: this.overlay.position()
          .flexibleConnectedTo(triggerElement) // Ensure `triggerElement` is defined
          .withPositions([{ originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top' }]),
        scrollStrategy: this.overlay.scrollStrategies.reposition()
      });
    }
    // Create position strategy
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(triggerElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4
        }
      ]);

    // Create overlay
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: triggerElement.offsetWidth,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    // Handle backdrop clicks
    this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());

    // Create and attach portal with proper ViewContainerRef
    this.portal = new TemplatePortal(this.dropdownTemplate, this.viewContainerRef);
    this.overlayRef.attach(this.portal);
    this.isOpen.set(true);
    this.open.emit();
  }
  private closeDropdown() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.portal = null;
    }
    this.isOpen.set(false);
    this.close.emit();
  }

  toggleOption(option: any) {
    if (!this.disabled() && !this.readonly()) {
      const index = this.selectedOptions().findIndex(o => o.id === option.id);
      const maxSel = this.maxSelections();
      const minSel = this.minSelections();

      if (index === -1) {
        if (!maxSel || this.selectedOptions().length < maxSel) {
          this.selectedOptions.update(options => [...options, option]);
          this.onChange(this.selectedOptions().map(o => o.id));
        }
      } else {
        if (!minSel || this.selectedOptions().length > minSel) {
          this.selectedOptions.update(options => options.filter(o => o.id !== option.id));
          this.onChange(this.selectedOptions().map(o => o.id));
        }
      }

      if (this.closeOnSelect()) {
        this.closeDropdown();
      }
      console.log(this.selectedOptions());
      this.selectionChange.emit(this.selectedOptions());
      this.markAsTouched();
    }
  }

  removeOption(option: any) {
    if (!this.disabled() && !this.readonly()) {
      this.toggleOption(option);
    }
  }

  isSelected(option: any): boolean {
    return this.selectedOptions().some(o => o.id === option.id);
  }

  selectAll() {
    if (!this.disabled() && !this.readonly()) {
      const availableOptions = this.options().filter(o => !o.disabled);
      const maxSel = this.maxSelections();
      const selectedOptions = maxSel !== undefined
        ? availableOptions.slice(0, maxSel)
        : availableOptions;

      this.selectedOptions.set(selectedOptions);
      this.onChange(selectedOptions.map(o => o.id));
      this.selectionChange.emit(selectedOptions);
      this.markAsTouched();
    }
  }

  clearAll() {
    if (!this.disabled() && !this.readonly()) {
      this.selectedOptions.set([]);
      this.onChange([]);
      this.selectionChange.emit([]);
      this.markAsTouched();
    }
  }

  markAsTouched() {
    if (!this.touched()) {
      this.touched.set(true);
      this.onTouched();
    }
  }

  // ControlValueAccessor Implementation
  private onChange: (value: any[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(values: any[]): void {
    if (values) {
      this.selectedOptions.set(
        this.options().filter(option => values.includes(option.id))
      );
    } else {
      this.selectedOptions.set([]);
    }
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

  // Validator Implementation
  validate(control: AbstractControl): ValidationErrors | null {
    return this.validationError();
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
