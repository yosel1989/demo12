import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AuthRequest, User } from './auth.interface';
import { StorageService } from 'app/core/services/storage.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private baseUrl = environment.authUrl;

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) {}

  login(request: AuthRequest) {
    return this.http.post<User>(`${this.baseUrl}`, request);
  }

  logout(){
    this.storageService.removeToken();
    this.router.navigate(['/auth']);
  }

}
