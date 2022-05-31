import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_DRUG } from '../../utils/mutations';
import { QUERY_DRUGS, QUERY_USER} from '../../utils/queries';


const DrugForm = () => {

  var ansYes = 0
  var adh = 0
  const freqInput = ""

  const [drugText, setDrugText] = useState('');
  const [dosage, setDosageText] = useState('');
  const [freq, setFreqText] = useState('');

    // getting ID from Query_drugs so that Apollo Client can update from the cache array for profile/homepage
    const [addDrug, { error }] = useMutation(ADD_DRUG, {
        update(cache, { data: { addDrug } }) {
          try {
            // could potentially not exist yet, so wrap in a try...catch
            const { drugs } = cache.readQuery({ query: QUERY_DRUGS });
            cache.writeQuery({
              query: QUERY_DRUGS,
              data: { drugs: [addDrug, ...drugs] }
            });
          } catch (e) {
            console.error(e);
          }
      
          // update me object's cache, appending new drug to the end of the array
          const { me } = cache.readQuery({ query: QUERY_USER });
          cache.writeQuery({
            query: QUERY_USER,
            data: { me: { ...me, drugs: [...me.drugs, addDrug] } }
          });
        }
    });



    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add drug to database
          await addDrug({
            variables: { drugText, dosage, freq }
          });
      
          // clear form value
          setDrugText('');
          setDosageText('');
          setFreqText('');
          
        } catch (e) {
          console.error(e);
        }
    };

    function yes_button(){
      document.getElementById("intakeYes").style.display = "none"
      document.getElementById("intakeNo").style.display = "none"
      document.getElementById("ask").innerHTML = "Good job! Keep it up!"
      
      
    }

    function no_button(){
      document.getElementById("intakeYes").style.display = "none"
      document.getElementById("intakeNo").style.display = "none"
      document.getElementById("ask").innerHTML = "Make sure you don't miss any medicine!"
    }

  return (
    <div>
        
      <form className="justify-center justify-space-between-md ]" onSubmit={handleFormSubmit}>
        <p style={{marginTop:50}}>
          Add More Medicines:
        </p>
        <input
        placeholder="Medicine name..."
        value={drugText}
        className="form-input col-12 col-md-9"
        onChange={(event) => { setDrugText(event.target.value) }}
        ></input>
        <input
        placeholder="Dosage..."
        value={dosage}
        className="form-input col-12 col-md-9"
        onChange={(event) => { setDosageText(event.target.value) }}
        ></input>
        <input
        placeholder="Frequency per day..."
        value={freq}
        className="form-input col-12 col-md-9"
        onChange={(event) => { setFreqText(event.target.value) }}
        ></input>

        <button className="btn" type="submit">
          Add Medicine!
        </button>

      </form>
    </div>
  );
};


export default DrugForm;