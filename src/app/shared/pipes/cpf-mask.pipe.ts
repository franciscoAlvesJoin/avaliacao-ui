import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpfMaskPipe' })
export class CpfMaskPipe implements PipeTransform {
    transform(cpfCnpj: string) {
    if (cpfCnpj.length === 11) {
        cpfCnpj = cpfCnpj.slice(0, 3) + '.' +
        cpfCnpj.slice(3, 6) + '.' +
        cpfCnpj.slice(6, 9) + '-' + cpfCnpj.slice(9, 11);
    } else if (cpfCnpj.length === 14) {
      cpfCnpj = cpfCnpj.slice(0, 2) + '.' +
      cpfCnpj.slice(2, 5) + '.' +
      cpfCnpj.slice(5, 8) + '/' +
      cpfCnpj.slice(8, 12) + '-' +
      cpfCnpj.slice(12, 14);
    }
      return cpfCnpj;
    }
}
