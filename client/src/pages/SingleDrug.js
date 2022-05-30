import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DRUG } from '../utils/queries';
import DrugForm from '../components/DrugForm';
import Auth from "../utils/auth";

const SingleDrug = props => {
  // to get the single drug query
  const { id: drugId } = useParams();

  const { loading, data } = useQuery(QUERY_DRUG, {
    variables: { id: drugId }
  });

  // drug object
  const drug = data?.drug || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {drug.drugText}
          </span>{' '}
          medicine added on {drug.createdAt}
        </p>
        <div className="card-body">
          <p>{drug.drugText}</p>
          <p>{drug.dosage}</p>
          <p>{drug.freq}</p>
        </div>
      </div>
      {Auth.loggedIn() && <DrugForm drugId={drug._id} />}
    </div>
  );
};

export default SingleDrug;
