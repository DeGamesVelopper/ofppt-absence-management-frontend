
import { LOADING, DATA_RECEIVED, FILIERE_ON_DELETION_PROCCESS, FILIERE_ON_ADDING_PROCCESS, FILIERE_ON_UPDATING_PROCCESS} from '../actions/TYPES';

const initalState = {
  filieres : [],
  isloading: false,
  onCRUDAction : false,
}

const reducer = (state = initalState,action) =>{
   switch (action.type) {
      case LOADING:
        return{
          ...state,
          isloading:true
        }

      case DATA_RECEIVED:
        return{
          ...state,
          filieres: action.data,
          isloading:false,
          onCRUDAction:false,
        }
      case FILIERE_ON_DELETION_PROCCESS:
       case FILIERE_ON_UPDATING_PROCCESS:
       case FILIERE_ON_ADDING_PROCCESS:
        return{
          ...state,
          onCRUDAction:true
        }

      default:
        return state
   }
}

export default reducer