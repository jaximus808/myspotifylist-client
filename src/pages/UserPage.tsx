import React, {ChangeEvent, useEffect, useState} from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import '../App.css';
import SongDisplayProfile from '../components/SongItemProfile';

const API_URL = import.meta.env.VITE_API_URL

type UserProfile = 
{
    image_href: string;
    display_name: string;
}

type Post = 
{
    song_name: string;
    image_href: string;
    album_name: string;
    rating: number; 
    desc: string
}

function isUserProfile(obj: any): obj is UserProfile {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.image_href === "string" &&
      typeof obj.display_name === "string"
    );
  }

  
  // Type guard for a single Post object
  function isPost(obj: any): obj is Post {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.song_name === "string" &&
      typeof obj.image_href === "string" &&
      typeof obj.album_name === "string" &&
      typeof obj.rating === "number" &&
      typeof obj.desc === "string"
    );
  }
  
  // Type guard for an array of Post objects
  function isPostArray(arr: any): arr is Post[] {
    return Array.isArray(arr) && arr.every(isPost);
  }
function UserPage()
{   
    const {uid} = useParams();
    
    const [ratings, setRatings] = useState<Post[]>([])
    
    const [loading, isLoading] = useState(true)
    const [status, setStatus] = useState("Loading...")

    const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        //console.log(uid)
        fetch(`${API_URL}api/user/${uid}`, {
            method:"GET", 
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            if(data.error || !data.user)
            {

                setStatus("This user doesn't exist :(")
            }
            else 
            {
                const user = data.user;
                const ratings = data.ratings;
                if(isUserProfile(user) && isPostArray(ratings))
                {
                    setUserProfile(user)
                    setRatings(ratings.reverse())
                    isLoading(false)
                }
                else 
                {
                    console.log(data)
                    setStatus("Something FUC wrong")
                }
               
                
            }
        })
        .catch(e =>
            {
                console.log(e)
            }
        )
    }, [])
    return  <div className="App">
      <header className="App-header p-4">
        <a href='/home' className='italic text-blue-400 underline text-base'>{"<< Go Back"}</a>
        {
            
        (loading || !userProfile) ? <div>{status}</div> 
            : 
            <div className='p-4 w-full flex justify-center items-center flex-col gap-y-4' >
                <div  className=''>
                    <img className='rounded-md' src={userProfile.image_href}></img>
                </div>
                <div >
                    <h1 className='font-bold text-3xl'>{userProfile.display_name}</h1>
                </div>
                <h1>{userProfile.display_name} Ratings:</h1>
                {
                    ratings.map((rating, i) => 
                    {
                        return <SongDisplayProfile key={i} imageHref={rating.image_href} songName={rating.song_name} albumName={rating.album_name} rating={rating.rating} desc={rating.desc} />
                    })
                } 
            </div>
        }
        </header>
    </div>
}

export default UserPage