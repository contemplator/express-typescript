import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
import { Student } from '../models/student';
import { DbModel } from '../models/db-model';

@Controller('/student')
export class StudentController {
  private model: DbModel;

  constructor() {
    this.model = new DbModel();
  }

  @Get('/query')
  async query(req: Request, res: Response) {
    try {
      const result = await this.model.callProcedure('queryStudents');
      res.json(result[0]);
    } catch (error) {
      res.json(error);
    }
  }

  @Post('/add')
  async add(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.model.callProcedure('addStudent', data);
      res.json(result[0]);
    } catch (error) {
      res.json(error);
    }
  }

  @Post('/update')
  async update(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.model.callProcedure('updateStudent', data);
      res.json(result[0]);
    } catch (error) {
      res.json(error);
    }
  }

  @Post('/delete')
  async delete(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await this.model.callProcedure('deleteStudent', data);
      res.json(result[0]);
    } catch (error) {
      res.json(error);
    }
  }
}