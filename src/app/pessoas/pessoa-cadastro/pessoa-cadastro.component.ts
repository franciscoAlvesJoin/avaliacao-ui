import { EnderecoService } from './../../endereco/endereco.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pt_BR: any;

  pessoa = new Pessoa();
  maskCPF = [ /[1-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  cpf: string;
  maskCNPJ = [ /[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-' , /\d/, /\d/];
  cnpj: string;
  cpfCnpjEdicao: string;
  rgEdicao: string;
  tipos = [
    { label: 'Física', value: 'F' },
    { label: 'Jurídica', value: 'J' },
  ];
  ufs = [];
  municipios = [];
  disableMunicipios = false;

  constructor(
    private enderecoService: EnderecoService,
    private pessoaService: PessoaService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    this.initCalendarPtBr();
    this.pessoa.tipo = 'F';
    const codigoPessoa = this.route.snapshot.params['codigo'];
    this.title.setTitle('Nova pessoa');
    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
    this.carregarUfs();
    this.enderecoService.listarUFs().then(reslt => {});
  }

  limparFisicaJurica() {
    this.pessoa.cpfCnpj = '';
    this.cpf = '';
    this.cnpj = '';
    this.pessoa.rg = null;
  }

  get editando() {
    return Boolean(this.pessoa.codigo)
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .then(pessoa => {
        this.pessoa = pessoa;
        if (pessoa.tipo === 'F') {
          this.cpf = pessoa.cpfCnpj;
        } else if (pessoa.tipo === 'J') {
          this.cnpj = pessoa.cpfCnpj;
        }
        this.cpfCnpjEdicao = pessoa.cpfCnpj;
        this.rgEdicao = pessoa.rg;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
    this.pessoa.cpfCnpj = this.cpf ? this.cpf : this.cnpj;
    this.pessoa.cpfCnpj = this.removePontuacao(this.pessoa.cpfCnpj)
    if (this.pessoa.rg) {
      this.pessoa.rg = this.removePontuacao(this.pessoa.rg);
    } else {
      this.pessoa.rg = null;
    }


    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
     this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionada => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['/pessoas', pessoaAdicionada.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
      this.pessoa.tipo = 'F';
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  carregarUfs() {
    this.enderecoService.listarUFs()
      .then(ufs => {
        this.ufs = ufs;
        if (this.editando) {
          this.onChangeUf(this.pessoa.endereco.uf);
        }
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  onChangeUf(value: any) {
    this.disableMunicipios = false;
    this.carregaMunicipos(this.getCodigoEstado(value));
  }

  getCodigoEstado(value: any): string {
    for (const uf of this.ufs) {
        if (uf.value === value) {
          return uf.geonameId;
        }
    }
  }

  carregaMunicipos(codigoEstado: string) {
    this.enderecoService.listarCidades(codigoEstado)
    .then(cidades => {
      this.municipios = cidades;
      this.disableMunicipios = true;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  removePontuacao(cpfCnpj: string): string {
    cpfCnpj = (cpfCnpj.replace(/\./g, ''));
    cpfCnpj = (cpfCnpj.replace(/\-/g, ''));
    cpfCnpj = (cpfCnpj.replace(/\//g, ''));
    return cpfCnpj;
  }

  initCalendarPtBr() {
    this.pt_BR = {
      firstDayOfWeek: 0,
      dayNames: [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ],
      dayNamesShort: [ 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb' ],
      dayNamesMin: [ 'D', 'S', 'T', 'Q', 'Q', 'S', 'S' ],
      monthNames: [ 'Janeiro', 'Fevereiro', 'Março', 'Abril',
       'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ],
      monthNamesShort: [ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez' ]
    };
  }
}
