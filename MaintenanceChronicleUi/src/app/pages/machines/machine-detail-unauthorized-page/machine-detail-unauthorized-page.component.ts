import { LocationService } from './../../../services/location-service';
import { Component, inject } from '@angular/core';
import { UserContactList } from '../../../models/bussiness/contact/user-contact-list';
import { MachineDetailDto } from '../../../models/bussiness/machine/machine-dto';
import { MachineService } from '../../../services/machine-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-machine-detail-unauthorized-page',
  imports: [],
  templateUrl: './machine-detail-unauthorized-page.component.html',
  styleUrl: './machine-detail-unauthorized-page.component.scss'
})
export class MachineDetailUnauthorizedPageComponent {
    protected readonly route = inject(ActivatedRoute);
  protected readonly locationService: LocationService = inject(LocationService);
  protected readonly machineService: MachineService = inject(MachineService);
  protected contacts: UserContactList[] = [];
  protected machineDetail: MachineDetailDto = {} as MachineDetailDto;

  constructor() {
    const machineId = this.route.snapshot.paramMap.get('id')!;
    this.machineService.getMachineById(machineId).subscribe((machineDetail) => {
      this.machineDetail = machineDetail;
      this.machineService.getLocationForMachine(machineDetail.id).subscribe((location) => {
        this.locationService.getContactsForLocation(location.id).subscribe((contacts) => {
          this.contacts = contacts;
        });
      });
    });
  }

  copiedText: string | null = null;

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedText = text;
      setTimeout(() => {
        this.copiedText = null;
      }, 2000); // Message disappears after 2 seconds
    });
  }
}
