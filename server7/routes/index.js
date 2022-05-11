const express = require ("express")
const router = express.Router("")
const { Int32 } = require("mongodb")
const { default: mongoose } = require("mongoose")

router.use("/", (req,res) =>{
    res.sendFile(__dirname+"../../client/public/indexdr.html")
})
var patientFormSchema = new mongoose.Schema({
    drugName: String,
    drugDosage: String,
    drugFrequency: String,
    repeatNumber: String,
    repeatsFilled: String

})

var  patientData = mongoose.model("patientData",patientFormSchema) 
router.post("/patient_data", (req,res) =>{
    var patientMeds = new patientData(req.body) 
    patientMeds.save().then(item => {
        res.send("item saved in db")
    })
    .catch(err =>{
        res.status(400).send*("item not saved in db")
    })
})

module.exports = router