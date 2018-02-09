import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('Get Heho list', () => {
    it('it should be array and length is not zero', ()=>{
        return chai.request(app).get('/heroes')
        .then((res)=>{
            expect(res.status).to.equal(200);
            expect(res).to.be.json;
            expect(res.body).to.be.an('array');
            expect(res.body).not.have.length(0);
        });
    });

    it('the first one should be leo', ()=>{
        return chai.request(app).get('/heroes/1')
        .then((res)=>{
            let hero = res.body;
            expect(res).to.be.json;
            expect(hero).to.have.all.keys(['id', 'name', 'level', 'skills']);
            expect(hero.name).to.equal('Leo');
        });
    });

    it('the sixth hero should not exist', ()=>{
        return chai.request(app).get('/heroes/6')
        .then((res)=>{
            expect(res.body).to.equal(null);
        });
    });
});