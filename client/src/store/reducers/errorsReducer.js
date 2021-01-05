
import { UNAUTHORIZED_ERROR ,FETCHING_ERROR} from "../actions/TYPES";

const initalState= {
  unauthorized : false,
  fetching_error : false
}

const reducer = (state = initalState, action) =>{
  switch (action.type) {
    case UNAUTHORIZED_ERROR:
      return{
        ...state,
        unauthorized : true
      }
    case FETCHING_ERROR:
      return{
        ...state,
        fetching_error : true
      }
  
    default:
      return state
  }
}

export default reducer