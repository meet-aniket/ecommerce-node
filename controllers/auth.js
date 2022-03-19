const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");


exports.signUp = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({
      error: errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if(err) {
      console.error(err);
      return res.status(400).json({
        error: `Not able to save user in database because :- ${err}`
      })
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    })
  })
}


exports.signIn = (req, res) => {
  const errors = validationResult(req);
  const {email, password} = req.body;

  if(!errors.isEmpty()) {
    return res.status(404).json({
      error: errors.array()[0].msg
    });
  }

  User.findOne({ email }, (err, user) => {
    if(err || !user) {
      return res.status(400).json({
        error: "User's email does not exist!"
      })
    }

    if (!user.autheticate(password)) {
      return res.status(401).json({
        error: "email or password do not match!"
      })
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET)
    res.cookie("token", token, { expire: new Date() + 9999 })

    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } })
  })
}

exports.signOut = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signed out successfully"
  })
}

// custom middlewares and route protectors

exports.isSignedIn = expressJwt({
  algorithms: ['HS256'],
  secret: process.env.SECRET,
  userProperty: "auth"
})

exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if(!checker) {
    return res.status(403).json({
      error: "access_denied!"
    })
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0) {
    return res.status().json({
      error: "you are not admin, access_denied!"
    })
  }
  next();
}