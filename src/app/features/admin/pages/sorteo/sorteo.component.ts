import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TblSorteosComponent } from "../../../sorteo/components/tables/tbl-sorteos/tbl-sorteos.component";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DynamicDialogModule, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MdlSorteoComponent } from '../../../sorteo/components/modals/mdl-sorteo/mdl-sorteo.component';


@Component({
  selector: 'app-sorteo',
  imports: [TblSorteosComponent, ConfirmPopupModule, ToastModule, ButtonModule, TooltipModule, DynamicDialogModule ],
  templateUrl: './sorteo.component.html',
  styleUrl: './sorteo.component.scss',
  providers: [ConfirmationService, MessageService, DialogService]
})
export class SorteoComponent implements OnInit, AfterViewInit{

    ref: DynamicDialogRef | undefined;
    mdlSoteoComponent: MdlSorteoComponent | undefined;

    constructor(
        private confirmationService: ConfirmationService, 
        private messageService: MessageService,
        public dialogService: DialogService
    ) {}

    ngOnInit(): void{

    }

    ngAfterViewInit(): void{
        
    }

    show() {
        this.ref = this.dialogService.open(MdlSorteoComponent,  {
            width: '1200px',
            closable: true,
            modal: true,
            draggable: true,
            position: 'top',
            header: 'Registrar Sorteo',
            styleClass: 'max-h-none! slide-down-dialog',
            maskStyleClass: 'overflow-y-auto py-4',
            appendTo: 'body'
        });

        this.ref.onChildComponentLoaded.subscribe((res: MdlSorteoComponent) => {
            this.mdlSoteoComponent = res;
            this.mdlSoteoComponent?.OnCreated.subscribe(a => {
                this.ref?.close();
                console.log('Registro exitoso');
            });
        });
    }
}
