const Category = require("../models/category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if(err) {
      return res.status(400).json({
        error: "category not found in database"
      })
    }
    req.category = category;
    next();
  })
}

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if(err || !category) {
      return res.status(400).json({
        error: "not able to save category in database"
      })
    }
    res.json({ category });
  })
}

exports.getCategory = () => {
  return res.json(req.category);
}

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "NO categories found"
      });
    }
    res.json(categories);
  });
};

