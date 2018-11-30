import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { LancamentoAddPage } from '../lancamento-add/lancamento-add';
import { DaoLancamentoProvider } from '../../providers/dao-lancamento/dao-lancamento';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public listLancCred:any[] = [];
  public listLancDeb:any[] = [];
  public referencia_mes: number = 0;
  public referencia_ano: number = 0;
  public mes: string = '';
  public credito: string = "";
  public debito: string = "";
  public saldo: string = "";

  constructor(public navCtrl: NavController,
              public daoLancamento: DaoLancamentoProvider,
              public alertCtrl: AlertController,
              public toast: ToastController) {
    let date = new Date();
    this.referencia_mes = date.getMonth();
    this.referencia_ano = date.getFullYear();
  }

  ionViewDidEnter() {
    this.getExtrato();
    this.getListCred();
    this.getListDeb();
    this.getMes(this.referencia_mes);
  }

  getExtrato() {
    this.daoLancamento.getExtrato(this.referencia_mes, this.referencia_ano)
        .then((result: any) => {
          console.log("EXTRATOOOOOO");

          console.log(result);

          if (result.CREDITO == null) {
            result.CREDITO = 0;
          }
          if (result.DEBITO == null) {
            result.DEBITO = 0;
          }
          this.credito = result.CREDITO.toFixed(2).replace(".", ",");
          this.debito = result.DEBITO.toFixed(2).replace(".", ",");
          this.saldo = (result.CREDITO-result.DEBITO).toFixed(2).replace(".", ",");
        });
  }

  getListCred() {
    this.daoLancamento.getList(1, this.referencia_mes, this.referencia_ano)
                      .then((result: any[]) => {
                        console.log(result);
                        this.listLancCred = result;
                      });
  }

  getListDeb() {
    this.daoLancamento.getList(2, this.referencia_mes, this.referencia_ano)
                      .then((result: any[]) => {
                        console.log(result);
                        this.listLancDeb = result;
                      });
  }

  pago(id) {
    this.daoLancamento.setPago(id).then((result:any[]) => {
      console.log(result);
      this.toast.create({
        message: "Lançamento Pago!",
        duration: 1500,
        position: 'botton'
      }).present();
      this.ionViewDidEnter();
    });
  }

  delete(id) {
    this.alertCtrl.create({
      title: 'Atenção',
      message: 'Você deseja realmente excluir este registro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.daoLancamento.delete(id).then(() => {
              this.toast.create({
                message: "Registro deletado!",
                duration: 1500,
                position: 'botton'
              }).present();
              this.ionViewDidEnter();
            });
          }
        }
      ]
    }).present();
  }

  addLancamento() {
    this.navCtrl.push(LancamentoAddPage);
  }

  edit(id) {
    this.navCtrl.push(LancamentoAddPage, {"id":id});
  }

  setPreviousMonth() {
    if (this.referencia_mes == 0) {
      this.referencia_mes = 11;
      this.referencia_ano -= 1;
    } else {
      this.referencia_mes -= 1;
    }
    this.ionViewDidEnter();
  }

  setNextMonth() {
    if (this.referencia_mes == 11) {
      this.referencia_mes = 0;
      this.referencia_ano += 1;
    } else {
      this.referencia_mes += 1;
    }
    this.ionViewDidEnter();
  }

  getMes(mes) {
    switch (mes) {
      case 0:
        this.mes = "Janeiro";
        break;
      case 1:
        this.mes = "Fevereiro";
        break;
      case 2:
        this.mes = "Março";
        break;
      case 3:
        this.mes = "Abril";
        break;
      case 4:
        this.mes = "Maio";
        break;
      case 5:
        this.mes = "Junho";
        break;
      case 6:
        this.mes = "Julho";
        break;
      case 7:
        this.mes = "Agosto";
        break;
      case 8:
        this.mes = "Setembro";
        break;
      case 9:
        this.mes = "Outubro";
        break;
      case 10:
        this.mes = "Novembro";
        break;
      case 11:
        this.mes = "Dezembro";
        break;

      default:
        this.mes = "";
        break;
    }
  }

  duplicar() {
    this.alertCtrl.create({
      title: 'Atenção',
      message: 'Você deseja realmente duplicar este mês para o próximo mês?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            let mes_atual = this.referencia_mes;
            let ano_atual = this.referencia_ano;
            if (this.referencia_mes == 11) {
              this.referencia_mes = 0;
              this.referencia_ano += 1;
            } else {
              this.referencia_mes += 1;
            }
            this.daoLancamento.duplicar(mes_atual, ano_atual, this.referencia_mes, this.referencia_ano).then(() => {
              this.toast.create({
                message: "Mês Duplicado!",
                duration: 1500,
                position: 'botton'
              }).present();
              this.ionViewDidEnter();
            });
          }
        }
      ]
    }).present();
  }
}
