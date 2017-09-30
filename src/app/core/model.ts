export class Endereco {
  municipio: string;
  uf: string;
}

export class Pessoa {
  codigo: number;
  nome: string;
  dataNascFund: Date;
  tipo: string;
  rg: string;
  cpfCnpj: string;
  endereco = new Endereco();

}


