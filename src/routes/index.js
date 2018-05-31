const express = require("express");
const router = express.Router();
const passport = require('passport');
var User = require('./../models/User');

var user_controller = require('../controllers/userController');

router.get('/', (req, res) => {
	//res.send({ response: "I am alive" }).status(200);
	console.log(req.session);
	res.send(req.session);
})

router.get('/abc', (req, res) => {
	res.send({ response: "I am aliveee" }).status(200);
})

router.get('/api/users', user_controller.user_list);

router.get('/api/user/:id', user_controller.user_profile);

router.post('/api/users/new', user_controller.user_register);

router.post('/api/users/login', passport.authenticate('local', {
	successRedirect: '',
	failureRedirect: ''
}), user_controller.user_login);

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

router.get('/api/users/logout', user_controller.user_logout);

// router.get("/api/users/secret", passport.authenticate('jwt', { session: false }), function(req, res){
//   res.json({message: "Success! You can not see this without a token"});
// });

module.exports = router;