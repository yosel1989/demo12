import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly TOKEN_KEY = '_t';

 
  private storage: Storage = localStorage;

  setToken(token: string): void {
    this.storage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return this.storage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    this.storage.removeItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  useSessionStorage(): void {
    this.storage = sessionStorage;
  }

  useLocalStorage(): void {
    this.storage = localStorage;
  }
}
