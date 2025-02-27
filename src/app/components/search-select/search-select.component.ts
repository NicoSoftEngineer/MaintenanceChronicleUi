import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentChecked,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  Input,
  input,
  model,
  OnInit,
  Output,
  output,
  signal,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'mach:searchSelect',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss'],
})
export class SearchSelectComponent implements AfterContentChecked {
  private control: AbstractControl | null = null;

  // ViewChild references
  @ViewChild('trigger') trigger!: ElementRef;
  @ViewChild('dropdownTemplate', { static: false })
  dropdownTemplate!: TemplateRef<any>;

  // Two-way binding
  @Input() selectedOptions: any[] = [];
  @Output() selectedOptionsChange = new EventEmitter<any[]>();

  // Inputs
  label = input<string>('');
  required = input<boolean>(false);
  name = input<string>('');
  options = input.required<any[]>();

  searchText = signal<string>('');
  filteredOptions: any[] = [];

  //Filtered options
  filterOptions(event: any | null) {
    if(!event) {
      this.filteredOptions = this.options();
      return;
    }
    if(!this.isOpen()) {
      this.openDropdown();
    }
    const value = event.target.value.toLowerCase();
    if (!value) {
      this.filteredOptions = this.options();
      return;
    }
    this.filteredOptions = this.options().filter(option =>
      option.name.toLowerCase().includes(value)
    );
  }

  // Outputs
  open = output<void>();
  close = output<void>();

  // Internal state
  isOpen = signal<boolean>(false);
  touched = signal<boolean>(false);

  // Internal state signals
  focused = signal<boolean>(false);
  dirty = signal<boolean>(false);

  private onTouched: () => void = () => {};

  // Overlay
  private overlayRef: OverlayRef | null = null;
  private portal: TemplatePortal | null = null;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngAfterContentChecked() {
    this.filteredOptions = this.options();
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

  toggleDropdown() {
    this.isOpen() ? this.closeDropdown() : this.openDropdown();
  }

  private openDropdown() {
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
        positionStrategy: this.overlay
          .position()
          .flexibleConnectedTo(triggerElement) // Ensure `triggerElement` is defined
          .withPositions([
            {
              originX: 'start',
              originY: 'bottom',
              overlayX: 'start',
              overlayY: 'top',
            },
          ]),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
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
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ]);

    // Create overlay
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      width: triggerElement.offsetWidth,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    // Handle backdrop clicks
    this.overlayRef.backdropClick().subscribe(() => this.closeDropdown());

    // Create and attach portal with proper ViewContainerRef
    this.portal = new TemplatePortal(
      this.dropdownTemplate,
      this.viewContainerRef
    );
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
    const index = this.selectedOptions.findIndex((o) => o.id === option.id);

    if (index === -1) {
      this.selectedOptions.push(option);
    } else {
      this.selectedOptions = this.selectedOptions.filter((o) => o.id !== option.id);
    }

    this.selectedOptionsChange.emit(this.selectedOptions);
    this.markAsTouched();
  }

  isSelected(option: any): boolean {
    return this.selectedOptions.some((o) => o.id === option.id);
  }

  removeOption(option: any) {
    this.toggleOption(option);
  }
}
