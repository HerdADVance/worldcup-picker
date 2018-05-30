const express = require("express");
const router = express.Router();
const passport = require('passport');
var User = require('./../models/User');

var user_controller = require('../controllers/userController');

router.get('/', (req, res) => {
	//res.send({ response: "I am alive" }).status(200);
})

router.get('/abc', (req, res) => {
	res.send({ response: "I am aliveee" }).status(200);
})

router.get('/api/users', user_controller.user_list);

router.get('/api/user/:id', user_controller.user_profile);

router.post('/api/users/new', user_controller.user_register);

router.post('/api/users/login', passport.authenticate('local', {
	successRedirect: '/success',
	failureRedirect: '/fail'
}));

router.post('/api/users/register', (request, response) => {
    // Creates and saves a new user with a salt and hashed password
    if(request.body.password == request.body.passwordConfirm){
	    User.register(new User({username: request.body.username, displayName: request.body.displayName}), request.body.password, function(err, user) {
	        if (err) {
	            console.log(err);
	            return response.send(err._message);
	        } else {
	            passport.authenticate('local')(request, response, function() {
	                response.send("User created");
	            });
	        }
	    });
	} else{
		var err = new Error('Passwords don\'t match');
		err.status = 401;
		return next(err);
	}
});

// router.get('/users', function(req, res, next) {
//  	connection.query('SELECT * from users', function (error, results, fields) {
// 		if (error) throw error;
// 		res.send(JSON.stringify(results));
// 	});
// });

module.exports = router;