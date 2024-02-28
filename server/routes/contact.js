const express = require("express");
const router = express.Router();

const ContactController = require("../controllers/contactController");
const Contact = require("../models/contactModel");

router.post("/create", ContactController.createContact);
router.put("/update", ContactController.updateContact);
router.get("/allcontacts", ContactController.getAllContacts);
router.get("/contact", ContactController.getContactById);
router.delete("/delete", ContactController.deleteContact);

module.exports = router;
