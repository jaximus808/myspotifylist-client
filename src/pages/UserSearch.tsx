
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import SearchBar from '../components/SearchBar';

import '../App.css';
import UserDisplay from '../components/UserItem';


const API_URL = import.meta.env.VITE_API_URL

function UserSearch() {

  const navigate = useNavigate();

  const [status, setStatus] = useState<string>("Loading...")

  const [users, setUsers] = useState<any[]>([])

  useEffect(()=>
  {

    searchUsers()
    
  }, [navigate, setUsers, location.search])

  const searchUsers = ()=>
  {
    const params : URLSearchParams = new URLSearchParams(window.location.search);
    const user_query : string|null = params.get('query_name');


    const code = localStorage.getItem("token")
    if(!user_query){
        console.log("missing user query")
        return
    }
    if(!code)
    {
        navigate("/")
        return 
    }
    fetch(`${API_URL}api/auth/search_user`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'auth':code },
        body: JSON.stringify({ user_query }),
        })
        .then((res) => res.json())
        .then((data) => {

            console.log(data)
            if(data.error)
            {
            //localStorage.removeItem("token")

            }
            else 
            {
                setUsers(data.user_matches)
                if(data.user_matches.length === 0)
                {
                    setStatus("we couldnt find anyone simillar :(")
                }
                console.log(data)
            }
        })
        .catch((err) => 
        {
            console.error('Error exchanging token:', err)
            setStatus("something went wrong :( refresh plz!")
        }
    );
  }

  return (
    
    <div className="App">
      <header className="App-header p-4">
        <h1 className='font-bold text-3xl'>Song Search: <span className='italic'> {new URLSearchParams(window.location.search).get('query_name')}</span></h1>
        <a href='/home' className='italic text-blue-400 underline text-base'>{"<< Go Back"}</a>
        <SearchBar placeholder="search another..." className="w-54" href={"search_user"}/>

          

        {
          (users.length > 0) ?

          <div className='w-7/8 lg:w-[50rem]'>
            {users.map((user, i) => {

            //console.log(song)
                
                const uuid = user.uid
                const display_name = user.display_name
                const imageHref = user.image_href

                return <UserDisplay key={i} uuid={uuid} displayName={display_name} imageHref={imageHref}/>
            })}
          </div> : <div className='mt-2'>{status}</div>
        }
        

        </header>
    </div>
  );
}

export default UserSearch;
