import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private datePipe = new DatePipe('en-US')

  dateFormat(stringDateISO: string, format: string): any {
    return this.datePipe.transform(stringDateISO, format) || '';
  }

}
