import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SorteoDto, SorteoPayloadDto } from '../models/sorteo.model';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SorteoService {
  private baseUrl = `${environment.apiUrl}/admin/sorteo`;

  constructor(private http: HttpClient) {}

  /*// Obtener un sorteo por UUID
  getSorteo(uuid: string): Observable<SorteoDto> {
    return this.http.get<SorteoDto>(`${this.baseUrl}/${uuid}`);
  }

  // Obtener todos los sorteos
  getSorteos(): Observable<SorteoDto[]> {
    return this.http.get<SorteoDto[]>(this.baseUrl);
  }*/

  // Crear un nuevo sorteo
  createSorteo(payload: SorteoPayloadDto): Observable<SorteoDto> {
    return this.http.post<SorteoDto>(this.baseUrl, payload);
  }
}
