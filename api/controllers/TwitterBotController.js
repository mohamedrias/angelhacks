/**
 * TwitterBotController
 *
 * @description :: Server-side logic for managing Twitterbots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Twitter = require('twitter');
/*
var client = new Twitter.RestClient(
    'b1yLPuqnyoAblt6L3jDsbX3k1',
    'kuBX57iMq4KmOYjKubuzYGM6WQCAI9KyhCBtZh6WyQHEuxPG4H',
    '3008414405-1fp07ZRcuRI1H7loGbwmf5V5jn6JwlcmFXI8VYB',
    '1475X6VlczT0zTxBKJf1OVn5DiUAc6vNWn4AqWfwW4cnP'
);*/

var client = new Twitter({
  consumer_key: 'b1yLPuqnyoAblt6L3jDsbX3k1',
  consumer_secret: 'kuBX57iMq4KmOYjKubuzYGM6WQCAI9KyhCBtZh6WyQHEuxPG4H',
  access_token_key: '3008414405-1fp07ZRcuRI1H7loGbwmf5V5jn6JwlcmFXI8VYB',
  access_token_secret: '1475X6VlczT0zTxBKJf1OVn5DiUAc6vNWn4AqWfwW4cnP'
});

var username = "@fanwashere";
var messages = [
	username + " Baby is crying!",
	username + " Emergency! Baby is crying!",
	username + " Warning! Baby is crying!",
	username + " Oh no! Baby is crying!",
	username + " Something happened! Baby is crying!",
];
var curMessage = 0;
var cried = false;

module.exports = {
	cry: function(req, res) {
		cried = true;
		curMessage === 4 ? curMessage = 0 : curMessage++;
		var params = {status: messages[curMessage]};
		client.post('statuses/update', params, function(error, tweets, response){
		  if (!error) {
		    return res.send(response);
		  }
		  else {
		  	return res.send(error);
		  }
		});
	},
	check: function(req, res) {
		if (cried) {
			return res.send("Baby is crying!");
		}
		else {
			return res.send("Baby is OK!");
		}
	},
	stop: function(req, res) {
		cried = false;

		return res.send("Stopped");
	},
	addPhoto: function(req, res) {
		var filename = require('uuid').v4() + '.png';
		req.file('image').upload({
			maxBytes: 5000000,
			dirname: '/var/www/static/babypics',
			saveAs: filename
		}, function(error, image) {
    		if (error || image.length === 0) {
     			return res.send({code: 500, message: "Internal server error."});
    		}
    		else {
    			BabyPicture.add('http://static.thefanzhang.com/babypics/' + filename, function(result) {
    				return res.send(filename);
    			});
    		}
    	});
	},
	viewPhoto: function(req, res) {
		BabyPicture.list(function(result) {
			return res.send(result);
		})
	}
};

