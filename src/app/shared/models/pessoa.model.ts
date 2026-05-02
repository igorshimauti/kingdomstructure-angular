import {BaseModel} from './baseModel.model';

export interface Pessoa extends BaseModel {
  cpf: string,
  email: string,
  nomeCompleto: string,
  telefone: string,
  whatsapp: boolean
}
