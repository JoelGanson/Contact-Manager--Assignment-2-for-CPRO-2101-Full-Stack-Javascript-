const Category = require("../models/categoryModel");

// Create a new category and save it. I used postman to create a few categories, but did not consume this in the client app
const createCategory = async (req, res) => {
  try {
    // constructor handled by Mongoose/model
    const category = new Category({
      categoryName: req.body.Name,
    });
    // save the constructor
    const categoryData = await category.save();
    // tell the consumer it was saved
    res
      .status(200)
      .send({ success: true, msg: "Category Data", data: categoryData });
  } catch (error) {
    // forward whatever error took place to the consumer
    res.status(422).send({ success: false, msg: error.message });
  }
};

// update a category, it only has one parameter so this is if it was mispelled
const updateCategory = async (req, res) => {
  try {
    // get the id
    let categoryId = req.body.categoryId;
    // set the name that we're changing
    const category = {
      categoryName: req.body.Name,
    };
    // save the changes
    const categoryData = await Category.findByIdAndUpdate(categoryId, category);
    // let the consumer know it worked
    res
      .status(200)
      .send({ success: true, msg: "category Data", data: categoryData });
  } catch (error) {
    res.status(422).send({ success: false, msg: error.message });
    //console.log(error);
  }
};

// Get all categories. I didn't write anything to consume this.
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

// Get a single category. In fact, this is the only endpoint in categories consumed in the client app!
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

// Delete a category
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
