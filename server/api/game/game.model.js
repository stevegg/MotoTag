'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GameSchema = new Schema({
    owner: {type: Schema.ObjectId, ref: 'UserSchema'},
    name: String,
    description: String,
    type: Number,
    latitude: Number,
    longitude: Number,
    radius: Number,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
