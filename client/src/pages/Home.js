import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DRUGS, QUERY_ME_BASIC  } from '../utils/queries';
import DrugList from '../components/DrugList';
import Auth from '../utils/auth';
import DrugForm from '../components/DrugForm';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_DRUGS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const drugs = data?.drugs || [];
  console.log(drugs);

  // logged in users -- if logged in the variable will be true 
  const loggedIn = Auth.loggedIn();

  return (
    <main>
    <div className="flex-row justify-space-between">
    {loggedIn && (
      <div className="col-12 mb-3">
        <DrugForm />
      </div>
    )}
    <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <DrugList thoughts={drugs} title="Start adding your medicines!" />
      )}
    </div>
       
    </div>
  </main>
  );
};

export default Home;
