
import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getLocalToken } from './store/actions/authActions';

//componenets
import Navbar from './components/navbar';
import Filiere from './components/filiere';
import Group from './components/group';
import Home from './components/Home';
import Login from './components/login';

import './App.css';

export default function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLocalToken())
  }, [])
  return (
     <div className="app" id="app">
       <BrowserRouter>
        <Navbar/>
        <div className="body">
          <Route exact path='/login' component={Login} /> 
          <Route exact path='/' component={Home} />
          <Route exact path='/filieres' component={Filiere} />
          <Route exact path='/groups' component={Group} />
        </div>
      </BrowserRouter>
     </div>
  );
}


