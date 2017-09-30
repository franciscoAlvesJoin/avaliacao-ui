import { URLSearchParams, Http } from '@angular/http';
import { Injectable } from '@angular/core';


import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { Pessoa } from './../core/model';
import * as moment from 'moment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: Http) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => {
        const pess = response.json() as Pessoa
        this.converterStringsParaDatas([pess]);
        return pess;
      });
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }



  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`,
        JSON.stringify(pessoa))
      .toPromise()
      .then(response => {
        const pess = response.json() as Pessoa
        this.converterStringsParaDatas([pess]);
        return pess;
      });
  }

  buscarPorCodigo(codigo: number): Promise<Pessoa> {
    return this.http.get(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(response => {
        const pess = response.json() as Pessoa
        this.converterStringsParaDatas([pess]);
        return pess;
      });
  }

  private converterStringsParaDatas(pessoas: Pessoa[]) {
    for (const pess of pessoas) {
      pess.dataNascFund = moment(pess.dataNascFund,
        'YYYY-MM-DD').toDate();

    }
  }

   verificaCpfCnpj(cpfCnpj: string): Promise<boolean> {
    const params = new URLSearchParams();
     params.set('cpfCnpj', cpfCnpj);
     return this.http.get(`${this.pessoasUrl}/verificaCpfCnpj`, { search: params })
     .toPromise()
     .then(response => {
      const result = response.json() as boolean
      return result;
    });
  }

  verificaRg(rg: string): Promise<boolean> {
    const params = new URLSearchParams();
     params.set('rg', rg);
     return this.http.get(`${this.pessoasUrl}/verificaRg`, { search: params })
     .toPromise()
     .then(response => {
      const result = response.json() as boolean
      return result;
    });
  }




}
