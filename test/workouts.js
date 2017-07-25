//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
var Promise = require('bluebird');

// Require models
var User = require('../models/User');
var Workout = require('../models/Workout');
var Role = require('../models/Role');

//Require the dev-dependencies
var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

describe('Workouts', () => {
    beforeEach(function(done) { 
        Role.remove({})
            .then(() => User.remove({}))
            .then(() => Workout.remove({}))
            .then(() => Role.create({name: "Administrator"}))
            .then((adminRole) => User.create({ firstname : "Olivier", businessId: "1", lastname : "Cherrier", email : "olivier.cherrier@gmail.com", roles:[adminRole]}))
            .then (()=> done())
            .catch((err) => console.error(err));
    });

    describe('/GET workouts', function() {
         it('it should GET all workouts of user olivier.cherrier@gmail.com', function (done) {
            chai.request(server)
                .get('/api/v1/users/1/workouts')
                .set('useremail', 'olivier.cherrier@gmail.com')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                   
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
         });
    });


    describe('/POST workout', function() {
         it('it should add an active workout with name "Sortie à vélo unitaire" to user "1"', function (done) {
            chai.request(server)
                .put('/api/v1/users/1/workouts')
                .set('useremail', 'olivier.cherrier@gmail.com') // Header data
                .send({name: 'Sortie à vélo unitaire'}) // Form data
                .end((err, res) => {
                    // Test answer of REST API
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql("Workout created!");


                    // Test data inserted into database
                    User.findByPospareId(1,["workouts"], function (err,user) {
                        user.workouts.should.be.a('array');
                        user.workouts.length.should.be.eql(1);
                        
                        user.workouts[0].should.have.property('name').eql("Sortie à vélo unitaire");
                        user.workouts[0].should.have.property('active').eql(true);
                        done();
                    });
                });
            
         });

         it('it should add an active workout with no name to user "1"', function(done) {
            chai.request(server)
                .put('/api/v1/users/1/workouts')
                .set('useremail', 'olivier.cherrier@gmail.com') // Header data
                .end((err, res) => {
                    res.body.should.have.property('message').eql("Workout created!");

                    should.not.exist(err);
                    res.should.have.status(200);

                    User.findByPospareId(1,["workouts"], (err,user) => {
                        user.workouts.should.be.a('array');
                        user.workouts.length.should.be.eql(1);
                        should.not.exist(user.workouts[0].name);
                        user.workouts[0].should.have.property('active').eql(true);
                        done();
                    });
                    
                }
            );
         });

         it('it should get workouts of users "1"', function(done) {
            chai.request(server)
                .get('/api/v1/users/1/workouts')
                .set('useremail', 'olivier.cherrier@gmail.com') // Header data
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                   
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                    
                }
            );
         });
    });
});