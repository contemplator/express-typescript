import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;
const host = '/hero';

describe('英雄路由', () => {
  let lastAddHeroId = 0;

  it('取得陣列資料', () => {
    return chai.request(app)
      .get(`${host}/all`)
      .then(res => {
        expect(res).have.status(200);
        expect(res).to.be.json;
        expect(res.body).length.greaterThan(0);
      })
      .catch(err => {
        console.error(err);
        throw err;
      })
  });

  it('取得單一筆資料', () => {
    return chai.request(app)
      .get(`${host}/1`)
      .then(res => {
        expect(res.body).have.property('name');
        expect(res.body.name).to.equal('鋼鐵人');
      })
      .catch(err => {
        console.error(err);
        throw err;
      })
  });

  it('新增一筆資料', () => {
    return chai.request(app)
      .post(`${host}/add`)
      .send({ 'name': 'Leo', 'skills': ['上網', '打電動'] })
      .then(res => {
        expect(res.body.id).to.equal(4);
      })
      .catch(err => {
        console.error(err);
        throw err;
      })
  });

  it('查詢剛剛新增的資料', () => {
    return chai.request(app)
      .post(`${host}/query`)
      .send({ 'skills': '上網' })
      .then(res => {
        expect(res.body).to.be.an('array');
      })
      .catch(err => {
        console.error(err);
        throw err;
      })
  });

  it('刪除剛剛新增的資料', () => {
    return chai.request(app)
      .post(`${host}/delete`)
      .send({ 'id': lastAddHeroId })
      .then(res => {
        expect(res.body).to.equal(true);
      })
      .catch(err => {
        // console.error(err);
        throw err;
      })
  });

  it('查詢剛剛刪除的資料', () => {
    return chai.request(app)
      .post(`${host}/query`)
      .send({ 'name': 'Leo' })
      .then(res => {
        expect(res.body.length).to.be.equal(0);
      })
      .catch(err => {
        console.error(err);
        throw err;
      })
  });
});
