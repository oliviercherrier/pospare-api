//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var User = require('../models/User');

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
/*
  * Test the /GET route
  */
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/api/v1/users')
                .set('useremail', 'olivier.cherrier@gmail.com')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);

                    var admin = res.body[0];
                    // Test basic property of user olivier
                    admin.should.have.property('firstname').eql('Olivier');
                    admin.should.have.property('lastname').eql('Cherrier');
                    admin.should.have.property('email').eql('olivier.cherrier@gmail.com');
                    // Check that roles is populated
                    admin.should.have.property('roles');
                    admin.roles.should.be.a('array');
                    admin.roles.length.should.be.eql(1);
                    admin.roles[0].should.have.property('name').eql('Administrator');
                    done();
                });
        });
    });

    describe ('/GET user', () => {
        it('it should GET user Olivier Cherrier', (done) => {
            chai.request(server)
                .get('/api/v1/users/1')
                .set('useremail', 'olivier.cherrier@gmail.com')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');

                    // Test basic property of user olivier
                    res.body.should.have.property('firstname').eql('Olivier');
                    res.body.should.have.property('lastname').eql('Cherrier');
                    res.body.should.have.property('email').eql('olivier.cherrier@gmail.com');

                    // Check that roles is populated
                    res.body.should.have.property('roles');
                    res.body.roles.should.be.a('array');
                    res.body.roles.length.should.be.eql(1);
                    res.body.roles[0].should.have.property('name').eql('Administrator');

                    // Check that workout is populated
                    res.body.should.have.property('workouts');
                    res.body.workouts.should.be.a('array');
                    res.body.workouts.length.should.be.eql(1);
                    res.body.workouts[0].should.have.property('name').eql("Sortie à vélo de l'après midi");

                    done();
                });
        }); 
    });

});