import * as request from 'request';
import { resolve } from 'path';

export class WeChat {
    private static _instance: WeChat;
    private appid: string = 'wx6b906029ede29d16';
    private secret: string = 'b1917f4c09c7237d073e9f05cf64e699';
    public token: string = '';
    public expireTime: number = 0;

    private constructor() { }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public getAccessToken() {
        return new Promise((resolve, reject) => {
            request.post({
                url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.secret}`,
                json: true
            }, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    this.token = body.access_token;
                    const now = new Date();
                    this.expireTime = now.addSeconds(body.expires_in).getTime();
                    resolve(body);
                } else {
                    reject(body);
                }
            });
        });

    }

    public checkTokenIsWork(): boolean {
        const now = (new Date()).getTime();
        return this.expireTime - now > 10000;
    }

    public getOnlyToken(): Promise<any> {
        return new Promise((resolve) => {
            if (this.checkTokenIsWork()) {
                return resolve(this.token);
            } else {
                this.getAccessToken().then(()=>{
                    return resolve(this.token);
                });
            }
        })

    }
}