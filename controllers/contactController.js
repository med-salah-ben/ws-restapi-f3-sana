const Contact = require("../model/Contact");

//Adding New Contact 
exports.postContact = async(req,res)=>{
    try {
        //GET NAME & Email from req.body
        const {name,email} = req.body;
        //check if name and email exist in req.body 
        //if not name or email send client error
        if(!name || !email){
            return res.status(400).send({msg:"Please Enter All Fields"})
        }
        //check if email exist in Our Database
        //if exist email send client error
        const user = await Contact.findOne({email:email})
        if(user){
            return res.status(400).send({msg:"Email Already Exists"})
        }
        const newContact = new Contact({...req.body})
        const contact = await newContact.save()
        return res.status(201).send({msg:"Adding Contact Success" , response:contact})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Sorry We Can Not Adding Contact"})
    }
}

//Find Contacts From Model Contact 
exports.getContacts = async(req,res)=>{
    try {
        const contacts = await Contact.find({})
        return res.status(200).send({msg:"Getting Contacts With Success" , response : contacts})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Sorry We Can Not Getting Contacts"})
    }
}

//Find Contact By ID From Model Contact 
exports.getContactByID = async(req,res)=>{
    try {
        //Get ID From req.params.id
        const {id} = req.params
        //try to find Contact with this ID
        const contact = await Contact.findOne({_id:id})
        //If we can not find any contact with this id return msg Not Found
        if(!contact){
            return res.status(400).send({msg:"Contact Not Found"})
        }
        //If We Find Contact with this Id return msg & this contact
        return res.status(200).send({msg:"Getting Contact By ID With Success" , response : contact})
    } catch (error) {
        //if server err
        console.log(error)
        res.status(500).send({msg:"Sorry We Can Not Getting Contact By ID"})
    }
}

//Delete Contact By ID From Model Contact 
exports.deleteContactById = async(req,res)=>{
    try {
        //Get ID From req.params.id
        const {id} = req.params
        //try to find Contact with this ID
        await Contact.deleteOne({_id:id})
        //If We deleted Contact with this Id return msg 
        return res.status(200).send({msg:"Deleted Contact By ID With Success"})
    } catch (error) {
        //if server err
        console.log(error)
        res.status(500).send({msg:"Sorry We Can Not Deleting Contact By ID"})
    }
}

exports.updateContact = async(req,res)=>{
    try {
                //Get ID From req.params.id
        await Contact.updateOne({_id:req.params.id} , {$set:{...req.body}})
        res.status(200).send({msg:"Updated Contact With Success"})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:"Can Not Update Contact"})
    }
}