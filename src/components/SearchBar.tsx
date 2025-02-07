import { useState } from 'react';
import React, { KeyboardEvent } from "react"
import { useNavigate } from 'react-router-dom';
import '../App.css';


interface Props
{
    href: string;
    className: string;
    placeholder: string;
}

function SearchBar(props: Props)
{
    const navigate = useNavigate();
    const query_link = props.href; 

    const [query, setQueryName] = useState("");

    function search_page() 
    {
        navigate(`/${query_link}?query_name=${query}`)
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>)
    {
        if (event.key === 'Enter') {
            search_page()
            
          }
    }
    

    return <div className={'mt-4 ' + props.className}>

        <input className='p-2 rounded-lg text-xl w-full bg-gray-800' value={query} onChange={(e) => setQueryName(e.target.value)} placeholder={props.placeholder} 
        onKeyDown={handleKeyDown} ></input>


    </div>
}

export default SearchBar