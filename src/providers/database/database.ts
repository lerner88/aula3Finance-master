import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(public sqlite: SQLite) { }

  /**
   * Função tem o objetivo de criar ou abrir um banco de dados SQLite
   */
  getDB() {
    return this.sqlite.create({
      name: 'lp4-finance3',
      location: 'default'
    });
  }


  /**
   * Cria a estrutura inicial do banco de dados
   */
  createDatabase() {
    return this.getDB()
               .then((db: SQLiteObject) => {
                  // Criar minhas tabelas
                  this.createTables(db);
                  // Insert dos dados iniciais
                  this.insertsDefault(db);
               })
               .catch();
  }

  /**
   * Cria as tabelas padrões do app
   */
  private createTables(db:SQLiteObject) {
    db.sqlBatch([
      // TABLE CONTAS
      ['CREATE TABLE IF NOT EXISTS CONTAS (ID INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO TEXT)'],

      // TABLE LANCAMENTOS
      ['CREATE TABLE IF NOT EXISTS LANCAMENTOS' +
        '(' +
          'ID INTEGER PRIMARY KEY AUTOINCREMENT,' +
          ' DESCRICAO TEXT,' +
          ' VALOR INTEGER,' +
          ' REFERENCIA_MES INTEGER,' +
          ' REFERENCIA_ANO INTEGER,' +
          ' PAGO BOOLEAN,' +
          ' TIPO INTEGER,' +
          ' ID_CONTA INTEGER' +
        ')']
    ])
      .then(() => console.log("Tabelas criadas com sucesso!"))
      .catch((e) => console.error("Erro ao criar as tabelas", e));
  }

  /**
   * Insere registros padrões
   */
  private insertsDefault(db:SQLiteObject) {
    db.executeSql('SELECT COUNT(ID) AS QNTD FROM CONTAS', <any>{})
      .then((data:any) => {
        if (data.rows.item(0).QNTD == 0) {
          // Inserir contas
          db.sqlBatch([
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Alimentação']],
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Saúde']],
            ['INSERT INTO CONTAS (DESCRICAO) VALUES (?)', ['Transporte']]
          ]).then(() => console.log("Inserts de contas realizado com sucesso!"))
            .catch((e) => console.error("Erro ao inserir contas padrão", e))
        }
      })
      .catch((e) => console.error("Erro ao consultar contas", e));
  }
}
