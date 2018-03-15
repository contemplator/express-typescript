import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
import * as sha1 from 'sha1';
import * as nodeWeixinMessage from 'node-weixin-message';
import { WeChat } from '../models/wechat';
import * as request from 'request';

@Controller('/')
export class WexinController {
    private messages = nodeWeixinMessage.messages;
    private reply = nodeWeixinMessage.reply;
    private service = nodeWeixinMessage.service;

    @Post('/')
    auth(req: Request, res: Response) {
        const signature = req.query.signature;
        const timestamp = req.query.timestamp;
        const nonce = req.query.nonce;
        const echostr = req.query.echostr;
        const token = 'tudi';
        const openId = req.query.openid;
        const body = req.body;
        console.log(req.body);

        let arr = [token, timestamp, nonce];
        arr = arr.sort();
        let arrStr = arr.join("");
        let encode = sha1(arrStr);

        let wechat = WeChat.Instance;
        wechat.getAccessToken().then((tokenObject: any) => {
            let token = tokenObject.access_token;
            console.log(token);
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

        // console.log(this.reply);
        // var text = this.reply.text('wx6b906029ede29d16', openId, '嗨嗨');
        // console.log(text);
        // res.send('success');

    }

    @Get('/token')
    accessToken(req, res) {
        let wechat = WeChat.Instance;
        wechat.getAccessToken().then(response => {
            console.log(response);
            res.json(response);
        });
    }
}


function responseText(message, res, callback, extra) {
    console.log('hi', message, res);
    //message => 解析后的JSON
    //res => res
    //callback => callback
    //extra => 'some data',
    //Extra
    res.send(message);
}