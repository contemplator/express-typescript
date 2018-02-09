import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get Heho list', () => {
    it('it should be array and length is not zero', ()=>{
        return chai.request(app).get('/heros')
        .then((res)=>{
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).not.have.length(0);
        });
    });
});