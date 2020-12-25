import React,{useState} from 'react'
import { useSelector , useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { login } from '../../store/actions/authActions';

import Input from '../Controls/CustomInput';

import './login.css';

function Login() {
  
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');


  const isloading = useSelector(state => state.auth.isloading)
  const islogin = useSelector(state => state.auth.islogin)
  const dispatch = useDispatch()

  const tryLogin = () =>{
    dispatch(login(username,pwd))
  }


  return (
   <>
    {
      islogin ? <Redirect to='/Home'/>:
      <div className='login flex_column'>
        <div>
          <h1 className="login__title">Login</h1>
        </div>
        <Input
          className='login__input'
          placeholder ='username'
          value = {username}
          setValue = {setUsername}
        />
        <Input
          className='login__input'
          placeholder ='password'
          value = {pwd}
          setValue = {setPwd}
        />

        <button 
          className="login__btn"
          onClick = {()=>tryLogin()}  
        >
          <span className="login__btntxt">
            Login
          </span>
          {
            isloading ?
            <img 
              className="login__loading"
              src="images/Login_loading.svg" 
              alt="loginSvg" 
            />:null
          }
        </button>
      </div>
    }
  </>

 )
}

export default Login
