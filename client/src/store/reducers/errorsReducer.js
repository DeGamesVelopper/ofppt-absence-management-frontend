
import { UNAUTHORIZED_ERROR ,FETCHING_ERROR} from "../actions/TYPES";

const initalState= {
  unauthorized : false
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
        unauthorized : true
      }
  
    default:
      return state
  }
}

export default reducer