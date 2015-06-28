/**
* Stamp.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'angelhacks',
	tableName: 'stamps',
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
 		issue: {
 			type: 'boolean',
 			required: true
 		},
 		collect: {
 			type: 'boolean',
 			required: true
 		},
 		lat: {
 			type: 'float',
 			required: true
 		},
 		long: {
 			type: 'float',
 			required: true
 		},
 		limited: {
 			type: 'boolean',
 			required: true
 		},
 		obtainable: {
 			type: 'boolean',
 			required: true
 		},
 		description: {
 			type: 'text',
 			required: true
 		},
 		collection_id: {
 			type: 'integer',
 		}
  },
	getById: function(id, cb) {
		Stamp.findOne({id: id}).exec(function(error, data) {
		if (error) {
			return cb({error: true});
		}
		else {
			return cb(data);
		}
	});	
	},
	getByLocation: function(lat, long, cb) {
		//default 0.0005
		lat = parseFloat(lat);
		long = parseFloat(long);
		Stamp.query("SELECT * FROM stamps WHERE lat BETWEEN " 
			+ (lat - 0.5) + " AND " + (lat + 0.5) + 
			" AND long BETWEEN " + (long - 0.5) + " AND " + (long + 0.5), function(error, data) {
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
	}
};

