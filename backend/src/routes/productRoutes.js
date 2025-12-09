import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";
const router = express.Router();
//Create a Product - POST /products/add
router.post("/add", auth, allowRoles("admin"), createProduct); //protected

//View a Products - GET /products/view-all
router.get("/all", auth, getProducts);

//View all Products - GET /products/view/:id
router.get("/view/:id", auth, getProduct);

//Update a Product - PUT /products/update/:id
router.put("/update/:id", auth, allowRoles("admin"), updateProduct);

//Delete a Product - DELETE /products/delete/:id
router.delete("/delete/:id", auth, allowRoles("admin"), deleteProduct);

export default router;
