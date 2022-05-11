var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var patient_prescribedmeds = {
      patient_name: patient_nm,
      drug_name: medicine, 
      dosage: dose,
      frequency: freq,
      adherence: adh,
      reason: reason_adh
  }
  var patient_otc = {
      patient_name: patient_nm,
    otc_drug_name: otc_medicine, 
    otc_dosage: otc_dose,
    otc_frequency: otc_freq,
    interactions: otc_interactions
}
  dbo.createCollection("prescribed_meds", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  dbo.createCollection("otc_meds", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
  dbo.collection("prescribed_meds").insertMany(object,function(err,res){
    if (err) throw err;
    console.log("Object Added!");
    db.close();
  })
  dbo.collection("otc_meds").insertMany(object,function(err,res){
    if (err) throw err;
    console.log("Object Added!");
    db.close();
  })
});