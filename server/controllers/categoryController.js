const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const category = new Category({
      categoryName: req.body.Name,
    });

    const categoryData = await category.save();
    res
      .status(200)
      .send({ success: true, msg: "Category Data", data: categoryData });
  } catch (error) {
    res.status(422).send({ success: false, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    let categoryId = req.body.categoryId;
    const category = {
      categoryName: req.body.Name,
    };

    const categoryData = await Category.findByIdAndUpdate(categoryId, category);
    res
      .status(200)
      .send({ success: true, msg: "category Data", data: categoryData });
  } catch (error) {
    res.status(422).send({ success: false, msg: error.message });
    //console.log(error);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categoryData = await Category.find();
    res
      .status(200)
      .send({ success: true, msg: "category Data", data: categoryData });
  } catch (error) {
    res.status(404).send({ success: false, msge: error.message });
  }
};

const getCategoryById = async (req, res) => {
  try {
    let categoryId = req.query.categoryId;
    //console.log(req.query);
    const categoryData = await Category.findById(categoryId);
    res
      .status(200)
      .send({ success: true, msg: "category Data", data: categoryData });
  } catch (error) {
    res.status(404).send({ success: false, msge: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let categoryId = req.query.categoryId;
    const categoryData = await Category.findByIdAndDelete(categoryId);
    res
      .status(200)
      .send({ success: true, msg: "category Data", data: categoryData });
  } catch (error) {
    res.status(403).send({ success: false, msge: error.message });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategoryById,
  deleteCategory,
};
