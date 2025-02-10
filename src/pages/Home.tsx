import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Welcome from '../components/Welcome';
import SearchBar from '../components/SearchBar';



const API_URL = import.meta.env.VITE_API_URL
import '../App.css';



function Home() {

  const [display_name, setDisplayName] = useState<string | null>(localStorage.getItem("display_name"))

  const [uid, setUid] = useState<string>("")
  const navigate = useNavigate();

  const Logout = () =>
  {
    localStorage.clear()
    navigate("/")
  }

  useEffect(()=>
  {
    const token = localStorage.getItem("token")
    

    if(!token) 
    {
      navigate("/")
      return; 
    }
    console.log(API_URL)
    fetch(`${API_URL}api/auth/get_user/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'auth': token }
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
          setUid(data.uid)
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
          href={`/user/${uid}`}
          className='mt-8 border-2 border-white p-2 rounded-lg font-bold hover:bg-[#1ED760] hover:text-black duration-150'
        >
          View Your Ratings
        </a>
        <button
          onClick={Logout}
          className='mt-4 border-2 border-white p-2 rounded-lg font-bold hover:bg-[#1ED760] hover:text-black duration-150'
        >
          Log Out
        </button>

      </header>
    </div>
  );
}

export default Home;
