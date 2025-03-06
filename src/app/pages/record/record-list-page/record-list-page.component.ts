import { Component, inject } from '@angular/core';
import { RecordService } from '../../../services/record-service';
import { RecordListDto } from '../../../models/bussiness/records/record-list-dto';
import { AlertComponent } from "../../../components/alert/alert.component";
import { PopUpModalComponent } from "../../../components/pop-up-modal/pop-up-modal.component";
import { PopUpStateService } from '../../../components/pop-up-modal/pop-up-state.service';
import { AlertStateService } from '../../../components/alert/alert-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-record-list-page',
  imports: [AlertComponent, PopUpModalComponent, RouterLink],
  templateUrl: './record-list-page.component.html',
  styleUrl: './record-list-page.component.scss'
})
export class RecordListPageComponent {
  protected readonly recordService = inject(RecordService);
  protected readonly popUpStateService = inject(PopUpStateService);
  protected readonly alertStateService = inject(AlertStateService);
  public records: RecordListDto[] = [];

  constructor() {
    this.recordService.getRecords().subscribe((records) => {
      this.records = records;
    });
  }
  deleteLocation = (id: string) => {
        this.recordService.deleteRecord(id).subscribe(() => {
          this.records = this.records.filter((record) => record.id !== id);
        });
        this.loadRecords();
        this.alertStateService.openAlert('Záznam byl úspěšně vymazán', 'success');
      };
      openPopUp = (record: RecordListDto) => {
          this.popUpStateService.openPopUp(`Jste si jistí, že chcete vymazat záznam z "${record.date}"`, this.deleteLocation, record.id);
      };
      loadRecords = () =>{
        this.recordService.getRecords().subscribe((records) => {
          this.records = records;
        });}
}
