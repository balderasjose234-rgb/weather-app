import React from 'react';
import './UserBadge.css';

function UserBadge({ user, onLogout }) {
  return (
    <div className="user-badge">
      <div className="user-info">
        <span>{user.name}</span>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserBadge;
