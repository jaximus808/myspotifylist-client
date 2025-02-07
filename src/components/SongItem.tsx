import React, {ChangeEvent, useState} from 'react';
import '../App.css';

interface Props
{
    imageHref: string;
    songName: string;
    albumName: string, 
    artistName: string; 
    songLink: string;
    date_posted: string;
    song_id: string;

}

function SongDisplay(props:Props)
{

    const [status, setStatus] = useState<string>("")

    const [rating, setRating] = useState<number>(0)

    const [desc, setDesc] = useState<string>("")

    const updateRating = (e: ChangeEvent<HTMLInputElement>) => 
    {
        const new_val = parseInt(e.target.value) ;

        if(isNaN(new_val) || rating > 10 || rating < 10 )
        {
            setDesc("please give a valid rating")
            return;
        }
       
        setRating(new_val)
  
    }

    const updateDesc = (e: ChangeEvent<HTMLTextAreaElement>) => 
    {
        const new_val = e.target.value;

        setDesc(new_val)
    
    }

    const createRating = () => 
    {

        
        fetch("http://127.0.0.1:3001/api/create_rating", {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "id": props.song_id,
                "rating": rating,
                "desc": desc
             }),
        })
    }

    return <div className='p-4 w-full rounded-md border-4 border-gray-500 grid grid-cols-2 mt-4 gap-x-2'>
        <div  className='flex justify-center items-center'>
            <img src={props.imageHref}></img>
        </div>
        <div className='text-left'>
            <h1 className='font-bold text-3xl'>{props.songName}</h1>
            <h1 className='font-bold text-2xl italic text-gray-200'>{props.albumName}</h1>
            <h1 className='font-bold text-xl text-gray-200'>by: {props.artistName}</h1>
            <a href={props.songLink} className='italic text-lg underline text-green-300'>Listen Here</a>
            <br></br>
            <h1 className='text-lg'>Give your rating:</h1> 

            <div className='mt-2'>
                <input type='number' className='w-[50px] bg-gray-200 text-black rounded-lg p-2 text-base' onChange={updateRating}></input><span className='text-base'>{" /10"}</span>
                <p>{status}</p>
            </div>
            <p className='text-base mt-2'>desc:</p>
            <textarea onChange={updateDesc} className='bg-gray-800 rounded-sm mt-2 text-sm w-full'></textarea>
            <button  className="mt-2 text-base bg-[#1DB954] text-black font-bold py-2 px-2 rounded-sm hover:bg-[#1ed760] transition">
                Post Review
            </button>
        </div>
    </div>
}

export default SongDisplay