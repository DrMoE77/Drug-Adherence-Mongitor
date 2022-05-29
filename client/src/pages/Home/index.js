import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_THOUGHTS, QUERY_ME_BASIC  } from '../utils/queries';
import Authentication from '../utils/authentication';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_DRUGS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  const drugs = data?.drugs || [];
  console.log(drugs);

  // logged in users -- if logged in the variable will be true 
  const loggedIn = Authentication.loggedIn();

  return (
    <main>
    <div className="flex-row justify-space-between">
    <h2>
        Welcome to the Drug Adherence Monitor!
    </h2>
    <p>
        Lorem Ipsum!
    </p>
    
    </div>
  </main>
  );
};

export default Home;
