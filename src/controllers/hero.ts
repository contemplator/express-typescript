import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
import * as request from 'request';
import { Hero } from '../models';

@Controller('/hero')
export class HeroController {
  heroes: Hero[] = [
    new Hero(1, '鋼鐵人', ['噴射', '建造武器']),
    new Hero(2, '雷神索爾', ['閃電', '揮槌子']),
    new Hero(3, '奇異博士', ['任意門', '時空跳躍'])
  ];

  @Get('/all')
  getAllHeroes(req: Request, res: Response) {
    res.json(this.heroes);
  }

  @Get('/:id')
  getHero(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const match = this.heroes.find(item => item.id === id);
    res.json(match);
  }

  @Post('/add')
  addHero(req: Request, res: Response) {
    const params = req.body;
    const hero = new Hero(this.heroes.length + 1, params.name, params.skills);
    this.heroes.push(hero);
    res.json(hero);
  }

  @Post('/query')
  queryHeroes(req: Request, res: Response) {
    const keyword = req.body.skills;
    const matches = this.heroes.filter(item => item.skills.indexOf(keyword) > -1);
    res.json(matches);
  }

  @Post('/delete')
  delete(req: Request, res: Response) {
    const index = this.heroes.findIndex(item => item.id === req.body.id);
    this.heroes.splice(index, 1);
    if (this.heroes.length === 3) { res.json(true); }
    else { res.json(false); }
  }
}