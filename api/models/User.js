/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'angelhacks',
	tableName: 'users',
	migrate: 'alter',
	autoCreatedAt: false,
	autoUpdatedAt: false,
 	attributes: {
 		name: {
 			type: 'string',
 			required: true
 		},
 		image_url: {
 			type: 'string',
 			required: true
 		},
 		banner_url: {
 			type: 'string',
 			required: true
 		}
 	},
 	getById: function(id, cb) {
 		User.findOne({id: id}).exec(function(error, data) {
 			if (error) {
 				return cb(error);
 			}
 			return cb(data);
 		});
 	}
};

