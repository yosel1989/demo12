import { AfterViewInit, Component, OnInit } from '@angular/core';
import { StorageService } from 'app/core/services/storage.service';
import { MetronicInitService } from 'app/core/services/metronic-init.service';
import { DatePipe } from '@angular/common';

import { MenuItem } from 'primeng/api';
import { Toolbar } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButton } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MdlSorteoComponent } from '../../modals/mdl-sorteo/mdl-sorteo.component';

declare var KTDataTable: any;

@Component({
  selector: 'app-tbl-sorteos',
  imports: [Toolbar, ButtonModule, SplitButton, InputTextModule, IconField, InputIcon, TooltipModule],
  templateUrl: './tbl-sorteos.component.html',
  styleUrl: './tbl-sorteos.component.scss'
})
export class TblSorteosComponent implements OnInit, AfterViewInit {

  ldData: boolean = false;
  items: MenuItem[] | undefined;

  datatable: any | undefined;

  ref: DynamicDialogRef | undefined;
  mdlSoteoComponent: MdlSorteoComponent | undefined;

  constructor(
	//private metronicInitService: MetronicInitService,
	private storageService: StorageService,
	private datePipe: DatePipe,
	public dialogService: DialogService
	) {}

  ngOnInit(): void {
	this.items = [
		{
			label: 'Update',
			icon: 'pi pi-refresh'
		},
		{
			label: 'Delete',
			icon: 'pi pi-times'
		}
	];
  }

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
	this.datatable = new KTDataTable(datatableEl, options);
	
	this.datatable.on('init', () => {
		console.log('init event');
	});
	
	this.datatable.on('draw', () => {
		console.log('draw event');
	});
  }

  // Events
  evtOnReload(): void{
	this.datatable?.reload();
  }

  evtOnCreate(): void{
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
