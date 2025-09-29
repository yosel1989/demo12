import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TblSorteosComponent } from "../../../sorteo/components/tables/tbl-sorteos/tbl-sorteos.component";
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TblCustomersComponent } from 'app/features/customer/components/tables/tbl-customers/tbl-customers.component';

@Component({
  selector: 'app-customer',
  imports: [TblCustomersComponent, ConfirmPopupModule, ToastModule, ButtonModule, TooltipModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class CustomerComponent implements OnInit, AfterViewInit{


    constructor(
    ) {}

    ngOnInit(): void{

    }

    ngAfterViewInit(): void{
        
    }

}
