import React from 'react';
import '../App.css';

function Landing() {
  const clientId = "2ce806f300c04b4c9f8115116d8a30c4"
  const redirectUri = encodeURIComponent('http://localhost:3000/callback');
  const scopes = encodeURIComponent("user-library-read")

  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;




  return (
    <div className="App">
      <header className="App-header">
        <img src='spotify_logo.png' className='w-20 h-20'></img>
        <p className='font-bold text-7xl'>
          My<span className='text-[#1ED760]'>Spotify</span>List
        </p>
        <p className='mt-4 font-bold'>Create a social page to rate and share your thoughts with your community!</p>
        <a
          href={authUrl}
          className='mt-8 border-2 border-white p-2 rounded-lg font-bold hover:bg-[#1ED760] hover:text-black duration-150'
        >
          Get Started
        </a>
      </header>
    </div>
  );
}

export default Landing;
