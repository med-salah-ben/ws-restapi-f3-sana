const express = require("express");
const router = express.Router();
const controllers = require("../controllers/contactController")

//CRUD
//Method POST 
//Adding new Contact
router.post("/newcontact",controllers.postContact)
//Method GET
router.get("/",controllers.getContacts)
router.get("/:id",controllers.getContactByID)
//Method PUT
router.put("/:id",controllers.updateContact)
//Method DELETE
router.delete("/:id",controllers.deleteContactById)






module.exports = router