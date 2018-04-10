import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { WeappController } from './controllers';
import { attachControllers } from '@decorators/express';

let session: any = require('wafer-node-session');
var MySQLStore = require('express-mysql-session')(session);
import { dbConfig, wexinConfig } from './app-config';
import { WexinController } from './controllers/wexin';

// Creates and configures an ExpressJS web server.
class App {

    // ref to Express instance
    public express: express.Application;

    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        // 微信 session
        var sessionStore = new MySQLStore(dbConfig);
        this.express.use(session({
            appId: wexinConfig.appid,
            appSecret: wexinConfig.secret,
            loginPath: '/login',
            store: sessionStore
        }));

        // create a write stream (in append mode)
        let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
        this.express.use(logger('combined', { stream: accessLogStream }))
    }

    // Configure API endpoints.
    private routes(): void {
        attachControllers(this.express, [WeappController, WexinController]);
    }
}

export default new App().express;
