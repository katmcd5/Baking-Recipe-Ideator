const User = require('./userModel');
const bcrypt = require('bcryptjs');
// const secret = require('../../client/scripts/secret')

const userController = {};

/**
* getAllUsers - retrieve all users from the database and stores it into res.locals
* before moving on to next middleware.
*/
userController.getAllUsers = (req, res, next) => {
  User.find({}, (err, users) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.users = users;
    return next();
  });
};

/**
* createUser - create and save a new User into the database.
*/
userController.createUser = (req, res, next) => {
  // write code here
  // console.log('req body', req.body)
  const { username, password } = req.body;
  User.create({ username, password })
    .then(user => {
      res.locals.user = [user];
      // console.log('createUser', res.locals.user)
      next();
    })
    .catch(err => {
      next();
    })
  
};

/**
* verifyUser - Obtain username and password from the request body, locate
* the appropriate user in the database, and then authenticate the submitted password
* against the password stored in the database.
*/
userController.verifyUser = (req, res, next) => {
  // write code here
  
  const { username, password } = req.body;
  // console.log('REQUEST BODY OBJ',req.body)
  User.find({ username }, (err, users) => { //password is encrypted so should not be passed in
 
    if (err) return next('Error in verifyUser');
    else if (!users) res.redirect('/signup'); //check if user exists here instead of handler
    //bcrypt check happens here
    else {
      bcrypt.compare(password, users.password)
        .then(result => {
          if (!result) res.redirect('/signup')
          else {
            res.locals.user = users;
            return next();
          }
        })
    }
    
  });

};

module.exports = userController;
