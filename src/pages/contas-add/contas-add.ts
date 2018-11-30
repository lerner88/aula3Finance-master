import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Conta } from '../../class/conta';
import { ContasDaoProvider } from '../../providers/contas-dao/contas-dao';
/**
 * Generated class for the ContasAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contas-add',
  templateUrl: 'contas-add.html',
})
export class ContasAddPage {

  public conta: Conta;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public daoConta: ContasDaoProvider,
              public alertCtrl: AlertController) {
      this.conta = new Conta();

      if (this.navParams.data.id) {
        this.daoConta.get(this.navParams.data.id).then((result:any) => {
          this.conta = result;
        });
      }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ContasAddPage');
  }

  salvar() {
    if (this.conta.ID) {
      // update
      this.daoConta.update(this.conta)
                   .then(() => {
                     this.alert();
                     this.navCtrl.pop();
                   });
    } else {
      this.daoConta.insert(this.conta)
                   .then(() => {
                     this.alert();
                     this.navCtrl.pop();
                   });
     }
  }

  alert() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: 'Registro salvo com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }
}
