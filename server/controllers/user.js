const User = require("../models/user");

exports.getUserById = (req, res, next, id) =>{
  try{
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "user not found in database"
        })
      }
      req.profile = user;
      next();
    })
  }
  catch(error) {
    return res.status(400).json({
      "error": error
    })
  }
}

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
}