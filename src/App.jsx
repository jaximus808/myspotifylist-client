import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";


import Landing from "./pages/Landing";
import CallBack from './callback'
import Home from "./pages/Home";
import SongSearch from "./pages/SongSearch";
import UserSearch from "./pages/UserSearch";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/callback" element={<CallBack/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/search_song" element={<SongSearch/>}/>
        <Route path="/search_user" element={<UserSearch/>}/>
        <Route path="/user/:uid" element={<UserPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
