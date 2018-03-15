import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
let sha1 = require('sha1');
let nodeWeixinMessage = require('node-weixin-message');
import { WeChat } from '../models/wechat';
import * as request from 'request';

@Controller('/')
export class WexinController {
    private messages = nodeWeixinMessage.messages;
    private reply = nodeWeixinMessage.reply;
    private service = nodeWeixinMessage.service;

    @Post('/')
    auth(req: Request, res: Response) {
        // const signature = req.query.signature;
        // const timestamp = req.query.timestamp;
        // const nonce = req.query.nonce;
        // const token = 'tudi';
        const openId = req.query.openid;
        const body = req.body;

        // let arr = [token, timestamp, nonce];
        // arr = arr.sort();
        // let arrStr = arr.join("");
        // let encode = sha1(arrStr);

        if (!body) { return; }
        let wechat = WeChat.Instance;
        wechat.getAccessToken().then((tokenObject: any) => {
            let token = tokenObject.access_token;
            request.post({
                url: `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${token}`,
                json: true,
                body: {
                    "touser": 'oAIP10D0rx4aIVRfa-Yy52GCJh3M',
                    "msgtype": "text",
                    "text": {
                        "content": "Hello World"
                    }
                }
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(false, body);
                } else {
                    console.error(false, body);
                }
            });
        })
    }

    @Get('/token')
    accessToken(req: Request, res: Response) {
        let wechat = WeChat.Instance;
        wechat.getAccessToken().then(response => {
            console.log(response);
            res.json(response);
        });
    }
}