import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CalendarModule } from 'primeng/components/calendar/calendar';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { CommonModule } from '@angular/common';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { DataTableModule } from 'primeng/components/datatable/datatable';
import { ButtonModule } from 'primeng/components/button/button';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { SharedModule } from './../shared/shared.module';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasRoutingModule } from './pessoas-routing.module';

import { TextMaskModule } from 'angular2-text-mask';
import { CpfCnpjModule } from 'ng2-cpf-cnpj';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DataTableModule,
    TooltipModule,
    InputMaskModule,
    SelectButtonModule,
    CalendarModule,
    CpfCnpjModule,
    TextMaskModule,
    SharedModule,
    PessoasRoutingModule,
    DropdownModule

  ],
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
    ],
  exports: []
})
export class PessoasModule { }
