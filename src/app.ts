import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as fs from 'fs';
import { HeroController, UsersController, ScheduleController } from './controllers';
import { attachControllers } from '@decorators/express';

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


        // create a write stream (in append mode)
        let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
        this.express.use(logger('combined', {stream: accessLogStream}))
    }

    // Configure API endpoints.
    private routes(): void {
        this.express.use('/hero', HeroController);
        attachControllers(this.express, [UsersController, ScheduleController]);
    }
}

export default new App().express;
