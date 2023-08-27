import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === '') {
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const userData = await response.json();

      if (userData.message === 'Not Found') {
        setError('User not found');
        setUserData(null);
        return;
      }

      setUserData(userData);
      setError(null);

    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('An error occurred while fetching user data');
      setUserData(null);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Github User Info..</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Enter GitHub Username"
            className="input-field"
            required
          />
          <button type="submit" className="submit-button">Get Info</button>
        </form>
        {error && <p className="error">{error}</p>}
        {userData && (
          <div className="card">
            <img src={userData.avatar_url} alt="User Avatar" className="avatar" />
            <h2 className="username">{userData.login}</h2>
            <p className="name">Name: {userData.name || 'N/A'}</p>
            <p className="repos">Public Repos: {userData.public_repos}</p>
            <p className="gists">Public Gists: {userData.public_gists}</p>
            <p className="created-at">Profile Created At: {new Date(userData.created_at).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

