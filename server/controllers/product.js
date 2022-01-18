const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash")
const fs = require("fs");

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

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let sortBy = req.query.sortBy ? req.query.sortBy :  "_id";

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if(err) {
        return res.status(400).json({
          error: "no product found in database!"
        })
      }
      res.json(products)
    })
}

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if(err) {
      return res.status(400).json({
        error: "problem with image!"
      })
    }

    let product = req.product;
    product = _.extend(product, fields);

    if(file.photo) {
      if(file.photo.size > 3000000) {
        return res.status(400).json({
          error: "file size is too large!"
        })
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    product.save((err, product) => {
      if(err) {
        return res.status(400).json({
          error: "product updation failed!"
        })
      }
      res.json(product)
    })
  })
}

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if(err){
      return res.status(400).json({
        error: "failed to delete the product!"
      })
    }
    return res.json({
      message: "deletion of product was successful!",
      deletedProduct
    })
  })
}

exports.getPhoto = (req, res, next) => {
  if(req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}

// TODO: complete this function
exports.getAllUniqueCategories = (req, res) => {
  Product.distinct("category", {}, (err, categories) => {
    if(err) {
      return res.status(400).json({
        error: "no category found!"
      })
    }
    res.json(categories);
  })
}

// TODO: complete this function
exports.updateStock = (req, res, next) => {
  let myOperations = req.body.order.products.map( prod => {
    return {
      updateOne: {
        filter: { _id: prod._id },
        update: { $inc: { stock: -prod.count, sold: +prod.count } }
      }
    }
  })
  Product.bulkWrite(myOperations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({
        error: "Bulk operation failed"
      });
    }
    next();
  });
}