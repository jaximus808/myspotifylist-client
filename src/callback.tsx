import { useEffect,  useRef} from 'react';
import { useNavigate } from 'react-router';
import React from 'react';
function Callback() {
  const navigate = useNavigate();

  const hasFetched = useRef(false); 
  useEffect(() => {
    if(hasFetched.current) return;  
    hasFetched.current = true; 
    const params : URLSearchParams = new URLSearchParams(window.location.search);
    const code : string|null = params.get('code');
    const error : string|null = params.get('error');


    if (code) {
      fetch('http://127.0.0.1:3001/api/auth/spotify/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        mode: "cors"
      })
        .then((res) => res.json())
        .then((data) => {
            if(data.error)
            {
              console.log(data)
              console.error('Spotify Auth Error!');

              localStorage.setItem("token", data.token);
              navigate('/', { replace: true }); // Redirect to error page if needed
              return 
            }
            console.log(data)
            localStorage.setItem("token", data.token);
            localStorage.setItem("display_name", data.display_name);
            console.log('Access Token:', data.token);
           navigate('/home', { replace: true });
        })
        .catch((err) => console.error('Error exchanging token:', err));
    } else if (error) {
      console.error('Spotify Auth Error:', error);
      navigate('/', { replace: true }); // Redirect to error page if needed
    }
  }, [navigate]);

  return <div>Processing Spotify Authentication...</div>;
}

export default Callback;
