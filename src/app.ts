import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { HeroController, UsersController, ScheduleController, DemoController, WeappController } from './controllers';
import { attachControllers } from '@decorators/express';

import * as session from 'wafer-node-session';
var MySQLStore = require('express-mysql-session')(session);
import { dbOptions } from './app-config';
import { WexinTextController } from './controllers/wexin-text';
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
        var sessionStore = new MySQLStore({
            host: 'localhost',
            port: 3306,
            user: 'tudi01',
            password: 'tudi01',
            database: 'tudi_cn_his'
        });
        this.express.use(session({
            appId: 'wx6b906029ede29d16',           // 小程序 appId 
            appSecret: 'b1917f4c09c7237d073e9f05cf64e699',       // 小程序 appSecret 
            loginPath: '/login',    // 登录地址 
            store: sessionStore      // 会话存储 
        }));

        // create a write stream (in append mode)
        let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
        this.express.use(logger('combined', { stream: accessLogStream }))
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/hero', HeroController);
        // this.express.use('/me', (request:any, response, next) => { 
        //     response.json(request.session ? request.session.userInfo : { noBody: true }); 
        //     if (request.session) {
        //         console.log(`Wafer session success with openId=${request.session.userInfo.openId}`);
        //     }
        // }); 
        attachControllers(this.express, [UsersController, ScheduleController, DemoController, WeappController, WexinTextController, WexinController]);
    }
}

export default new App().express;
