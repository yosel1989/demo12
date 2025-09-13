import { Component } from '@angular/core';
import { TblSorteosComponent } from "../../components/tables/tbl-sorteos/tbl-sorteos.component";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MdlSorteoComponent } from '../../components/modals/mdl-sorteo/mdl-sorteo.component';


@Component({
  selector: 'app-sorteo',
  imports: [TblSorteosComponent, ConfirmPopupModule, ToastModule, ButtonModule, TooltipModule, DynamicDialogModule ],
  templateUrl: './sorteo.component.html',
  styleUrl: './sorteo.component.scss',
  providers: [ConfirmationService, MessageService, DialogService]
})
export class SorteoComponent {

    ref: DynamicDialogRef | undefined;

    constructor(
        private confirmationService: ConfirmationService, 
        private messageService: MessageService,
        public dialogService: DialogService
    ) {}

    confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Save'
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.currentTarget as EventTarget,
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger'
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    show() {
        console.log("show");
        this.ref = this.dialogService.open(MdlSorteoComponent,  {
            width: '500px',
        });
    }
}
