import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContasAddPage } from './contas-add';

@NgModule({
  declarations: [
    ContasAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ContasAddPage),
  ],
})
export class ContasAddPageModule {}
