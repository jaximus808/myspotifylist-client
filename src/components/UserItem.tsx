import React, {ChangeEvent, useState} from 'react';

import { useNavigate } from 'react-router-dom';
import '../App.css';

type Props = 
{
    imageHref: string;
    uuid: string; 
    displayName: string
}

function UserDisplay(props:Props)
{   
    const navigate = useNavigate()

    return <div className='p-4 w-full rounded-md border-4 border-gray-500 grid grid-cols-2 mt-4 gap-x-2 hover:bg-gray-900 hover:cursor-pointer'  onClick={()=>{navigate(`/user/${props.uuid}`)}}>
        <div  className='flex justify-center items-center'>
            <img src={props.imageHref}></img>
        </div>
        <div className='text-left'>
            <h1 className='font-bold text-3xl'>{props.displayName}</h1>
            
        </div>
    </div>
}

export default UserDisplay