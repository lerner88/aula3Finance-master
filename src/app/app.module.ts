import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { IntroPageModule } from '../pages/intro/intro.module';
import { ContasPageModule } from '../pages/contas/contas.module';
import { ContasAddPageModule } from '../pages/contas-add/contas-add.module';
import { LancamentoAddPageModule } from '../pages/lancamento-add/lancamento-add.module';

import { ContasDaoProvider } from '../providers/contas-dao/contas-dao'
import { DatabaseProvider } from '../providers/database/database';
import { DaoLancamentoProvider } from '../providers/dao-lancamento/dao-lancamento';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IntroPageModule,
    ContasPageModule,
    ContasAddPageModule,
    LancamentoAddPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    ContasDaoProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    DaoLancamentoProvider
  ]
})
export class AppModule {}
