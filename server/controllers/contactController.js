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
    res.status(422).send({ success: false, msg: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    let contactId = req.body.contactId;
    const contact = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Phone: req.body.Phone,
      Email: req.body.Email,
      CategoryId: req.body.CategoryId,
      Organization: req.body.Organization,
    };

    const contactData = await Contact.findByIdAndUpdate(contactId, contact);
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(422).send({ success: false, msg: error.message });
    //console.log(error);
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contactData = await Contact.find();
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(404).send({ success: false, msge: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    let contactId = req.body.contactId;
    const contactData = await Contact.findById(contactId);
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(404).send({ success: false, msge: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    let contactId = req.body.contactId;
    const contactData = await Contact.findByIdAndDelete(contactId);
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(404).send({ success: false, msge: error.message });
  }
};

module.exports = {
  createContact,
  updateContact,
  getAllContacts,
  getContactById,
  deleteContact,
};
