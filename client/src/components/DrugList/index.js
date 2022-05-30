import React from 'react';
import { Link } from 'react-router-dom';

const DrugList = ({ drugs, title }) => {
  

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
                {drug.username}
            </Link>{' '}
            drug on {drug.createdAt}
            </p>
            <div className="card-body">
            <Link to={`/drug/${drug._id}`}>
                <p>{drug.drug_name}</p>
                
            </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DrugList;