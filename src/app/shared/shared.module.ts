import { RgMaskPipe } from './pipes/rg-mask.pipe';
import { CpfMaskPipe } from './pipes/cpf-mask.pipe';
import { RgExistentesValidatorDirective } from './directives/rg-existentes-validator.directive';
import { CpfCnpjExistentesValidatorDirective } from './directives/cpfCnpj-existentes-validator.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageComponent } from './message/message.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MessageComponent,
    CpfCnpjExistentesValidatorDirective,
    RgExistentesValidatorDirective,
    CpfMaskPipe,
    RgMaskPipe],
  exports: [
    MessageComponent,
    CpfCnpjExistentesValidatorDirective,
    RgExistentesValidatorDirective,
    CpfMaskPipe,
    RgMaskPipe]
})
export class SharedModule { }
