import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get User Info', () => {
    it('it should be leo object', ()=>{
        return chai.request(app).get('/user')
        .then((res)=>{
            expect(res).to.be.json;
            expect(JSON.stringify(res.body)).to.equal(JSON.stringify({id: 1, name: "Leo"}));
        });
    });

    it('query paramter id should be 1', ()=>{
        return chai.request(app).get('/user/1')
        .then((res)=>{
            let user = res.body;
            expect(res).to.be.json;
            expect(user.id).to.equal(1);
        });
    });

    it('post should work', ()=>{
        return chai.request(app).post('/user/info').send({id: 2, name: "May"})
        .then((res)=>{
            let user = res.body;
            expect(res).to.be.json;
            expect(JSON.stringify(res.body)).to.equal(JSON.stringify({id: 2, name: "May"}));
        })
    })
});