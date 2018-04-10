import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
import { ProcedureModel } from '../models/procedureModel';
import * as request from 'request';
import { WeChat } from '../models/wechat';
import { RegisterNotification } from '../models/registerNotification';

@Controller('/weapp')
export class WeappController {

    private model: ProcedureModel;
    private tokenModel = WeChat.Instance;
    constructor() {
        this.model = new ProcedureModel();
    }

    @Post('/login')
    login(req: Request, res: Response) {
        let data = req.body;
        this.model.callProcedure('login', data).then((result: any) => {
            res.json(result);
        }).catch((error: any) => {
            res.json(error);
        });
    }

    @Post('/fetchSchedules')
    fetchSchedules(req: Request, res: Response) {
        let data = req.body;
        this.model.callProcedure('fetchSchedules', data).then((result: any) => {
            res.json(result);
        }).catch((error: any) => {
            res.json(error);
        });
    }

    @Post('/getOpenId')
    getOpenId(req: Request, res: Response) {
        const code = req.body.code;
        const appid = 'wx6b906029ede29d16';
        const secret = 'b1917f4c09c7237d073e9f05cf64e699';

        request.get({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code`,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                res.json(body)
            } else {
                console.error(error);
                res.json(error)
            }
        });
    }

    @Post('/preRegister')
    preRegister(req: Request, res: Response) {
        let data = req.body;
        this.model.callProcedure('preRegister', data).then((result: any) => {
            res.json(true);
            this.postTemplateMsg(data.formId, data.userId, result[0]);
        }).catch((error: any) => {
            console.log(error);
            res.json(false);
        });
    }

    /**
     * 推送預約掛號成功的模板信息
     * @param formId 
     * @param userId 
     * @param recordData 
     */
    async postTemplateMsg(formId: string, userId: string, recordData: any) {
        let token = '';
        if (this.tokenModel.checkTokenIsWork()) {
            token = this.tokenModel.token;
        } else {
            await this.tokenModel.getAccessToken();
            token = this.tokenModel.token;
        }

        let data = new RegisterNotification(userId, formId, recordData.waitingNum, recordData.patientName, recordData.date.toFormatString('YYYY-MM-DD'), recordData.doctorName, recordData.address, recordData.recordId, recordData.symptoms, recordData.price);

        request.post({
            url: `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${token}`,
            json: true,
            body: data
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('postTemplateMsg', body);
            } else {
                console.error('postTemplateMsg', body);
            }
        });
    }
}
