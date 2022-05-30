import React from 'react';
import { Link } from 'react-router-dom';

// reactions as a prop 
const ReactionList = ({ reactions }) => {
  return (
    <div className="card mb-3">
    <div className="card-header">
        <span className="text-light">Reasons for not taking medicine</span>
    </div>
    <div className="card-body">
        {reactions &&
        reactions.map(reaction => (
            <p className="pill mb-3" key={reaction._id}>
            {reaction.reactionText} {'// '}
            <Link to={`/profile/${reaction.username}`} style={{ fontWeight: 700 }}>
                {reaction.username} on {reaction.createdAt}
            </Link>
            </p>
        ))}
    </div>
    </div>
  );
};

export default ReactionList;