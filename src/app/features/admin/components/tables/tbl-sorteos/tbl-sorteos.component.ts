import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageService } from 'app/core/services/storage.service';
import { MetronicInitService } from 'app/core/services/metronic-init.service';
import { DatePipe } from '@angular/common';

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
	private storageService: StorageService,
	private datePipe: DatePipe
	) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

	const datatableEl = document.querySelector('#tbl_sorteos');
	const options = {
		apiEndpoint: 'https://localhost:44304/api/v1/admin/sorteo',
		requestMethod: 'GET',
		requestHeaders:{
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + this.storageService.getToken()
		},
		mapResponse: function(res: any) {
			console.log(res);
			return {
				data: res.table.data,
				totalCount: res.table.recordsTotal,
				page: res.table.page || 1,
				pageSize: res.table.length || 10,
				totalPages:
					res.table.totalPages ||
					Math.ceil(res.table.recordsTotal / (res.table.length || 10)),
			};
		},

		columns: {
			nombre: {
				title: 'Nombre',
			},
			descripcion: {
				title: 'Descripcion',
			},
			f_sorteo: {
				title: 'Fecha Sorteo',
				render: (data: Date, type: any, row: any) => {
					return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm:ss aa') || '';
				},
			},
			f_registro: {
				title: 'Fecha Registro',
				render: (data: Date, type: any, row: any) => {
					return this.datePipe.transform(data, 'dd/MM/yyyy HH:mm:ss aa') || '';
				},
			},
			emp_registro: {
				title: 'Empleado Registro',
			},
			precio_rifa: {
				title: 'Precio Rifa',
				render: function(data: any, type: any, row: any) {
					return 'S/ ' + data.toFixed(2);
				},
				className: 'text-end',
			},
			slug: {
				title: 'Slug',
			},
			estado: {
				title: 'Estado',
				render: function(data: string, type: any, row: any) {
					let estadoColor = '';
					switch (data) {
						case 'pendiente':
							estadoColor = 'kt-badge-warning';
							break;
						case 'aperturado':
							estadoColor = 'kt-badge-success';
							break;
						case 'cerrado':
							estadoColor = 'kt-badge-secondary';
							break;
						case 'sorteado':
							estadoColor = 'kt-badge-primary';
							break;
						case 'cancelado':
							estadoColor = 'kt-badge-destructive';
							break;
						default:
							estadoColor = 'kt-badge-warning';
							break;
					}
					return  `<span class="kt-badge kt-badge-outline ${estadoColor}">${data.toUpperCase()}</span>`
				},
				class: 'mi-clase-css'
			},
		},

		pageSize: 5,
		stateSave: true,
	};
	const datatable = new KTDataTable(datatableEl, options);

	console.log(datatable);
	
	datatable.on('init', () => {
		console.log('init event');
	});
	
	datatable.on('draw', () => {
		console.log('draw event');
	});
  }
}
