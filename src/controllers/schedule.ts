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

    @Get('/:date')
    getSchedules(req: Request, res: Response) {
        let date = req.params.date;
        this.scheduleModel.getSchedules(date).then((result: any) => {
            res.json(result);
        }).catch(error=>{
            res.json(error);
        });

    }
}
