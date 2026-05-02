import {Pessoa} from './pessoa.model';

export interface Usuario extends Pessoa {
  tipoUsuario: string,
  senha: string
}
