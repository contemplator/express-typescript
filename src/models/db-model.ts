import * as mysql from 'mysql';
import * as appConfig from "../app-config";

export class DbModel {
  constructor() { }

  callProcedure(name: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let db = mysql.createConnection(appConfig.dbConfig);
      db.connect();
      db.query(`call ${name}('${JSON.stringify(data)}');`, (error: mysql.MysqlError, rows: any[]) => {
        if (error) { reject(error) }
        else { resolve(rows[0]); }
        db.end();
      });
    })
  }
}