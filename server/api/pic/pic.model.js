'use strict';


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var userSchema = require('../user/user.model');


var PicSchema = new Schema({
    owner: {type: Schema.ObjectId, ref: 'User'},
    data: Buffer, 
    contentType: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pic', PicSchema);
