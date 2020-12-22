import axios from 'axios';

import { LOADING, DATA_RECEIVED, FETCHING_ERROR,UNAUTHORIZED_ERROR,
  FILIERE_ON_DELETION_PROCCESS, FILIERE_ADDING_ERROR,FILIERE_ON_ADDING_PROCCESS} from './TYPES';

const token =localStorage.getItem("token")



const getFilieres = () => async(dispatch) =>{
  console.log('start fetching')

  dispatch({
    type : LOADING 
  })

  if(!token) return dispatch({type : UNAUTHORIZED_ERROR })

   console.log('token is good : ',token)

  FetchData('api/admin/filieres',dispatch,token)
  .then(data =>
   { 
      if (!data) {
        console.log('data is not good :', data)
        return
      }
      console.log('data is good :', data)
      console.log('fetching finished')
       return dispatch({
          type : DATA_RECEIVED,
          data
        })
   }
  )
  .catch((err)=> console.log('FetchData: ',err))
}

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
      console.log(err.response.data.error)
       dispatch({type : UNAUTHORIZED_ERROR })
    }
  })
}

const editFiliere = id =>{

}

const deleteFiliere = id => async(dispatch) => {
  if(!token) return dispatch({type : UNAUTHORIZED_ERROR })
  //delete filiere
  const headers = {
    Authorization: token
  }
  const res = await axios.delete(`api/admin/deletefiliere/${id}`,{headers})
  //handle error later
  if (!res) return dispatch({type : FETCHING_ERROR })

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

const addFiliere = (abvname,filiere) => async(dispatch) =>{
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

export {
  getFilieres,
  editFiliere,
  deleteFiliere,
  addFiliere
}