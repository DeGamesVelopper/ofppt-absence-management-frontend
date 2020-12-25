import axios from 'axios';

import { LOADING, DATA_RECEIVED, FETCHING_ERROR,UNAUTHORIZED_ERROR,
  FILIERE_ON_DELETION_PROCCESS, FILIERE_ADDING_ERROR,FILIERE_ON_ADDING_PROCCESS,FILIERE_ON_UPDATING_PROCCESS,UPDATE_ERROR,DELETE_ERROR} from './TYPES';


//helpers functions
  const FetchData = async(url,dispatch,token)=>{
    const headers = {
      Authorization: token
    }
   return await axios.get(url,{headers})
  .then((res)=> {
     if (res.status!==200) return dispatch({type: FETCHING_ERROR})
     return res.data
   })
   .catch((err)=>{
    //handle UNAUTHORIZED_ERROR
    if (err.response.data.error) {
      return dispatch({type : UNAUTHORIZED_ERROR })
    }
  })
}

// Actions
const getFilieres = () => async(dispatch) =>{
  const token =localStorage.getItem("token")
  dispatch({
    type : LOADING 
  })

  if(!token) return dispatch({type : UNAUTHORIZED_ERROR })

  FetchData('api/admin/filieres',dispatch,token)
  .then(data =>{ 
    if (!data) return dispatch({type: FETCHING_ERROR})
    return dispatch({
      type : DATA_RECEIVED,
      data
    })
  })
  .catch(err => dispatch({type: FETCHING_ERROR}))
}

const addFiliere = (abvname,filiere) => async(dispatch) =>{
  const token =localStorage.getItem("token")

  if(!token) return dispatch({type : UNAUTHORIZED_ERROR })
  //set Authorization header
  const headers = {
    Authorization: token
  }
  const data= {
    abvname,
    name:filiere
  }
  const res = await axios.post('api/admin/addfiliere',{data},{headers})
  //handle error later
  if (!res) return dispatch({type : FILIERE_ADDING_ERROR })

   dispatch({
     type : FILIERE_ON_ADDING_PROCCESS
   })
  //get filieres
  FetchData('api/admin/filieres',dispatch,token)
  .then(data =>
    dispatch({
    type : DATA_RECEIVED,
    data
  }))
}

const editFiliere = ({id,abvname,name}) => async(dispatch) =>{
  const token =localStorage.getItem("token")
  if(!token) return dispatch({type : UNAUTHORIZED_ERROR })

  const headers = {
    Authorization: token
  }
  const data= {
    abvname,
    name
  }
  const res = await axios.put(`api/admin/updatefiliere/${id}`,{data},{headers})
  if (!res) return dispatch({type : UPDATE_ERROR })

  dispatch({
    type : FILIERE_ON_UPDATING_PROCCESS
  })

  //get filieres
  FetchData('api/admin/filieres',dispatch,token)
  .then(data =>
    dispatch({
    type : DATA_RECEIVED,
    data
  }))

}

const deleteFiliere = id => async(dispatch) => {
  const token =localStorage.getItem("token")

  if(!token) return dispatch({type : UNAUTHORIZED_ERROR })
  //delete filiere
  const headers = {
    Authorization: token
  }
  const res = await axios.delete(`api/admin/deletefiliere/${id}`,{headers})
  //handle error later
  if (!res) return dispatch({type : DELETE_ERROR })

   dispatch({
     type : FILIERE_ON_DELETION_PROCCESS
   })
  //get filieres
    FetchData('api/admin/filieres',dispatch,token)
    .then(data =>
      dispatch({
      type : DATA_RECEIVED,
      data
    }))
}


export {
  getFilieres,
  editFiliere,
  deleteFiliere,
  addFiliere
}