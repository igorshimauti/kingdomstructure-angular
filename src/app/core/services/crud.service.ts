import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Page} from '@shared/models/page.model';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudService<T> {
  protected abstract apiUrl: string;

  constructor(protected http: HttpClient) {}

  create(dto: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, dto);
  }

  findAll(params?: any): Observable<Page<T>> {
    return this.http.get<Page<T>>(this.apiUrl, { params });
  }

  findById(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  update(id: number, dto: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
