import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth.service';
import { MetronicInitService } from 'app/core/services/metronic-init.service';

declare var KTDataTable: any;

@Component({
  selector: 'app-tbl-sorteos',
  imports: [],
  templateUrl: './tbl-sorteos.component.html',
  styleUrl: './tbl-sorteos.component.scss'
})
export class TblSorteosComponent implements OnInit, AfterViewInit {

  constructor(
	private metronicInitService: MetronicInitService,
	private authService: AuthService
) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

	const datatableEl = document.querySelector('#tbl_sorteos');
	const options = {
		apiEndpoint: 'https://api.loteriatiorico.com/api/v1/file/collection',
		requestMethod: 'GET',
		requestHeaders:{
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + this.authService.getToken
		},
		pageSize: 5,
		stateSave: true,
	};
	const datatable = new KTDataTable(datatableEl, options);
	
	datatable.on('init', () => {
		console.log('init event');
	});
	
	datatable.on('draw', () => {
		console.log('draw event');
	});
  }
}
