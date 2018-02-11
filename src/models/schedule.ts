// import { ScheduleEntity } from "../entities/schedule";
// import { getManager } from "typeorm";
import * as mysql from 'mysql';
import * as appConfig from "../app-config";
import '../util/date-extension';

export class ScheduleModel {
    private db;
    constructor() {
    }

    callProcedure(name: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db = mysql.createConnection(appConfig.dbOptions);
            this.db.connect();
            this.db.query(`call ${name}('${JSON.stringify(data)}');`, (error, rows, fields) => {
                if (error) { reject(error) }
                else { resolve(rows[0]); }
                this.db.end();
            });
        })
    }

    getSchedules(data: any): Promise<any> {
        return this.callProcedure('fetchSchedules', data);
    }
}