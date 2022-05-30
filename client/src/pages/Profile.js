import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import DrugList from '../components/DrugList';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_USER, QUERY_ME} from '../utils/queries';
import Auth from '../utils/auth';
import DrugForm from '../components/DrugForm';

const Profile = () => {
  const { username: userParam } = useParams();

  // logged in users will not have params
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  // redirect to personal profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username.toLowerCase() === `${userParam ? userParam.toLowerCase(): ''}`) {
    return <Redirect to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // going to profile page when user is not logged in 
  if (!user?.username) {
    return (
      <p>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </p>
    );
  }

  return (
    <div>
      

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
        <DrugList drugs={user.drugs} title={`${user.username}'s medicines...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
        
        </div>
      </div>
      <div className="mb-3">{!userParam && <DrugForm />}</div>
    </div>
  );
};

export default Profile;
