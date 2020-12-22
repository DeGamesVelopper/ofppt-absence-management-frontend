
import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

//componenets
import Navbar from './components/navbar';
import Filiere from './components/filiere';
import Group from './components/group';

import './App.css';

export default function App() {

  useEffect(() => {
    const token= "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDg2MzQxOTgsImV4cCI6MTYwODcyMDU5OCwiYXVkIjoiNWZjNmE4YzNlYTQxZDUwYjYwNDBjZmI2In0.jRIs4T5gO-gp7SDzB4Xrsh9CT1tVBUzftC-lWeP3_xQ"
  
    localStorage.setItem("token",token)
  }, [])
  return (
     <div className="app" id="app">
       <BrowserRouter>
        <Navbar/>
        <div className="body">
          {/* <Route exact path='/' component={Home}> */}
          <Route exact path='/filieres' component={Filiere} />
          <Route exact path='/groups' component={Group} />
        </div>
      </BrowserRouter>
     </div>
  );
}


