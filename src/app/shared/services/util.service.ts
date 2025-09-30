import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private alertService: AlertService
  ) { }

  private datePipe = new DatePipe('en-US')

  dateFormat(stringDateISO: string, format: string): any {
    return this.datePipe.transform(stringDateISO, format) || '';
  }

  copy(body?: string, message?: string): void{
    navigator.clipboard.writeText(body || '').then(() => {
      this.alertService.showToast({ icon: 'success', title: message || 'Copiado al portapapeles', position: "bottom-end" });
    });
  }

}
