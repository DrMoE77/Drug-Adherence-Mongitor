var adh = Number
var dosesTaken = Number
var dosesPrescribed = Number

function adherance(){
  adh = dosesTaken*100/dosesPrescribed
  return adh
}
document.getElementById("adhresult").innerHTML = adherance()+"%"