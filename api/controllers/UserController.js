/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getById: function(req, res) {
		User.getById(req.param('id'), function(result) {
			return res.send(result);
		});
	},
	getUserCollections: function(req, res) {
		Collection.getUserCollections(req.param('id'), function(result) {
			return res.send(result);
		});
	},
	getUserCollected: function(req, res) {
		Collection.getUserCollected(req.param('id'), req.param('user_id'), function(result) {
			return res.send(result);
		});
	},
	getCollectionStamps: function(req, res) {
		Collection.getCollectionStamps(req.param('id'), function(result) {
			return res.send(result);
		});
	}
};

