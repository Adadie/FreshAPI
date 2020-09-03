import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
chai.use(chaiHttp);
let should = chai.should();

//Sending data test
describe('app', ()=>{
    it('display landing page', done=>{
        chai.request(app)
        .get('/')
        .end((err, res)=>{
            res.should.have.status(200);
            done();
        })
    })
}) 
