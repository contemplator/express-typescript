import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
import { Hero } from '../models';

@Controller('/hero')
export class HeroController {
  heroes: Hero[] = [
    new Hero(1, '鋼鐵人', ['噴射', '建造武器']),
    new Hero(2, '雷神索爾', ['閃電', '揮槌子']),
    new Hero(3, '奇異博士', ['任意門', '時空跳躍'])
  ];

  @Get('/all')
  async getAllHeroes(req: Request, res: Response) {
    try {
      res.json(this.heroes);
    } catch (error) {
      res.json(error);
    }
  }

  @Get('/:id')
  async getHero(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const match = this.heroes.find(item => item.id === id);
      res.json(match);
    } catch (error) {
      res.json(error);
    }
  }

  @Post('/add')
  async addHero(req: Request, res: Response) {
    try {
      const params = req.body;
      const hero = new Hero(this.heroes.length + 1, params.name, params.skills);
      this.heroes.push(hero);
      res.json(hero);
    } catch (error) {
      res.json(error);
    }
  }

  @Post('/query')
  async queryHeroes(req: Request, res: Response) {
    try {
      const keyword = req.body.skills;
      const matches = this.heroes.filter(item => item.skills.indexOf(keyword) > -1);
      res.json(matches);
    } catch (error) {
      res.json(error);
    }
  }

  @Post('/delete')
  async delete(req: Request, res: Response) {
    try {
      const index = this.heroes.findIndex(item => item.id === req.body.id);
      this.heroes.splice(index, 1);
      if (this.heroes.length === 3) { res.json(true); }
      else { res.json(false); }
    } catch (error) {
      res.json(error);
    }
  }
}