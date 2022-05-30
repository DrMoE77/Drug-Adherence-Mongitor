import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DRUG } from '../utils/queries';
import ReactionList from '../components/ReactionList';
import ReactionForm from '../components/ReactionForm';
import Auth from "../utils/auth";

const SingleDrug = props => {
  // to get the single thought query
  const { id: drugId } = useParams();

  const { loading, data } = useQuery(QUERY_DRUG, {
    variables: { id: drugId }
  });

  // thought object
  const drug = data?.drug || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {drug.username}
          </span>{' '}
          drug on {drug.createdAt}
        </p>
        <div className="card-body">
          <p>{drug.drug_name}</p>
          <p>{drug.dosage}</p>
          <p>{drug.freq}</p>
        </div>
      </div>
      {<ReactionList reactions={drug.reactions} />}
      {Auth.loggedIn() && <ReactionForm drugId={drug._id} />}
    </div>
  );
};

export default SingleDrug;
