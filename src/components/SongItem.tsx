import React, {ChangeEvent, useState} from 'react';
import '../App.css';

const API_URL = import.meta.env.VITE_API_URL
type Props = 
{
    imageHref: string;
    songName: string;
    albumName: string, 
    artistName: string; 
    songLink: string;
    date_posted: string;
    song_id: string;

    rating?: number;
    desc?: string; 

}

function SongDisplay(props:Props)
{   

    const [status, setStatus] = useState<string>("")

    const [rated, setRated] = useState<boolean>(!props.rating || props.rating == -1 ? false : true )

    const [rating, setRating] = useState<number|string>(!props.rating || props.rating == -1 ? "" : props.rating )

    const [desc, setDesc] = useState<string>(!props.desc || !props.rating || props.rating == -1 ? "" : props.desc  )


    const updateRating = (e: ChangeEvent<HTMLInputElement>) => 
    {
        const new_val = parseInt(e.target.value) ;
        console.log(isNaN(new_val))
        if(isNaN(new_val) || new_val > 10 || new_val < 0 )
        {
            if(e.target.value.length > 0 ) 
            {
                setStatus("please give a valid rating")
            }
            
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

        const code = localStorage.getItem("token")

        if(!code)
        {
            console.log("no code found")
            return; 
        }

        
        fetch(`${API_URL}api/auth/create_rating`, {
            method:"POST",
            headers: { 'Content-Type': 'application/json', "auth": code },
            body: JSON.stringify({
                "song_id": props.song_id,
                "rating": rating,
                "desc": desc,
                "song_name": props.songName,
                "album_name": props.albumName,
                "artist_name": props.artistName,
                "image_href": props.imageHref
             }),
        }).then(res => res.json())
        .then((data) => {
            console.log(data)
            if(data.error)
            {
                console.log("FAILED")
                console.log(data)
                setStatus(data.msg)
            }
            else
            {
                console.log("ELSSS")
                setDesc(desc)
                setRating(rating)
                setRated(true)
                setStatus("review made!")
            }
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
            <div>
                <h1 className='text-lg'>
                    {(rated) ?  "Your rating:":  "Give your rating:"}
                </h1> 

                <p className='text-base text-red-500'>{status}</p>
                <div className='mt-2'>
                    <input type='number' className='w-[50px] bg-gray-200 text-black rounded-lg p-2 text-base' value={rating} onChange={updateRating}></input><span className='text-base'>{" /10"}</span>
                </div>
                <p className='text-base mt-2'>desc:</p>
                <textarea onChange={updateDesc} value={desc} className='bg-gray-800 rounded-sm mt-2 text-sm w-full'></textarea>
                <button onClick={createRating}  className="mt-2 text-base bg-[#1DB954] text-black font-bold py-2 px-2 rounded-sm hover:bg-[#1ed760] transition">
                    {(rated) ? "Update Review" : "Post Review:" }
                </button>
            </div>

            
        </div>
    </div>
}

export default SongDisplay