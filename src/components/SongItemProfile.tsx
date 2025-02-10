import React, {ChangeEvent, useState} from 'react';
import '../App.css';

type Props = 
{
    imageHref: string;
    songName: string;
    albumName: string, 
    rating: number;
    desc: string; 

}

function SongDisplayProfile(props:Props)
{   
    return <div className='p-4 w-full rounded-md border-4 border-gray-500 grid grid-cols-2 mt-4 gap-x-2'>
        <div  className='flex justify-center items-center'>
            <img src={props.imageHref}></img>
        </div>
        <div className='text-left'>
            <h1 className='font-bold text-3xl'>{props.songName}</h1>
            <h1 className='font-bold text-2xl italic text-gray-200'>{props.albumName}</h1>
            <div>
                <div className='italic'>{props.rating}/10</div>
                <div>"{props.desc}"</div>
            </div>

            
        </div>
    </div>
}

export default SongDisplayProfile