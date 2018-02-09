import { Router, Request, Response, NextFunction } from 'express';
// const Heroes = require('../data');


export class HeroRouter {
    router: Router

    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Heroes.
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        res.json([
            new Hero(1, 'Leo', 1, ['預測未來']),
            new Hero(2, 'Mylio', 1, ['透視', '飛行']),
            new Hero(3, 'May', 1, ['把水變熱', '高壓水柱']),
            new Hero(4, 'Ken', 1, ['飛葉快刀', '寄生']),
            new Hero(5, 'Brown', 1, ['復活'])
        ]);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get('/', this.getAll);
    }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;

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