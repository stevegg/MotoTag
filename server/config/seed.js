/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Game = require('../api/game/game.model');
var steveUser;

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
  steveUser = User.create({
    provider: 'local',
    name: 'Steve Goyette',
    email: 'steve@goyettefamily.com',
    password: 'orange'
  })
});

Game.find({}).remove(function() {

  console.log(steveUser);
  Game.create({
    owner: steveUser._id,
    name: 'My Game',
    description: 'This is my sample game',
    type: 1,
    latitude: 49.2167,
    longitude: 122.6000,
    radius: 200
  }, function() {
    console.log('finished populating games');
  })
});
