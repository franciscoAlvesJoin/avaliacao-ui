import { PessoaService } from './../../pessoas/pessoa.service';
import { Observable } from 'rxjs/Observable';
import { Input } from '@angular/core';
import { Directive, OnInit, ViewChild } from '@angular/core';
import { NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Validator } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/takeWhile';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[cpfCnpjExistente]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: CpfCnpjExistentesValidatorDirective, multi: true
  }]
})
export class CpfCnpjExistentesValidatorDirective implements Validator {

  @Input() cpfCnpjExistente: string;
  @Input() cpfCnpjEdicao: string;


  constructor(private pessoaService: PessoaService) { }



  validate(control: AbstractControl): Promise<{ [key: string]: any }> {
    const cpfCnpj = control.value.replace(/[^0-9]/g, '');

    if (this.cpfCnpjEdicao && this.cpfCnpjEdicao === cpfCnpj) {
        return new Promise((resolve, reject) => {
        return resolve(null);
      });
    }

    return new Promise((resolve, reject) => {

      if ((this.cpfCnpjExistente === 'cpf' && cpfCnpj.length === 11)
        || (this.cpfCnpjExistente === 'cnpj' && cpfCnpj.length === 14)) {

        this.pessoaService.verificaCpfCnpj(cpfCnpj)
          .then(response => {
            if (response === true) {
              return resolve({ 'cpfCnpjExistente': response });
            }
            return resolve(null);
          });
      }
    });
  }
}





