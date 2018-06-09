var User = require('../models/User');
var Entry = require('../models/Entry');
var bcrypt = require('bcrypt');
var axios = require('axios');
var jwt = require('jsonwebtoken');
var passport = require('passport');
// var passportJWT = require('passport-jwt');

// var ExtractJwt = passportJWT.ExtractJwt;
// var JwtStrategy = passportJWT.Strategy;

// var jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// jwtOptions.secretOrKey = 'FEITAHERD';

exports.user_detail = function(req, res){
	res.send(req.params.id);
};

exports.user_list = function(req, res, next){

	User.find()
		.sort([['displayName', 'ascending']])
		.exec(function (err, list_users) {
			if(err) {return next(err);}
			//res.render('user_list', {title: 'User List', user_list: list_users});
			res.send({user_list: list_users})
		});
};

exports.user_profile = function(req, res, next){

	var userId = req.params.id;

	console.log(userId);

	User.findById(userId)
		.exec(function(err, user){
			if(err){
				return next(err);
			} else if (user){
				return res.send({
					user: {
						username: user.username,
						displayName: user.displayName
					}
				});
			} else{
				var err = new Error('User not found');
				err.status = 401;
				return next(err);
			}
		});
}

exports.user_register = function(req, res, next){

	var username = req.body.username;
	var password = req.body.password;
	var passwordConfirm = req.body.passwordConfirm;
	var displayName = req.body.displayName;

	if(req.body.username && req.body.password && req.body.passwordConfirm && req.body.displayName){
	
		var userData = {
			username: username,
			password: password,
			displayName: displayName
		}

		User.findOne({ username: username })
			.exec(function(err, user){
				if(err){
					return next(err);
				} else if (user){
					var err = new Error('Username already exists');
					err.status = 401;
					return next(err);
				}
				if(password === passwordConfirm){
					User.create(userData, function (err, user) {
					    if (err) {
					     	return next(err);
					    } else {
					    	console.log("User created");
					    	return res.send({
					    		userId: user.id
					    	});
					    }
					});
				} else{
					var err = new Error('Passwords don\'t match');
					err.status = 401;
					return next(err);
				}
			});

	} else{
		var err = new Error('User data missing at least one field');
		err.status = 401;
		return next(err);
	}

};

exports.user_login = function(req, res, next){
	User.findOne({ username: req.session.passport.user })
			.exec(function(err, user){
				if(err){
					return next(err);
				} else if (user){
					//var payload = {id: user.id};
					//var token = jwt.sign(payload, jwtOptions.secretOrKey);
					//res.json({message: "Token received", token: token});
					req.session.passport.id = user.id;
					res.send(req.session.passport);

				} else{
					res.send("User not found");
				}
			});
};

exports.user_logout = function(req, res, next){
	req.logout();
};

exports.user_teams = function(req, res, next){
	Entry.find({user: req.body.userId})
		.sort([['name', 'ascending']])
		.exec(function (err, list_teams) {
			if(err) {return next(err);}
			//res.render('user_list', {title: 'User List', user_list: list_users});
			res.send({user_teams: list_teams})
		});
}

exports.entry_create = function(req, res, next){

	var teams = req.body.chosenTeams;
	var teamName = req.body.teamName;
	var userId = req.body.userId;

	if(teams.length !== 8){
		var err = new Error('Need exactly 8 teams');
		err.status = 401;
		return next(err);
	}

	var salary = 0;
	var teamIds = [];
	for(var i=0; i<teams.length; i++){
		salary += teams[i].price;
		teamIds.push({teamId: teams[i].id});
	}

	if(salary > 100){
		var err = new Error('Price too high');
		err.status = 401;
		return next(err);
	}

	var entryData = {
		user: userId,
		name: teamName,
		teams: teamIds,
		paid: false
	}

	console.log(entryData);

	User.findById(userId)
		.exec(function(err, user){
			if(err){
				return next(err);
			} else if(user){
				Entry.create(entryData, function (err, user) {
				    if (err) {
				     	return next(err);
				    } else {
				    	console.log("Entry created");
				    	return res.send({
				    		message: "Entry created"
				    	});
				    }
				});
			} else{
				var err = new Error('Couldn\'t find user');
				err.status = 401;
				return next(err);
			}
		});



	//res.send(teams: req.body.chosenTeams)
}











