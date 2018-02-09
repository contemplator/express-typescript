import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

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
        // this.express.use(function (req, res) {
        //     res.setHeader('Access-Control-Allow-Origin', '*');
        //     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        // });
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        let router = express.Router();
        // placeholder route handler
        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        router.get('/heros', (req, res, next) => {
            res.json([
                new Hero(1, 'Leo', 1, ['預測未來']),
                new Hero(2, 'Mylio', 1, ['透視', '飛行']),
                new Hero(3, 'May', 1, ['把水變熱', '高壓水柱']),
                new Hero(4, 'Ken', 1, ['飛葉快刀', '寄生']),
                new Hero(5, 'Brown', 1, ['復活'])
            ])
        })
        this.express.use('/', router);
    }

}

export default new App().express;

class Hero {
    id: number;
    name: string;
    level: number;
    skills: string[];

    constructor(id: number, name: string, level: number, skills: string[]) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.skills = skills;
    }
}