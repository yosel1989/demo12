import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { TableCollectionResponse } from 'app/shared/services/models/table.model';
import { CustomerCollectionQueryParamsDto, CustomerCollectionResponseDto, CustomerDto } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = `${environment.apiUrl}/admin/customers`;

  constructor(private http: HttpClient) {}

  getAll(params: CustomerCollectionQueryParamsDto, signal?: AbortSignal): Observable<TableCollectionResponse<CustomerCollectionResponseDto[]>> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<any>(this.baseUrl, { params: httpParams }).pipe(
      map(response => ({
          data : response.table.data,
          pagination: {
            draw: response.table.draw,
            recordsTotal: response.table.recordsTotal,
            recordsFiltered: response.table.recordsFiltered,
            length: response.table.length,
            page: response.table.page
          }
      })
      )
    );
  }


}
