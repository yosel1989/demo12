import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthRequest, User } from './auth.interface';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private baseUrl = environment.authUrl;

  constructor(private http: HttpClient) {}

  login(request: AuthRequest) {
    return this.http.post<User>(`${this.baseUrl}`, request);
  }

}
