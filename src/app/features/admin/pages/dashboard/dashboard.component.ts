import { Component, OnInit } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SkeletonModule } from 'primeng/skeleton';
import { CardModule } from 'primeng/card';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, DatePickerModule, Select, ButtonModule, InputGroupModule, InputGroupAddonModule, SkeletonModule, CardModule],
  providers: []
})
export class DashboardComponent implements OnInit{

  options: any[] | undefined;
  typeDateSelect: FormControl = new FormControl('today');
  datesFormControl: FormControl = new FormControl([]);
  loading: boolean = false;

  dates: {date_from: string | null, date_to: string | null} = {date_from: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), date_to: formatDate(new Date(), 'yyyy-MM-dd', 'en-US')};  

  constructor(

  ) {
    this.typeDateSelect.valueChanges.subscribe(value => {
        if(value !== 'range'){
            this.loadData();
        }
    });
  }

  ngOnInit() {
    this.loadData();
    this.options = [
            {
                name: 'Hoy',
                code: 'today',
            },
            {
                name: 'Ayer',
                code: 'yesterday',
            },
            {
                name: 'Esta semana',
                code: 'week'
            },
            {
                name: 'Ultima',
                code: 'lastweek'
            },
            {
                name: 'Este mes',
                code: 'month'
            },
            {
                name: 'Últimos mes',
                code: 'lastmonth'
            },
            {
                name: 'LMTD',
                code: 'lmtd'
            },
            {
                name: 'Rango fechas',
                code: 'range'
            }
        ];
  }

  // Events
  
  evtOnDatePickerSelect($event: any): void{
    if(this.datesFormControl.value[0] && this.datesFormControl.value[1]){
        const date_from = formatDate(this.datesFormControl.value[0], 'yyyy-MM-dd', 'en-US');
        const date_to = formatDate(this.datesFormControl.value[1], 'yyyy-MM-dd', 'en-US');
        this.dates.date_from = date_from;
        this.dates.date_to = date_to;
        console.log(this.dates);
        this.loadData();
    }
  }


  // Data
  
  loadData(): void{
    this.loading = true;
    setTimeout(() => {
        this.loading = false;
    }, 2000);
  }


}
