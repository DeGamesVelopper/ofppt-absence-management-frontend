import { LOGIN__PROCCESS , LOGIN__SUCCESS, LOGIN__ERROR, UNAUTHORIZED_ERROR, LOGOUT, GET_LOCAL_TOKEN} from "../actions/TYPES";


const initialeState = {
  isloading : false,
  islogin : false,
  token : ''
}

const reducer = (state=initialeState , action) =>{

   switch (action.type) {
     case LOGIN__PROCCESS:
        return{
          ...state,
          isloading: true
        }
      case LOGIN__SUCCESS:
        localStorage.setItem('token',action.token)
        return{
          ...state,
          islogin: true,
          isloading: false,
          token: action.token
        }
      case LOGIN__ERROR:
        localStorage.removeItem('token')
        return{
          ...state,
          islogin: false,
          isloading: false,
          token: ''
        }

      case UNAUTHORIZED_ERROR:
        localStorage.removeItem('token')
        return{
          islogin: false,
          isloading: false,
          token: ''
        }
      case GET_LOCAL_TOKEN:
        return{
          ...state,
          islogin: true,
          token: action.type
        }
      case LOGOUT:
        localStorage.removeItem('token')
        return{
          ...state,
          islogin: false,
          token: ''
        }
     default:
       return state
   }
}

export default reducer