import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { REMOVE_DRUG } from '../../utils/mutations';

const DrugList = ({ drugs, title }) => {

  const [removeDrug, { error }] = useMutation(REMOVE_DRUG);

  const handleRemoveDrug = async (drugId) => {
    try {
      const { data } = await removeDrug({
        variables: { drugId },
      });
      
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div>
      <h3>{title}</h3>
      {drugs &&
        drugs.map(drug => (
          <div key={drug._id} className="card mb-3">
            <p className="card-header">
            <Link
                to={`/profile/${drug.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
            >
                
            </Link>{' '}
            medicine added on {drug.createdAt}
            </p>
            <div className="card-body">
            <Link to={`/drug/${drug._id}`}>
                <p>{drug.drugText} <span>{drug.dosage}</span> <span>Frequency: {drug.freq}</span> 
                
                </p>
                
            </Link>

            <button className='btn'
                type="submit"
                
                onClick={() => handleRemoveDrug(drug._id)}
              >Delete medicine
              </button>
                
              
            </div>
          </div>
        ))}
    </div>
  );
};

export default DrugList;