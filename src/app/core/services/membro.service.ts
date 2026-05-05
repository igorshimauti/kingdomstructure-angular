import {Injectable} from '@angular/core';
import {Membro} from '@shared/models/membro.model';
import {CrudService} from './crud.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Page} from '@shared/models/page.model';

@Injectable({
  providedIn: 'root'
})
export class MembroService extends CrudService<Membro> {
  // protected apiUrl = 'http://localhost:8080/kingdom/membro';
  protected apiUrl = 'https://kingdomstructure-377235163eba.herokuapp.com/kingdom/membro';

  constructor(http: HttpClient) {
    super(http);
  }

  getFuncoes(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(`${this.apiUrl}/funcao`);
  }

  getMembrosComoPares(): Observable<{ [key: string]: string }> {
    return this.findAll().pipe(
      map(page => this.extrairTodasAsPaginas(page))
    );
  }

  private extrairTodasAsPaginas(page: Page<Membro>): { [key: string]: string } {
    const pares: { [key: string]: string } = {};

    if (page && page.content) {
      page.content.forEach(membro => {
        pares[membro.id] = membro.nomeCompleto;
      });
    }

    return pares;
  }
}
