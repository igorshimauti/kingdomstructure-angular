import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Token} from '@shared/models/token.model';
import {Login} from '@shared/models/login.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/kingdom/auth';
  private platformId = inject(PLATFORM_ID);
  private _isAuthenticated = signal(false);

  constructor(private http: HttpClient) {
    this._isAuthenticated.set(this.hasValidToken());
  }

  login(credentials: Login): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, credentials).pipe(
      tap(token => {
        localStorage.setItem('type', token.type);
        localStorage.setItem('token', token.token);
        localStorage.setItem('expiresIn', String(token.expiresIn));
        localStorage.setItem('time', String(Date.now()));

        this._isAuthenticated.set(true);
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('type');
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
      localStorage.removeItem('time');

      this._isAuthenticated.set(false);
    }
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const type = localStorage.getItem('type');
    const token = localStorage.getItem('token');

    if (!type || !token) {
      return null;
    }

    return `${type} ${token}`;
  }

  isAuthenticated() {
    return this._isAuthenticated;
  }

  private hasValidToken(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const token = this.getToken();
    const expiresIn = Number(localStorage.getItem('expiresIn'));
    const time = Number(localStorage.getItem('time'));

    if (!token || !expiresIn || !time) {
      return false;
    }

    const expirationTime = time + expiresIn;
    return Date.now() < expirationTime;
  }
}
