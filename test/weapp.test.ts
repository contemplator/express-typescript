import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const host = '/weapp/';

describe('微信 server', () => {
    it('登入', () => {
        return chai.request(app).post(`${host}/login`).send({"phone": "0982245628", "birthday": "1993-01-03"})
            .then((res) => {
                expect(res).to.be.json;
                expect(res.body[0].name).to.equal('林庭弘');
            });
    });

    // it('取得 open Id', () => {
        // return chai.request(app).post('/schedule').send({"date": "2018-02-30"})
        //     .then(res => {
        //         expect(res).to.be.json;
        //         expect(res.body).to.have.length(0)
        //     })
    // });

    // 綁定 open id

    // 取得今日門診

    // 預約掛號
});