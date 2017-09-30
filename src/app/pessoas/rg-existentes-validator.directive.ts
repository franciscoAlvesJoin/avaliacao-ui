import { Observable } from 'rxjs/Observable';
import { PessoaService } from './pessoa.service';
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
  selector: '[rgExistente]',
  providers: [{
    provide: NG_ASYNC_VALIDATORS,
    useExisting: RgExistentesValidatorDirective, multi: true
  }]
})
export class RgExistentesValidatorDirective implements Validator {

  @Input() rgEdicao: string;


  constructor(private pessoaService: PessoaService) { }

  validate(control: AbstractControl): Promise<{ [key: string]: any }> {


    const rg = control.value.replace(/[^0-9]/g, '');

    if (this.rgEdicao && this.rgEdicao === rg) {
      return new Promise((resolve, reject) => {
        return resolve(null);
      });
    }

    if (!(rg.length === 9)) {
      return new Promise((resolve, reject) => {
        return resolve(null);
      }
      )
    }

    return new Promise((resolve, reject) => {

      this.pessoaService.verificaRg(rg)
        .then(response => {
          if (response === true) {
            return resolve({ 'rgExistente': response });
          }
          return resolve(null);
        });
    });
  }
}





