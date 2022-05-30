import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DRUGS, QUERY_ME_BASIC  } from '../utils/queries';
import DrugList from '../components/DrugList';
import Auth from '../utils/auth';
import DrugForm from '../components/DrugForm';

const Home = () => {
  
  // logged in users -- if logged in the variable will be true 
  const loggedIn = Auth.loggedIn();

  return (
    <main>
    <div className="flex-row justify-space-between">
    <h4 style={{marginTop:50}}>
      Welcome to the Medical Adherence Monitor, where you can create a digital list of your medicines and monitor it regularly.
      
    </h4>

  
       
    </div>
  </main>
  );
};


export default Home;
