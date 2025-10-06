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
import { GridCountsComponent } from 'app/features/dashboard/components/containers/grid-counts/grid-counts.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [FormsModule, ReactiveFormsModule, DatePickerModule, Select, ButtonModule, InputGroupModule, InputGroupAddonModule, SkeletonModule, CardModule, GridCountsComponent],
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
        const today = new Date();
        switch( value ) {
            case 'today': 
                    this.dates = {date_from: formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), date_to: formatDate(new Date(), 'yyyy-MM-dd', 'en-US')};  
                    break;
            case 'yesterday': 
                    const yesterday = new Date();
                    yesterday.setDate(today.getDate() - 1);
                    this.dates = {date_from: formatDate(yesterday, 'yyyy-MM-dd', 'en-US'), date_to: formatDate(yesterday, 'yyyy-MM-dd', 'en-US')};  
                    break;
            case 'week': 
                    const dayOfWeek = today.getDay();
                    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
                    const monday = new Date(today);
                    monday.setDate(today.getDate() + diffToMonday);
                    const diffToSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
                    const sunday = new Date(today);
                    sunday.setDate(today.getDate() + diffToSunday);
                    this.dates = {date_from: formatDate(monday, 'yyyy-MM-dd', 'en-US'), date_to: formatDate(sunday, 'yyyy-MM-dd', 'en-US')};
                    break;
            case 'month':
                    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
                    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); 
                    this.dates = {date_from: formatDate(startOfMonth, 'yyyy-MM-dd', 'en-US'), date_to: formatDate(endOfMonth, 'yyyy-MM-dd', 'en-US')};

                    break;
            case 'range': break;
            default: 
                    break;
        }
    });
  }

  ngOnInit() {
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
    }
  }


  // Data



}
