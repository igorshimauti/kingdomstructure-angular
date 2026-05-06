import {inject, Injectable, PLATFORM_ID, signal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Token} from '@shared/models/token.model';
import {Login} from '@shared/models/login.model';
import MD5 from 'crypto-js/md5';

type JwtPayload = {
  tipo?: string;
  tipoUsuario?: string;
  userType?: string;
  [key: string]: unknown;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'http://localhost:8080/kingdom/auth';
  private apiUrl = 'https://kingdomstructure-377235163eba.herokuapp.com/kingdom/auth';
  private platformId = inject(PLATFORM_ID);
  private _isAuthenticated = signal(false);

  constructor(private http: HttpClient) {
    this._isAuthenticated.set(this.hasValidToken());
  }

  login(credentials: Login): Observable<Token> {
    const payload: Login = {
      ...credentials,
      senha: MD5(credentials.senha).toString()
    };

    return this.http.post<Token>(`${this.apiUrl}/login`, payload).pipe(
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

  getUserType(): string | null {
    const payload = this.getTokenPayload();

    if (!payload) {
      return null;
    }

    const tipo = payload['tipo'] ?? payload['tipoUsuario'] ?? payload['userType'];
    return typeof tipo === 'string' ? tipo : null;
  }

  isAdmin(): boolean {
    return this.getUserType() === 'ADMINISTRADOR';
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

  private getTokenPayload(): JwtPayload | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    const parts = token.split('.');

    if (parts.length !== 3) {
      return null;
    }

    try {
      const payload = parts[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const normalizedPayload = payload.padEnd(Math.ceil(payload.length / 4) * 4, '=');
      const decodedPayload = atob(normalizedPayload);

      return JSON.parse(decodedPayload) as JwtPayload;
    } catch {
      return null;
    }
  }
}
