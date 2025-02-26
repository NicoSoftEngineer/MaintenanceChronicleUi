import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { PopUpStateService } from '../../../components/pop-up-modal/pop-up-state.service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { LocationListDto } from '../../../models/bussiness/location/location-list-dto';
import { AlertComponent } from '../../../components/alert/alert.component';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { RouterLink } from '@angular/router';
import { LocationService } from '../../../services/location-service';

@Component({
  selector: 'app-location-list-page',
  imports: [AlertComponent, PopUpModalComponent, RouterLink],
  templateUrl: './location-list-page.component.html',
  styleUrl: './location-list-page.component.scss',
})
export class LocationListPageComponent implements OnInit {
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly locationService = inject(LocationService);
  protected locations: LocationListDto[] = [];
  constructor() {
    this.loadLocations();
  }
  ngOnInit(): void {
    initFlowbite();
  }

  deleteLocation = (id: string) => {
    this.locationService.deleteLocation(id).subscribe(() => {
      this.locations = this.locations.filter((location) => location.id !== id);
    });
    this.loadLocations();
    this.alertStateService.openAlert('Lokace byla úspěšně vymazána', 'success');
  };
  openPopUp = (location: LocationListDto) => {
      this.popUpStateService.openPopUp(`Jste si jistí, že chcete vymazat zákazníka "${location.name}"`, this.deleteLocation, location.id);
    };
  loadLocations = () =>{
    this.locationService.getLocations().subscribe((locations) => {this.locations = locations});
  }
}
