import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
import { ScheduleModel } from "../models/schedule";
// import { ScheduleEntity } from "../entities/schedule";

@Controller('/schedule')
export class ScheduleController {

    private scheduleModel: ScheduleModel;
    constructor(){
        this.scheduleModel = new ScheduleModel();
    }

    @Post('/')
    getSchedules(req: Request, res: Response) {
        let data = req.body;
        this.scheduleModel.getSchedules(data).then((result: any) => {
            res.json(result);
        }).catch(error=>{
            res.json(error);
        });
    }
}
