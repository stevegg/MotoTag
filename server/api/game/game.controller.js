/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /games              ->  index
 * POST    /games              ->  create
 * GET     /games/:id          ->  show
 * PUT     /games/:id          ->  update
 * DELETE  /games/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var game = require('./game.model');
var user = require('../user/user.model');


// Get list of games
exports.index = function(req, res) {
    game.find(function (err, games) {
        if(err) { return handleError(res, err); }
        return res.json(200, games);
    }).populate('owner');
};

// Get a single game
exports.show = function(req, res) {
    game.findById(req.params.id, function (err, game) {
        if(err) { return handleError(res, err); }
        if(!game) { return res.send(404); }
        return res.json(game);
    }).populate('owner');
};

// Creates a new game in the DB.
exports.create = function(req, res) {
    game.create(req.body, function(err, game) {
        if(err) { return handleError(res, err); }
        return res.json(201, game);
    });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    game.findById(req.params.id, function (err, game) {
        if (err) { return handleError(res, err); }
        if(!game) { return res.send(404); }
        var updated = _.merge(game, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, game);
        });
    });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
    game.findById(req.params.id, function (err, game) {
        if(err) { return handleError(res, err); }
        if(!game) { return res.send(404); }
        game.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
