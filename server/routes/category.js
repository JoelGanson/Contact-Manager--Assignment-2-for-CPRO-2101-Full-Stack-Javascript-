const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/categoryController");
const Category = require("../models/categoryModel");

router.post("/create", CategoryController.createCategory);
router.put("/update", CategoryController.updateCategory);
router.get("/allCategories", CategoryController.getAllCategories);
router.get("/category", CategoryController.getCategoryById);
router.delete("/delete", CategoryController.deleteCategory);

module.exports = router;
