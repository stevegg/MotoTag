/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /pics              ->  index
 * POST    /pics              ->  create
 * GET     /pics/:id          ->  show
 * PUT     /pics/:id          ->  update
 * DELETE  /pics/:id          ->  destroy
 * GET     /pics/me           ->  mypics
 */

'use strict';

var _ = require('lodash');
var pic = require('./pic.model');
var userController = require('../user/user.controller');

exports.picsForUser = function(req, res) {

    var userId = req.params.id;

    console.log('Getting pics for user with id: ' + userId);
        
    pic.find({'owner._id':userId}, function(err, pics) {
        console.log('got ' + pics.length + ' results');
        if ( pics.length > 0 ) {
            console.log(pics[0]);
        }
        if (err ) { return handleError(res, err); }
        return res.json(200, pics);
    }).populate('owner');

};


// Get a single pic
exports.show = function(req, res) {
    pic.findById(req.params.id, function (err, pic) {
        if(err) { return handleError(res, err); }
        if(!pic) { return res.send(404); }
        res.contentType(pic.contentType);
        return res.send(pic.data);
    }).populate('owner');
};

// Creates a new pic in the DB.
exports.create = function(req, res) {
    pic.create(req.body, function(err, pic) {
        if(err) { return handleError(res, err); }
        return res.json(201, pic);
    });
};

// Updates an existing pic in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    pic.findById(req.params.id, function (err, pic) {
        if (err) { return handleError(res, err); }
        if(!pic) { return res.send(404); }
        var updated = _.merge(pic, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.json(200, pic);
        });
    });
};

// Deletes a pic from the DB.
exports.destroy = function(req, res) {
    pic.findById(req.params.id, function (err, pic) {
        if(err) { return handleError(res, err); }
        if(!pic) { return res.send(404); }
        pic.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
