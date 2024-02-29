const Contact = require("../models/contactModel");

// Create and save a new contact
const createContact = async (req, res) => {
  try {
    // create a new contact object from the model
    const contact = new Contact({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Phone: req.body.Phone,
      Email: req.body.Email,
      CategoryId: req.body.CategoryId,
      Organization: req.body.Organization,
    });
    // save the contact object
    const contactData = await contact.save();
    // let the consumer know it worked
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    // let the consumer know if failed and why
    res.status(422).send({ success: false, msg: error.message });
  }
};

// update a contact, adding the id into the request body
const updateContact = async (req, res) => {
  try {
    // get the id seperately from the other parameters in the body
    let contactId = req.body.contactId;
    // a generic object holding the updated fields.
    // We don't use an object from the model because it includes an immutable _id
    const contact = {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Phone: req.body.Phone,
      Email: req.body.Email,
      CategoryId: req.body.CategoryId,
      Organization: req.body.Organization,
    };
    // save the updated fields.
    const contactData = await Contact.findByIdAndUpdate(contactId, contact);
    // let the consumer know it saved
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(422).send({ success: false, msg: error.message });
    //console.log(error);
  }
};

// get a list of every contact
const getAllContacts = async (req, res) => {
  try {
    // this just grabs all the contacts from the model
    const contactData = await Contact.find();
    // let the consumer know it worked
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(404).send({ success: false, msge: error.message });
  }
};

// get a single contact
const getContactById = async (req, res) => {
  try {
    // the id of the contact, in the parameters of the request, i.e. http://localhost:3020/contact?contactId=65de7b166729ff7d5a329fb3
    let contactId = req.query.contactId;
    //console.log(contactId);
    // fetch the contact from the model
    const contactData = await Contact.findById(contactId);
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(404).send({ success: false, msge: error.message });
  }
};

// delete a single contact
const deleteContact = async (req, res) => {
  try {
    // get the id from the parameters after the ? in the url
    let contactId = req.query.contactId;
    // do the deletion
    const contactData = await Contact.findByIdAndDelete(contactId);
    res
      .status(200)
      .send({ success: true, msg: "Contact Data", data: contactData });
  } catch (error) {
    res.status(403).send({ success: false, msge: error.message });
  }
};

module.exports = {
  createContact,
  updateContact,
  getAllContacts,
  getContactById,
  deleteContact,
};
