/**
* ImageRegistry.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	connection: 'angelhacks',
	tableName: 'image_registry',
	migrate: 'alter',
	autoCreatedAt: true,
	autoUpdatedAt: false,
 	attributes: {
 		image_url: {
 			type: 'string',
 			required: true
 		},
 		stamp_registry_id: {
 			type: 'integer'
 		}
 	},
 	register: function(stamp_registry_id, image_url, cb) {
 		ImageRegistry.create({
 			stamp_registry_id: stamp_registry_id,
 			image_url: image_url
 		}).exec(function(error, data) {
 			if (error) {
 				return cb(error);
 			}
 			StampRegistry.setImage(stamp_registry_id, image_url, function(result) {
 				return cb(result);
 			});
 		});
 	}
};

