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
  query(req: Request, res: Response) {
    this.model.callProcedure('queryStudents').then((result: any) => {
      res.json(result[0]);
    }).catch((error: any) => {
      res.json(error);
    });
  }

  @Post('/add')
  add(req: Request, res: Response) {
    const data = req.body;
    this.model.callProcedure('addStudent', data).then((result: any) => {
      res.json(result[0]);
    }).catch((error: any) => {
      res.json(error);
    });
  }

  @Post('/update')
  update(req: Request, res: Response) {
    const data = req.body;
    this.model.callProcedure('updateStudent', data).then((result: any) => {
      res.json(result[0]);
    }).catch((error: any) => {
      res.json(error);
    });
  }

  @Post('/delete')
  delete(req: Request, res: Response) {
    const data = req.body;
    this.model.callProcedure('deleteStudent', data).then((result: any) => {
      res.json(result[0].res);
    }).catch((error: any) => {
      res.json(error);
    });
  }



}