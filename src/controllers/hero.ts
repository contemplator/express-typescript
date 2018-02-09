import { Router, Request, Response, NextFunction } from 'express';
import { Heroes, Hero } from './Heroes';

const router: Router = Router();
router.get('/', getAll);
router.get('/:id', getHero);

function getAll(req: Request, res: Response, next: NextFunction) {
    res.json(Heroes);
}

function getHero(req: Request, res: Response) {
    let query = parseInt(req.params.id);
    let hero: Hero|any = Heroes.find(hero => hero.id === query);
    if(hero){
        res.json(hero);
    }else{
        res.json(null);
    }
}

export const HeroController: Router = router;