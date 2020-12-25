
import axios from "axios"
import { GET_LOCAL_TOKEN,LOGOUT,LOGIN__PROCCESS, LOGIN__ERROR, LOGIN__SUCCESS } from "./TYPES"


const login = (username,pwd) => async(dispatch) =>{
   
  dispatch({type : LOGIN__PROCCESS})
  try {
    const res = await axios.post('api/admin/login', {username,password:pwd})
   if (!res.data) return  dispatch({type : LOGIN__ERROR})
    dispatch({
      type : LOGIN__SUCCESS,
      token : res.data.token
    })
  //  err.response.data.error Handle it later
  } catch (err) {
    return  dispatch({type : LOGIN__ERROR})
  }
}

const logout = ()=> dispatch =>{
   dispatch({
     type: LOGOUT
   })
}


const getLocalToken = ()=> dispatch =>{
  const token = localStorage.getItem('token')
  if (!token) return dispatch({type:LOGIN__ERROR})
  dispatch({
    type :GET_LOCAL_TOKEN,
    token : token
  })
}

export{
  login,
  logout,
  getLocalToken
}