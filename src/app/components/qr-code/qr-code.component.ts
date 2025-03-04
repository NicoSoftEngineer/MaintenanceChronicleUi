import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  input,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import html2canvas from 'html2canvas';
import QRCodeStyling from 'qr-code-styling';
import QRBorderPlugin, {
  BorderOption,
  ExtensionOptions,
} from 'qr-border-plugin';

@Component({
  selector: 'mach:qrCode',
  imports: [],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.scss',
})
export class QrCodeComponent implements AfterContentChecked {
  @ViewChild('qrContainer', { static: true }) qrContainer!: ElementRef;
  @ViewChild('captureContainer', { static: true })
  captureContainer!: ElementRef;
  qrCode?: QRCodeStyling;
  sideText = input<string>('');
  constructor() {}
  ngAfterContentChecked() {
    if (this.sideText() !== '') {
      if (!this.qrCode) {
        console.log(this.sideText());
        let extensionOptions = {
          round: 0,
          thickness: 25,
          color: '#fff',
          decorations: {
            top: {
              type: 'text',
              value: this.sideText(),
              style:
                "font: 15px sans-serif;font-family: 'Montserrat', sans-serif; fill: #1F0F53;",
            },
            right: {
              type: 'text',
              value: this.sideText(),
              style:
                "font: 10px sans-serif;font-family: 'Montserrat', sans-serif; fill: #1F0F53;letter-spacing: 5px;",
            },
            left: {
              type: 'text',
              value: this.sideText(),
              style:
                "font: 10px sans-serif;font-family: 'Montserrat', sans-serif; fill: #1F0F53;letter-spacing: 5px; ",
            },
            bottom: {
              type: 'text',
              value: this.sideText(),
              style:
                "font: 15px sans-serif;font-family: 'Montserrat', sans-serif; fill: #1F0F53;",
            },
          },
        };
        // Initialize the QR code with your desired configuration
        this.qrCode = new QRCodeStyling({
          width: 256,
          height: 256,
          margin: 25,
          data: window.location.href,
          image: 'mach-wrech.png', // Optional logo
          dotsOptions: { color: '#1F0F53', type: 'square' },
          backgroundOptions: { color: '#fff' },
          imageOptions: { crossOrigin: 'anonymous', margin: 5 },
        });

        this.qrCode.applyExtension(
          QRBorderPlugin(extensionOptions as unknown as ExtensionOptions)
        );

        console.log(this.qrCode);
        // Append the QR code to the container element
        this.qrCode.append(this.qrContainer.nativeElement);
      }
    }
  }

  downloadQrCode() {
    // Trigger download when the button is clicked
    this.qrCode!.download({
      name: this.sideText(),
      extension: 'png',
    });
  }
}
