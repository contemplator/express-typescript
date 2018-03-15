import * as request from 'request';
import { resolve } from 'path';

export class WeChat {
    private static _instance: WeChat;

    private constructor(){ }

    appid: string = 'wx6b906029ede29d16';
    secret: string = 'b1917f4c09c7237d073e9f05cf64e699';
    token: string = '';

    public static get Instance(){
        return this._instance || (this._instance = new this());
    }

    public getAccessToken(){
        return new Promise((resolve, reject)=>{
            request.post({
                url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.secret}`,
                json: true
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    // Return false if succeeded, else true
                    resolve(body);
                    console.log(false, body);
                } else {
                    reject(body);
                    console.error(false, body);
                }
            });
        });
        
    }
}