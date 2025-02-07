
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Welcome from '../components/Welcome';
import SearchBar from '../components/SearchBar';

import '../App.css';
import SongDisplay from '../components/SongItem';



function Home() {

  const navigate = useNavigate();

  const [status, setStatus] = useState<string>("Loading...")

  const [songs, setSongs] = useState<any[]>([])
  useEffect(()=>
  {

    get_music()
    
  }, [navigate, setSongs, location.search])

  const get_music = ()=>
  {
    const params : URLSearchParams = new URLSearchParams(window.location.search);
    const song_query : string|null = params.get('query_name');

    const page : string|null = params.get('page');

    const code = localStorage.getItem("token")

    let page_num:number = 0;
    if(!page)
    {
      page_num = 0;  
    }
    else 
    {
      if(!isNaN(parseInt(page)))
        {
          page_num = parseInt(page);
        }
    }
    
    
    if(!song_query){
      console.log("missing song query")
      return
    }
    fetch('http://127.0.0.1:3001/api/auth/request_song', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, song_query, page_num }),
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
          setSongs(data.songs)
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
        <SearchBar placeholder="search another..." className="w-54" href={"search_song"}/>

          

        {
          (songs.length > 0) ?

          <div className='w-7/8 lg:w-[50rem]'>
            {songs.map((song, i) => {

            console.log(song)

            const song_name = song.name
            const album_name = song.album.name
            const imageHref = song.album.images[1].url
            const artistName = song.album.artists.map(artist => artist.name).join(", ")
            const datePosted = song.album.release_date
            const songLink = song.external_urls.spotify


            return <SongDisplay song_id={song.id} songName={song_name} albumName={album_name} imageHref={imageHref} artistName={artistName} date_posted={datePosted} songLink={songLink}/>
            })}
          </div> : <div className='mt-2'>{status}</div>
        }
        

        </header>
    </div>
  );
}

export default Home;
