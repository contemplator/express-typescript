import { Controller, Get } from "@decorators/express";
import * as nodeWeixinMessage from 'node-weixin-message';

@Controller('/wexin')
export class WexinTextController {
    private messages = nodeWeixinMessage.messages;
    private reply = nodeWeixinMessage.reply;

    @Get('/text')
    text(req, res, next) {
        // this.messages.on.text(responseText);
        console.log(this.reply);
        var text = this.reply.text('FromUserName', 'ToUserName', 'content');
        console.log(text);
        // res.send()
        // res.send('hi');
        res.send(text)
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