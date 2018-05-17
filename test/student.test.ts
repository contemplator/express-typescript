import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const host = '/student';

describe('測試 mysql procedure 執行狀況', () => {
  let lastAddHeroId = 0;

  it('查詢', () => {
    return chai.request(app)
      .get(`${host}/query`)
      .then(res => {
        expect(res).have.status(200);
        expect(res).to.be.json;
      })
      .catch(err => {
        throw err;
      })
  });

  // it('不存在 procedure', () => {
  //   return chai.request(app)
  //     .get(`${host}/query`)
  //     .then(res => {
  //       expect(res).have.status(200);
  //       expect(res).to.be.json;
  //     })
  //     .catch(err => {
  //       throw err;
  //     })
  // });

  it('增加資料', () => {
    return chai.request(app)
      .post(`${host}/add`)
      .send({
        name: 'Leo',
        birthday: '2018-01-01',
        gender: 1
      })
      .then(res => {
        expect(res).have.status(200);
        expect(res).to.be.json;
      })
      .catch(err => {
        throw err;
      })
  });

  it('增加資料，錯誤資料內容', () => {
    return chai.request(app)
      .post(`${host}/add`)
      .send({
        name: 'Leo',
        birthday: '2018-01-32',
        gender: 1
      })
      .then(res => {
        expect(res).have.status(200);
        expect(res).to.be.json;
      })
      .catch(err => {
        throw err;
      })
  });

  it('增加資料，欄位缺失', () => {
    return chai.request(app)
      .post(`${host}/add`)
      .send({
        birthday: '2018-01-01',
        gender: 1
      })
      .then(res => {
        expect(res).have.status(200);
        expect(res).to.be.json;
      })
      .catch(err => {
        throw err;
      })
  });

  it('修改資料', () => {
    return chai.request(app)
      .post(`${host}/update`)
      .send({
        id: 15,
        name: 'Leo',
        birthday: '1990-01-01',
        gender: 1
      })
      .then(res => {
        expect(res).have.status(200);
        expect(res).to.be.json;
      })
      .catch(err => {
        throw err;
      })
  });

  it('刪除資料', () => {
    return chai.request(app)
      .post(`${host}/delete`)
      .send({
        id: 15
      })
      .then(res => {
        expect(res).have.status(200);
        expect(res).to.be.json;
      })
      .catch(err => {
        throw err;
      })
  });
});
