import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../components/Welcome';
import SearchBar from '../components/SearchBar';



import '../App.css';



function Home() {

  const [display_name, setDisplayName] = useState<string | null>(localStorage.getItem("display_name"))

  const navigate = useNavigate();

  useEffect(()=>
  {
    const token = localStorage.getItem("token")

    fetch('http://127.0.0.1:3001/api/auth/get_user/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {

         console.log(data)
         if(data.error)
         {
          localStorage.removeItem("token")

          navigate("/")
         }
         else 
         {
          setDisplayName(data.display_name)
         }
      })
      .catch((err) => 
        {
          console.error('Error exchanging token:', err)
          localStorage.removeItem("token")
          navigate("/")
        }
        );
  }, [navigate])

  return (
    
    <div className="App">
      <header className="App-header">
        <Welcome displayName={display_name}/>
          
        <SearchBar placeholder="search a song..." className="w-54" href={"search_song"}></SearchBar>

        <SearchBar placeholder="search a user..." className="w-54" href={"search_user"}></SearchBar>

        <a
          href={"/ratings"}
          className='mt-8 border-2 border-white p-2 rounded-lg font-bold hover:bg-[#1ED760] hover:text-black duration-150'
        >
          View Your Ratings
        </a>

      </header>
    </div>
  );
}

export default Home;
