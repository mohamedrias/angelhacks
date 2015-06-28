/**
 * StampController
 *
 * @description :: Server-side logic for managing stamps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var images = require("images");

module.exports = {
	getStamp: function(req, res) {
		Stamp.getById(req.param('id'), function(result) {
			return res.send(result);
		});
	},
	getStampByLocation: function(req, res) {
		Stamp.getByLocation(req.param('lat'), req.param('long'), function(result) {
			return res.send(result);
		});
	},
	registerStamp: function(req, res) {
		Stamp.getById(req.param('stamp_id'), function(result) {
			if (result.lat - parseFloat(req.param('lat')).toFixed(3) <= 0.005 && result.long - parseFloat(req.param('long')).toFixed(3) <= 0.005) {
				StampRegistry.register(req.param('stamp_id'), req.param('user_id'), req.param('collect'), function(innerResult) {
					if (req.param('file') !== 'false') {
						var filename = require('uuid').v4() + '.png';
						req.file('image').upload({
							maxBytes: 5000000,
							dirname: '/var/www/static/stamps',
							saveAs: filename
						}, function(error, image) {
				    		if (error || image.length === 0) {
				     			return res.send({code: 500, message: "Internal server error."});
				    		}
				    		else {
				    			ImageRegistry.register(innerResult.id, 'http://static.thefanzhang.com/stamps/' + filename, function(result) {
				    				return res.send('<img src = "http://static.thefanzhang.com/stamps/' + filename + '">');
				    			});
				    			
				    		}
				    	});
					}
					else {
						return res.send("done");
					}
				});
			}
			else {
				return res.send("No match.");
			}
		})
		
	},
	incrementStamp: function(req, res) {
		StampRegistry.get(req.param('stamp_id'), req.param('user_id'), function(result) {
			if (result.collect) {
				StampRegistry.increment(req.param('stamp_id'), req.param('user_id'), function(innerResult) {
					return res.send(innerResult);

				});
			}
		});
	},
};

