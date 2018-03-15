import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
import { ProModel } from '../models/preModel';
import * as http from 'http';
import * as request from 'request';

@Controller('/weapp')
export class WeappController {

    private model: ProModel;
    constructor() {
        this.model = new ProModel();
    }

    @Post('/login')
    login(req: any, res: Response) {
        let data = req.body;
        this.model.callProcedure('login', data).then((result: any) => {
            res.json(result);
        }).catch(error => {
            res.json(error);
        });
    }

    @Post('/fetchSchedules')
    fetchSchedules(req, res) {
        let data = req.body;
        this.model.callProcedure('fetchSchedules', data).then(result => {
            res.json(result);
        }).catch(error => {
            res.json(error);
        });
    }

    @Post('/getOpenId')
    getOpenId(req, res) {
        const code = req.body.code;
        const appid = 'wx6b906029ede29d16';
        const secret = 'b1917f4c09c7237d073e9f05cf64e699';

        http.get('https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code', response => {
            response.setEncoding("utf8");
            let body: any = '';
            response.on("data", data => {
                body += data;
            });
            response.on("end", () => {
                body = JSON.parse(body);
                res.json(body);
            });
        }).on('error', error => {
            res.json(error);
        });
    }

    @Post('/preRegister')
    preRegister(req, res) {
        let data = req.body;
        this.model.callProcedure('preRegister', data).then(result => {
            res.json(true);
            this.postTemplateMsg(data.formId);
        }).catch(error => {
            console.log(error);
            res.json(false);
        });
    }

    @Get('/getAccessToken')
    getAccessToken(req, res) {
        const code = req.body.code;
        const appid = 'wx6b906029ede29d16';
        const secret = 'b1917f4c09c7237d073e9f05cf64e699';

        http.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`, response => {
            response.setEncoding("utf8");
            let body: any = '';
            response.on("data", data => {
                body += data;
            });
            response.on("end", () => {
                body = JSON.parse(body);
                res.json(body);
            });
        }).on('error', error => {
            res.json(error);
        });
    }

    postTemplateMsg(formId) {
        const token = '7_6ORoJXdDGAh1pC_BdLFySxX3NNk-A83FtuUTuhJw2RlyH7XFwV37GPjYRbwFiumDkt5vU59L5LvVfaduN2lKl_9sXQdIp3NZNEk5QJmzrQUHVPTgdhyvYkETbXtcCiikgOdyyGP-xw5Q4-P_CZGfAJAKHO';
        var data = {
            touser: 'oAIP10D0rx4aIVRfa-Yy52GCJh3M',
            template_id: 'ECwOXbKxAajFS_blKGPRp7bxVYNHDOYsEgwn4ZAE0RU',
            form_id: formId,
            data: {
                "keyword1": {
                    "DATA": "张三",
                    "value": "339208499",
                    "color": "#173177"
                },
                "keyword2": {
                    "DATA": "2016/01/01",
                    "value": "339208499",
                    "color": "#173177"
                },
                "keyword3": {
                    "DATA": "門診",
                    "value": "339208499",
                    "color": "#173177"
                },
                "keyword4": {
                    "DATA": "中山路",
                    "value": "339208499",
                    "color": "#173177"
                },
                "keyword5": {
                    "DATA": "中醫",
                    "value": "339208499",
                    "color": "#173177"
                }
            }
        };
        console.log(data);
        var post_options = {
            host: 'api.weixin.qq.com',
            port: '80',
            path: `/cgi-bin/message/wxopen/template/send?access_token=${token}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        request.post({
            url: `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${token}`,
            json: true,
            body: data
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log(false, body);
            } else {
                console.error(false, body);
            }
        });
    }
}
