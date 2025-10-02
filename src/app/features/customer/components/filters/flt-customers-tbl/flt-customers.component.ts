import { AfterViewInit, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { DatePickerModule } from 'primeng/datepicker';
import { UbigeoService } from 'app/shared/services/ubigeo.service';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { SelectModule } from 'primeng/select';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flt-customers',
  imports: [PanelModule, AvatarModule, ButtonModule, MenuModule, CardModule, InputTextModule, DatePickerModule, SelectModule, ReactiveFormsModule, FormsModule],
  templateUrl: './flt-customers.component.html',
  styleUrl: './flt-customers.component.scss',
  providers: []
})
export class FltCustomersComponent implements OnInit, AfterViewInit, OnDestroy {

  frmFilterCustomer: FormGroup = new FormGroup({});
  codeDepartment$ = new BehaviorSubject<string | null>(null);

  items: { label?: string; icon?: string; separator?: boolean }[] = [];
  
  departments = rxResource({
    stream: () => this.ubigeoService.getDepartamentsAll()
  });

  provinces = rxResource({
    stream: () =>
        this.codeDepartment$.pipe(
        switchMap(code =>
            code
            ? this.ubigeoService.getAllProvinceByDepartment(code)
            : of([])
        )
        )
    });

  districts = rxResource({
    stream: () => this.ubigeoService.getDepartamentsAll()
  });

  constructor(
    private ubigeoService: UbigeoService,
    private fb: FormBuilder
  ) {
    this.frmFilterCustomer = this.fb.group({
        idDepartment: new FormControl(null),
        idProvince: new FormControl(null),
        idDistrict: new FormControl(null)
    });

    this.frmFilterCustomer.get('idDepartment')?.valueChanges.subscribe(val => {
        this.codeDepartment$.next(val);
    });
  }

  ngOnInit(): void {


		this.items = [
            {
                label: 'Refresh',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Search',
                icon: 'pi pi-search'
            },
            {
                separator: true
            },
            {
                label: 'Delete',
                icon: 'pi pi-times'
            }
        ];
  }

  ngAfterViewInit(): void {
	
  }

  ngOnDestroy(): void {
	
  }

  // Getters

  get f(): any{
    return this.frmFilterCustomer.controls;
  }

}
