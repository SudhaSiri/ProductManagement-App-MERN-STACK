import Product from "../models/Product.js";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../validators/productValidator.js";

// CREATE PRODUCT  (POST /products/add)
export const createProduct = async (req, res, next) => {
  try {
    // JOI VALIDATION
    const { error } = productCreateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      error.status = 400;
      throw error;
    }

    // CREATE PRODUCT
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created",
      product: savedProduct,
    });
  } catch (err) {
    next(err);
  }
};

// GET ALL PRODUCTS  (GET /products/all)
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      products,
    });
  } catch (err) {
    next(err);
  }
};

// GET SINGLE PRODUCT (GET /products/view/:id)
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      const error = new Error("Product not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      product,
    });
  } catch (err) {
    next(err);
  }
};

// UPDATE PRODUCT (PUT /products/update/:id)
export const updateProduct = async (req, res, next) => {
  try {
    // OPTIONAL: Validate input before updating
    const { error } = productUpdateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      error.status = 400;
      throw error;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      const error = new Error("Product not found for update");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Product updated",
      product: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

// DELETE PRODUCT (DELETE /products/delete/:id)
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      const error = new Error("Product not found for deletion");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Product deleted",
    });
  } catch (err) {
    next(err);
  }
};
