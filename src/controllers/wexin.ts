import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
let sha1 = require('sha1');
let nodeWeixinMessage = require('node-weixin-message');
import { WeChat } from '../models/wechat';
import * as request from 'request';
import { wexinConfig } from '../app-config';
import { MsgBody } from '../models/customerMsg';

@Controller('/')
export class WexinController {
    private messages = nodeWeixinMessage.messages;
    private reply = nodeWeixinMessage.reply;
    private service = nodeWeixinMessage.service;
    private wechat = WeChat.Instance;

    @Post('/')
    weixinServiceReply(req: Request, res: Response) {
        const signature = req.query.signature;
        const timestamp = req.query.timestamp;
        const nonce = req.query.nonce;
        const token = wexinConfig.token;
        const openId = req.query.openid;
        const body = req.body;

        let arr = [token, timestamp, nonce];
        arr = arr.sort();
        let arrStr = arr.join("");
        let encode = sha1(arrStr);

        if (signature === encode) {
            if (body.MsgId) {
                this.wechat.getOnlyToken().then(() => {
                    this.robotReply(body);
                });
            }
        } else {
            console.log('failed');
        }
    }

    robotReply(body: MsgBody): void {
        let result = '';
        switch (body.MsgType) {
            case 'music':
                this.replyMusic(body);
                break;
            case 'image':
                this.replyImage(body);
                break;
            case 'text':
                this.replyText(body);
                break;
            default:
                this.replyDefault(body);
                break;
        }
    }

    replyMusic(body: MsgBody) {
        request.post({
            url: `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${this.wechat.token}`,
            body: {
                "touser": body.FromUserName,
                "msgtype": "music",
                "music": {
                    "title": "泡沫",
                    "description": "邓紫棋",
                    "musicurl": "https://www.youtube.com/watch?v=iYZ7K93ZFbE",
                    "hqmusicurl": "https://www.youtube.com/watch?v=iYZ7K93ZFbE",
                    "thumb_media_id": "_KqZERALr3exqFFikGFaKclHyRrSPe_IEl4tKKAW8akD7SxSF6kyrThBRYBjbz8m"
                }
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('replyMusic', body);
            } else {
                console.error('replyMusic', error);
            }
        });
    }

    replyImage(body: MsgBody) {
        request.post({
            url: `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${this.wechat.token}`,
            json: true,
            body: {
                "touser": body.FromUserName,
                "msgtype": "image",
                "image": {
                    "media_id": body.MediaId
                }
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('replyImage', body);
            } else {
                console.error('replyImage', error);
            }
        });
    }

    replyText(body: MsgBody) {
        let content = '';
        switch (body.Content) {
            case '1':
                content = '您要掛號';
                break;
            case '2':
                content = '您要查詢';
                break;
            case '3':
                content = '您要取消';
                break;
        }
        request.post({
            url: `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${this.wechat.token}`,
            json: true,
            body: {
                "touser": body.FromUserName,
                "msgtype": "text",
                "text": {
                    "content": content
                }
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('replyText', body);
            } else {
                console.error('replyText', error);
            }
        });
    }

    replyDefault(body: MsgBody) {
        request.post({
            url: `https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=${this.wechat.token}`,
            json: true,
            body: {
                "touser": body.FromUserName,
                "msgtype": "text",
                "text": {
                    "content": "我們會盡快安排專人回覆您的問題"
                }
            }
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                console.log('replyDefault', body);
            } else {
                console.error('replyDefault', error);
            }
        });
    }

    @Get('/')
    indexPage(req: Request, res: Response) {
        console.log(req.body, req.query);
    }

    @Get('/token')
    accessToken(req: Request, res: Response) {
        let wechat = WeChat.Instance;
        if (wechat.checkTokenIsWork) {
            res.json(wechat.token)
        } else {
            wechat.getAccessToken().then(response => {
                res.json(response);
            });
        }
    }
}