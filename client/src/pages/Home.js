import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DRUGS} from '../utils/queries';

import Auth from '../utils/auth';


const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_DRUGS);

  
  const drugs = data?.drugs || [];
  console.log(drugs);

  // logged in users -- if logged in the variable will be true 
  const loggedIn = Auth.loggedIn();

  return (
    <main>
    <div className="flex-row justify-space-between">
    <p>
      Welcome to the Drug Adherence Monitor, where you can create a digital list of your medicines and monitor it regularly.
      
    </p>
       
    </div>
  </main>
  );
};

export default Home;
