import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-mdl-sorteo',
  imports: [FormsModule, DatePicker, InputNumberModule, InputTextModule, TextareaModule  ],
  templateUrl: './mdl-sorteo.component.html',
  styleUrl: './mdl-sorteo.component.scss'
})
export class MdlSorteoComponent implements OnInit, AfterViewInit {

  constructor(
	) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {

  }
}
