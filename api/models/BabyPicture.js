/**
* BabyPicture.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'angelhacks',
	tableName: 'baby_pictures',
	migrate: 'alter',
	autoCreatedAt: true,
	autoUpdatedAt: false,
 	attributes: {
 		image_url: {
 			type: 'string',
 			required: true
 		}
 	},
 	add: function(image_url, cb) {
 		BabyPicture.create({
 			image_url: image_url
 		}).exec(function(error, data) {
 			if (error) {
 				return cb(error);
 			}
 			return cb(data);
 		});
 	}, 
 	list: function(cb) {
 		BabyPicture.query("SELECT * FROM baby_pictures ORDER BY id DESC", function(error, data) {
 			if (error) {
 				return cb(error);
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

