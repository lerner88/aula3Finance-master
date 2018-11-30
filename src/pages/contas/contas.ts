import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { ContasAddPage } from '../contas-add/contas-add'

import { ContasDaoProvider } from '../../providers/contas-dao/contas-dao';

/**
 * Generated class for the ContasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contas',
  templateUrl: 'contas.html',
})
export class ContasPage {

  public listContas: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public daoContas: ContasDaoProvider,
              public alertCtrl: AlertController) {

  }

  ionViewDidEnter() {
    this.getList();
  }

  getList() {
    //
    this.daoContas.getList()
                  .then((data: any[]) => {
                    console.log(data);
                    this.listContas = data;
                  })
                  .catch();
  }

  toContasAdd() {
    this.navCtrl.push(ContasAddPage);
  }

  delete(conta) {
    this.daoContas.delete(conta.ID).then(() => {
      var index = this.listContas.indexOf(conta);
      this.listContas.splice(index, 1);

      const alert = this.alertCtrl.create({
        title: 'Deletado!',
        subTitle: 'Registro deletado com sucesso!',
        buttons: ['OK']
      });
      alert.present();
    });
  }


  toContasUpdate(id){
    this.navCtrl.push(ContasAddPage, {"id":id});
  }
}
