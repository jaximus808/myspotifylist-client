
import React from 'react';
import '../App.css';

interface Props
{
    displayName: string | null
}

function Welcome(props:Props)
{
    return <div>
        
        <p className='font-bold text-6xl'>
        Welcome <span className='italic'>{props.displayName}</span>
        </p>
        <p>Search a song to rate, or view a friends rates!</p>
    </div>
}

export default Welcome