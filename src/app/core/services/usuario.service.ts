import {Injectable} from '@angular/core';
import {Usuario} from '@shared/models/usuario.model';
import {CrudService} from './crud.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario> {
  // protected apiUrl = 'http://localhost:8080/kingdom/usuario';
  protected apiUrl = 'https://kingdomstructure-377235163eba.herokuapp.com/kingdom/usuario';

  getTipos(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(`${this.apiUrl}/tipo`);
  }
}
