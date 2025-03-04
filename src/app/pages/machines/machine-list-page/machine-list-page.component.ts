import { Component, inject } from '@angular/core';
import { AlertComponent } from '../../../components/alert/alert.component';
import { RouterLink } from '@angular/router';
import { PopUpModalComponent } from '../../../components/pop-up-modal/pop-up-modal.component';
import { MachineListDto } from '../../../models/bussiness/machine/machine-dto';
import { PopUpStateService } from '../../../components/pop-up-modal/pop-up-state.service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { MachineService } from '../../../services/machine-service';

@Component({
  selector: 'app-machine-list-page',
  imports: [AlertComponent, RouterLink, PopUpModalComponent],
  templateUrl: './machine-list-page.component.html',
  styleUrl: './machine-list-page.component.scss'
})
export class MachineListPageComponent {
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  protected readonly machineService = inject(MachineService);
  protected machines: MachineListDto[] = [];

  constructor() {
    this.loadMachines();
  }

  deleteLocation = (id: string) => {
      this.machineService.deleteMachine(id).subscribe(() => {
        this.machines = this.machines.filter((machines) => machines.id !== id);
      });
      this.loadMachines();
      this.alertStateService.openAlert('Stroj byl úspěšně vymazán', 'success');
    };
    openPopUp = (machine: MachineListDto) => {
        this.popUpStateService.openPopUp(`Jste si jistí, že chcete vymazat stroj "${machine.model}"`, this.deleteLocation, machine.id);
    };
    loadMachines = () =>{
      this.machineService.getMachines().subscribe((machines) => {
        this.machines = machines;
      });
    }
}
