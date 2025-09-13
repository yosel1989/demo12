import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-mdl-sorteo',
  imports: [FormsModule, DatePicker, InputNumberModule],
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
