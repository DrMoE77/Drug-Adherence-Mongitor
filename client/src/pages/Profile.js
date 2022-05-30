import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import DrugList from '../components/DrugList';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import DrugForm from '../components/DrugForm';

const Profile = () => {
  const { username: userParam } = useParams();

  const {data } = useQuery(userParam ? QUERY_USER:QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username.toLowerCase() === `${userParam ? userParam.toLowerCase(): ''}`) {
    return <Redirect to="/profile" />;
  }


  return (
    <div>
     
      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
        <DrugList drugs={user.drugs} title={`Your medicines...`} />
      </div>

     

      </div>
      <div className="mb-3">{!userParam && <DrugForm />}</div>
    </div>
  );
};

export default Profile;
