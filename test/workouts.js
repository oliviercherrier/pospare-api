//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

var mongoose = require("mongoose");
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
    beforeEach((done) => { 
        //Before each test we empty the database

        //Remove Roles
        Role.remove({}, (err) => {
            //Remove Users
            User.remove({}, (err) => {
                // Remove Workouts
                Workout.remove({}, (err) => {
                    // Create user olivier.cherrier@gmail.com
                    Role.create({"name" : "Administrator"},(err, adminRole) => {
                        Workout.create({name: "Sortie à vélo"}, (err, myWorkout) => {
                            User.create({ firstname : "Olivier", businessId: "1", lastname : "Cherrier", email : "olivier.cherrier@gmail.com", roles:[adminRole], workouts: [myWorkout]}, (err) => { 
                                done();             
                            });
                        });
                    });
                });
            });
        });
    });

    describe('/GET workouts', () => {
         it('it should GET all workouts of user olivier.cherrier@gmail.com', (done) => {
            chai.request(server)
                .get('/api/v1/users/1/workouts')
                .set('useremail', 'olivier.cherrier@gmail.com')
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                   
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    res.body[0].should.have.property('name').eql("Sortie à vélo");
                    done();
                });
         });
    });
});