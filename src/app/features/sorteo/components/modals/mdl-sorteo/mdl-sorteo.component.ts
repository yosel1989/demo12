import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { MessageModule } from 'primeng/message';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SorteoDto, SorteoPayloadDto } from 'app/features/sorteo/models/sorteo.model';
import { SorteoService } from 'app/features/sorteo/services/sorteo.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-mdl-sorteo',
  imports: [FormsModule, DatePicker, InputNumberModule, InputTextModule, TextareaModule, ButtonModule, EditorModule, ReactiveFormsModule, MessageModule],
  templateUrl: './mdl-sorteo.component.html',
  styleUrl: './mdl-sorteo.component.scss'
})
export class MdlSorteoComponent implements OnInit, AfterViewInit {

  @Output() OnCreated: EventEmitter<boolean> = new EventEmitter<boolean>();


  frmNuevoSorteo: FormGroup = new FormGroup({});
  isSubmitted: boolean = false;
  ldSubmit: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private apiService: SorteoService
	) {
    this.frmNuevoSorteo = this.fb.group({
      nombre: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      descripcion: new FormControl(null, Validators.maxLength(500)),
      fechaVentaInicio: new FormControl(null, Validators.required),
      fechaVentaFin: new FormControl(null, [Validators.required, this.fechaMayorQue('fechaVentaInicio')]),
      fechaSorteo: new FormControl(null, Validators.required),
      fechaExtSorteo: new FormControl(null),
      precioRifa: new FormControl(0, [Validators.min(1), Validators.required]),
      numeroInicial: new FormControl(1, [Validators.min(1), Validators.required]),
      numeroFinal: new FormControl(null, [Validators.required, this.numeroMayorQue('numeroInicial'), Validators.max(99999)])
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }

  // Getters
  get f(): any {
    return this.frmNuevoSorteo.controls;
  }

  get payload(): SorteoPayloadDto {
    const form = this.frmNuevoSorteo.value;

    return {
      nombre: form.nombre,
      descripcion: form.descripcion,
      f_inicio_venta: formatDate(form.fechaVentaInicio, 'yyyy-MM-dd HH:mm:00', 'en-US'),
      f_fin_venta: formatDate(form.fechaVentaFin, 'yyyy-MM-dd HH:mm:00', 'en-US'),
      f_sorteo: formatDate(form.fechaSorteo, 'yyyy-MM-dd HH:mm:00', 'en-US'),
      f_ext_sorteo: form.fechaExtSorteo ? formatDate(form.fechaExtSorteo, 'yyyy-MM-dd HH:mm:00', 'en-US') : null,
      precio_rifa: form.precioRifa,
      numero_min: form.numeroInicial,
      numero_max: form.numeroFinal,
      flag_rifas: true
    };
  }


  // Events
  evtOnSubmit(): void{
    console.log('submit');

    this.isSubmitted = true;
    if(this.frmNuevoSorteo.invalid){
      return;
    }

    this.ldSubmit = true;
    this.apiService.createSorteo(this.payload).subscribe({
      next: (res: SorteoDto) => {
        this.ldSubmit = false;
        //this.handlerOnSubmitSuccess(res);
        this.ref.close();
      },
      error: (err) => {
        //this.handlerOnSubmitFormError(err.error ?? "Ocurrió un error, intente nuevamente.");
        this.ldSubmit = false;
      }
    });
  }


  numeroMayorQue(controlComparado: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null; // Evita errores si el control aún no está en el grupo

      const comparado = control.parent.get(controlComparado);
      if (!comparado) return null;

      const valorActual = control.value;
      const valorComparado = comparado.value;

      if (valorActual != null && valorComparado != null && valorActual <= valorComparado) {
        return { numeroMayorQue: { requeridoMayorQue: controlComparado } };
      }

      return null;
    };
  };

  fechaMayorQue(controlComparado: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;

      const comparado = control.parent.get(controlComparado);
      if (!comparado) return null;

      const fechaActual = control.value;
      const fechaComparada = comparado.value;

      if (fechaActual && fechaComparada) {
        const fechaA = new Date(fechaActual);
        const fechaB = new Date(fechaComparada);

        if (fechaA <= fechaB) {
          return { fechaMayorQue: { requeridoMayorQue: controlComparado } };
        }
      }

      return null;
    };
  }

}
