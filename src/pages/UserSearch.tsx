
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Welcome from '../components/Welcome';
import SearchBar from '../components/SearchBar';

import '../App.css';
import SongDisplay from '../components/SongItem';



function UserSearch() {

  const navigate = useNavigate();

  const [status, setStatus] = useState<string>("Loading...")

  const [songs, setSongs] = useState<any[]>([])

  const [currentRatings, setCurrentRatings] = useState<any>({})
  useEffect(()=>
  {

    get_music()
    
  }, [navigate, setSongs, location.search])

  const get_music = ()=>
  {
    
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

            //console.log(song)

            const song_name = song.name
            const album_name = song.album.name
            const imageHref = song.album.images[1].url
            const artistName = song.album.artists.map(artist => artist.name).join(", ")
            const datePosted = song.album.release_date
            const songLink = song.external_urls.spotify

            const song_id = song.id

            const rating = currentRatings[song_id] ? currentRatings[song_id].rating : -1
            const desc = currentRatings[song_id] ? currentRatings[song_id].desc : -1
              //console.log(currentRatings[song_id])
              

            return <SongDisplay key={i} song_id={song_id} songName={song_name} albumName={album_name} imageHref={imageHref} artistName={artistName} date_posted={datePosted} songLink={songLink} rating={rating} desc={desc}/>
            })}
          </div> : <div className='mt-2'>{status}</div>
        }
        

        </header>
    </div>
  );
}

export default UserSearch;
