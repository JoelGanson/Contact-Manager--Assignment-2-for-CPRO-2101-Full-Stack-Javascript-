const Contact = require("../models/contactModel");

const createContact = async (req, res) => {
  try {
    const contact = new Contact({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Phone: req.body.Phone,
      Email: req.body.Email,
      CategoryId: req.body.CategoryId,
      Organization: req.body.Organization,
    });

    const contactData = await contact.save();
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(200).send({ success: false, msg: error.message });
  }
};

const updateContact = async (req, res) => {};

module.exports = {
  createContact,
};
