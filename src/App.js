
import './App.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import NavBar from "./components/Navbar"
import About from "./components/About"
import Home from "./components/Home"
import NoteState from './context/NoteState';

function App() {
  
    return (
        <NoteState>
            <BrowserRouter>
            
                <NavBar/>
                <Routes> 
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/about" element={<About/>} />
                
                </Routes>
            </BrowserRouter>
        </NoteState> 
    )
  
}

export default App
