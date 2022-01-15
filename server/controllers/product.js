const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).populate("Category").exec((err, product) => {
    if(err || !product) {
      return res.status(400).json({
        error: "Product not found in database."
      })
    }
    req.product = product;
    next();
  })
}

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
}

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if(err) {
      return res.status(400).json({
        error: "problem with the image!"
      })
    }

    const { name, description, price, category, stock  } = fields;

    if(!name || !description || !price || !category || !stock) {
      return res.status(400).json({
        error: "all fields are necessary!"
      })
    }

    let product = new Product(fields);

    if(file.photo) {
      if(file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size is too big!"
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    product.save((err, product) => {
      if(err) {
        res.status(400).json({
          error: "saving product image is failed!"
        })
      }
      res.json(product)
    })
  })
}