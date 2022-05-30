import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_DRUG } from '../../utils/mutations';
import { QUERY_DRUGS, QUERY_ME } from '../../utils/queries';


const DrugForm = () => {
  const [drug_name, setDrugText] = useState('');
  const [dosage, setDosageText] = useState('');
  const [freq, setFreqText] = useState('');
  

    // getting ID from Query_Thoughts so that Apollo Client can update from the cache array for profile/homepage
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
      
          // update me object's cache, appending new thought to the end of the array
          const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
            query: QUERY_ME,
            data: { me: { ...me, drugs: [...me.drugs, addDrug] } }
          });
        }
    });


    const handleFormSubmit = async event => {
        event.preventDefault();
      
        try {
          // add thought to database
          await addDrug({
            variables: { drug_name }
          });
      
          
          // clear form value
          setDrugText('');
          setDosageText('');
          setFreqText('');
          
        } catch (e) {
          console.error(e);
        }
    };

    return (
      <div>
          
        <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
          <textarea
          placeholder="Type the name of the medicine here..."
          value={drug_name}
          className="form-input col-12 col-md-9"
          onChange={(event) => { setDrugText(event.target.value) }}
          ></textarea>
          <input
          placeholder="What is the dosage?"
          value={dosage}
          className="form-input col-12 col-md-9"
          onChange={(event) => { setDosageText(event.target.value) }}
          ></input>
          <input
          placeholder="Frequency of intake (per day)?"
          value={freq}
          className="form-input col-12 col-md-9"
          onChange={(event) => { setFreqText(event.target.value) }}
          ></input>
  
          <button className="btn col-12 col-md-3" type="submit">
            Add Medicine
          </button>
        </form>
      </div>
    );
  };
  
  export default DrugForm;