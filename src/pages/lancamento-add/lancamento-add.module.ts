import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentoAddPage } from './lancamento-add';


@NgModule({
  declarations: [
    LancamentoAddPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentoAddPage),
  
  ],
})
export class LancamentoAddPageModule {}
