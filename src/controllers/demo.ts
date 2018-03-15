import { Request, Response, NextFunction } from 'express';
import { Params, Controller, Get, Post } from '@decorators/express';
import * as fs from 'fs';
import * as path from 'path';
import * as sha1 from 'sha1';

@Controller('/test')
export class DemoController {

    @Get('/')
    auth(req: Request, res: Response) {
        const signature = req.query.signature;
        const timestamp = req.query.timestamp;
        const nonce = req.query.nonce;
        const echostr = req.query.echostr;
        const token = 'tudi';

        let arr = [token, timestamp, nonce];
        arr = arr.sort();
        let arrStr = arr.join("");
        let encode = sha1(arrStr);

        res.send(echostr);
    }

    @Get('/hello')
    hello(req: Request, res: Response) {
        res.send('hello');
    }

    @Get('/me')
    me(request, response, next) {
        response.json(request.session ? request.session.userInfo : { noBody: true });
        if (request.session) {
            console.log(`Wafer session success with openId=${request.session.userInfo.openId}`);
        }
    };
}
