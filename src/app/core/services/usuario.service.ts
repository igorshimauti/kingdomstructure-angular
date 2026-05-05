import {Injectable} from '@angular/core';
import {Usuario} from '@shared/models/usuario.model';
import {CrudService} from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario> {
  // protected apiUrl = 'http://localhost:8080/kingdom/usuario';
  protected apiUrl = 'https://kingdomstructure-377235163eba.herokuapp.com/kingdom/usuario';
}
