import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { DashboardCountsRequestDto, DashboardCountsResponseDto } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = `${environment.apiUrl}/admin/dashboard/counts`;

  constructor(private http: HttpClient) {}

  getCounts(params: DashboardCountsRequestDto): Observable<DashboardCountsResponseDto> {
    let httpParams = new HttpParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        httpParams = httpParams.set(key, value.toString());
      }
    });

    return this.http.get<any>(this.baseUrl, { params: httpParams }).pipe(
      map(response => response.data)
    );
  }

}
