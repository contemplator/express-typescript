import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { HeroController, UsersController, ScheduleController, WeixinController, LoginController } from './controllers';
import { attachControllers } from '@decorators/express';

import * as session from 'wafer-node-session';
import * as MySQLStore from 'express-mysql-session';
// var MySQLStore = require('express-mysql-session')(session);


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
        // this.express.use(session({
        //     appId: 'wx6b906029ede29d16',           // 小程序 appId 
        //     appSecret: '...',       // 小程序 appSecret 
        //     loginPath: '/login',    // 登录地址 
        //     store: new RedisStore({ ... })      // 会话存储 
        // }))


        // create a write stream (in append mode)
        let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
        this.express.use(logger('combined', {stream: accessLogStream}))
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/hero', HeroController);
        attachControllers(this.express, [UsersController, ScheduleController, LoginController, WeixinController]);
    }
}

export default new App().express;
