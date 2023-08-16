import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'https://api.github.com/users';

function App() {
  const defaultUsername = 'Manikandansns'; // Set the default username
  const [username, setUsername] = useState(defaultUsername);
  const [profile, setProfile] = useState({
    username: '',
    name: '',
    avatar: '',
    location: '',
    repos: '',
    followers: '',
    following: '',
    homeUrl: '',
    notFound: ''
  });

  const fetchProfile = (username) => {
    let url = `${API}/${username}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProfile({
          username: data.login,
          name: data.name,
          avatar: data.avatar_url,
          location: data.location,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          notFound: data.message
        });
      })
      .catch((error) => console.log('Oops! There Is A Problem'));
  };

  useEffect(() => {
    fetchProfile(username);
  }, [username]);

  const handleForm = (e) => {
    e.preventDefault();
    const newUsername = e.target.username.value;
    setUsername(newUsername);
    e.target.username.value = '';
  };

  return (
    <div>
      <section id="card">
        <SearchProfile fetchProfile={fetchProfile} />
        <Profile data={profile} />
      </section>
      <span className="hesmaili">
        GitHub Card With ReactJs - Created By{' '}
        <a href="https://github.com/Manikandansns" target="_blank" title="Manikandan B ">
        Manikandan B
        </a>
      </span>
    </div>
  );
}

function SearchProfile({ fetchProfile }) {
  const handleForm = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    fetchProfile(username);
    e.target.username.value = '';
  };

  return (
    <div className="search--box">
      <form onSubmit={handleForm}>
        <label>
          <input type="search" name="username" placeholder="Type Username + Enter" />
        </label>
      </form>
    </div>
  );
}

function Profile({ data }) {
  const followers = `${data.homeUrl}/followers`;
  const repositories = `${data.homeUrl}?tab=repositories`;
  const following = `${data.homeUrl}/following`;

  if (data.notFound === 'Not Found') {
    return (
      <div className="notfound">
        <h2>Oops !!!</h2>
        <p>The Component Couldn't Find The You Were Looking For. Try Again</p>
      </div>
    );
  } else {
    return (
      <section className="github--profile">
        <div className="github--profile__info">
          <a href={data.homeUrl} target="_blank" title={data.name || data.username}>
            <img src={data.avatar} alt={data.username} />
          </a>
          <h2>
            <a href={data.homeUrl} title={data.username} target="_blank">
              {data.name || data.username}
            </a>
          </h2>
          <h3>{data.location || 'I Live In My Mind'}</h3>
        </div>
        <div className="github--profile__state">
          <ul>
            <li>
              <a href={followers} target="_blank" title="Number Of Followers">
                <i>{data.followers}</i>
                <span>Followers</span>
              </a>
            </li>
            <li>
              <a href={repositories} target="_blank" title="Number Of Repositoriy">
                <i>{data.repos}</i>
                <span>Repositoriy</span>
              </a>
            </li>
            <li>
              <a href={following} target="_blank" title="Number Of Following">
                <i>{data.following}</i>
                <span>Following</span>
              </a>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}

export default App;
