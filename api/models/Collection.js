/**
* Collection.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'angelhacks',
	tableName: 'collections',
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
 		},
 		description: {
 			type: 'string'
 		}
 	},
 	getById: function(id, cb) {
 		Collection.findOne({id: id}).exec(function(error, data) {
 			if (error) {
 				return cb(error);
 			}
 			return cb(data);
 		});
 	},
 	getCollectionStamps: function(id, cb) {
 		Stamp.find({collection_id: id}).exec(function(error, data) {
 			if (error) {
 				return cb(error);
 			}
 			return cb(data);
 		});
 	},
 	getUserCollections: function(user_id, cb) {
 		Collection.query('SELECT * FROM collections WHERE id IN (SELECT collection_id FROM stamps WHERE id IN (SELECT stamp_id FROM stamp_registry WHERE user_id = ' + user_id + '))', function(error, data) {
 			if (error) {
				return cb({error: true});
			}
			else {
				delete data["oid"];
			  	delete data["command"];
			  	delete data["fields"];
			 	delete data["_parsers"];
			  	delete data["rowAsArray"];
			  	return cb(data);
			}
 		});
 	},
 	getUserCollected: function(id, user_id, cb) {
 		Stamp.query('SELECT * FROM stamps WHERE collection_id = ' + id + ' AND id IN (SELECT id FROM stamp_registry WHERE user_id = ' + user_id + ')', function(error, data) {
			if (error) {
				return cb({error: true});
			}
			else {
				delete data["oid"];
			  	delete data["command"];
			  	delete data["fields"];
			 	delete data["_parsers"];
			  	delete data["rowAsArray"];
			  	return cb(data);
			}
		});
	},

};

