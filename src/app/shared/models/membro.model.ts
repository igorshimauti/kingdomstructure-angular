import {Pessoa} from './pessoa.model';

export interface Membro extends Pessoa {
  funcao: string,
  encontro: boolean,
  consolidado: boolean,
  batizado: boolean,
  ceifeiros: boolean,
  maturidade: boolean,
  ctl: boolean,
  seminarioPastoral: boolean
}
