/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var fs = require('fs');

var User = require('../api/user/user.model');
var Game = require('../api/game/game.model');
var Pic = require('../api/pic/pic.model');

var steveUser;

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    username: 'tuser',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    username: 'auser',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );

});

Game.find({}).remove(function() {

  // Create a user that will own some games
  User.create({
    provider: 'local',
    username: 'sgoyette',
    name: 'Steve Goyette',
    email: 'steve@goyettefamily.com',
    password: 'orange'
  }, function(err, user) {

    // Create the image
    Pic.create({
      owner: user,
      data: fs.readFileSync(__dirname + '/game1.jpg'),
      contentType: 'image/jpg'
    }, function( err, pic ) {

      Game.create({
        owner: user,
        name: 'Island Game',
        description: 'This is my sample game played on Vancouver Island',
        type: 1,
        latitude: 49.2167,
        longitude: 122.6000,
        radius: 200,
        pic: pic
      }, function(err) {
        if ( err ) {
          console.log(err);
        }
        console.log('finished populating games');
      });
    });

    Pic.create({
      owner: user,
      data: fs.readFileSync(__dirname + '/game2.jpg'),
      contentType: 'image/jpg'
    }, function(err, pic) {
      Game.create({
        owner: user,
        name: 'Local Game',
        description: 'This is another game in the area',
        type: 1,
        latitude: 49.2167,
        longitude: 122.6000,
        radius: 200,
        pic: pic
      }, function(err) {
        if ( err ) {
          console.log(err);
        }
        console.log('finished populating games');
      });
    });
  });

});
