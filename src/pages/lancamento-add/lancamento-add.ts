import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Lancamento } from '../../class/lancamento';
import { DaoLancamentoProvider } from '../../providers/dao-lancamento/dao-lancamento';
import { ContasDaoProvider } from '../../providers/contas-dao/contas-dao';

/**
 * Generated class for the LancamentoAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lancamento-add',
  templateUrl: 'lancamento-add.html',
})
export class LancamentoAddPage {

  public lancamento: Lancamento;
  public contas: any[] = [];
  public referencia_mes: number = 0;
  public referencia_ano: number = 0;
  public listYears: number[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public daoLancamentos: DaoLancamentoProvider,
              public daoContas: ContasDaoProvider,
              public toast: ToastController,
              public alertCtrl: AlertController) {
    this.lancamento = new Lancamento();
    let data = new Date();
    this.lancamento.REFERENCIA_MES = data.getMonth();
    this.lancamento.REFERENCIA_ANO = data.getFullYear();
    this.lancamento.TIPO = 'C';

    if (this.navParams.data.id) {
      this.daoLancamentos.get(this.navParams.data.id)
        .then((result: any) => {
          this.lancamento = result;
        })
    }
  }

  ionViewDidEnter() {
    this.getContas();
    this.setListYears();
  }

  setListYears() {
    for (let index = this.lancamento.REFERENCIA_ANO-5; index < this.lancamento.REFERENCIA_ANO+10; index++) {
      this.listYears.push(index);
    }
  }

  getContas() {
    this.daoContas.getList().then((data:any) => {
      this.contas = data;
    }).catch(e => console.error(e));
  }

  salvar() {
    // Validar campos antes de salvar
    // Não deixar o usuário enviar formulário sem os campos obrigatórios
    if (this.lancamento.DESCRICAO == null || this.lancamento.DESCRICAO == undefined || !this.lancamento.DESCRICAO.trim()) {
      this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: 'Informe a Descrição do Lançamento!',
        buttons: [ {
          text: 'Ok'
        }]
      }).present();
      return false;
    }
    if (this.lancamento.VALOR == null || this.lancamento.VALOR == undefined) {
      this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: 'Informe o Valor do Lançamento!',
        buttons: [ {
          text: 'Ok'
        }]
      }).present();
      return false;
    }
    if (this.lancamento.CONTA == null || this.lancamento.CONTA == undefined) {
      this.alertCtrl.create({
        title: 'Atenção!',
        subTitle: 'Informe a Conta do Lançamento!',
        buttons: [ {
          text: 'Ok'
        }]
      }).present();
      return false;
    }

    if (this.lancamento.ID) {
      return this.daoLancamentos.update(this.lancamento)
                .then(() => {
                  this.toast.create({
                    message: 'Lançamento salvo com sucesso!',
                    duration: 1500,
                    position: 'botton'
                  }).present();
                  this.navCtrl.pop();
                })
                .catch((e) => {
                  console.error(e)
                  this.toast.create({
                    message: e,
                    duration: 1500,
                    position: 'botton'
                  }).present();
                });
    } else {
      return this.daoLancamentos.insert(this.lancamento)
                  .then(() => {
                    this.toast.create({
                      message: 'Lançamento salvo com sucesso!',
                      duration: 1500,
                      position: 'botton'
                    }).present();
                    this.navCtrl.pop();
                  })
                  .catch((e) => {
                    console.error(e)
                    this.toast.create({
                      message: e,
                      duration: 1500,
                      position: 'botton'
                    }).present();
                  });
    }
  }
}
