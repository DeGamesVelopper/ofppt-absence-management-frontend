
import { LOADING, DATA_RECEIVED, FILIERE_ON_DELETION_PROCCESS, FILIERE_ON_ADDING_PROCCESS} from '../actions/TYPES';

const initalState = {
  filieres : [],
  isloading: false,
  onDeletion : false,
  onAdding : false,
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
          onDeletion:false,
          onAdding:false,
        }
      case FILIERE_ON_DELETION_PROCCESS:
        return{
          ...state,
          onDeletion:true
        }
      case FILIERE_ON_ADDING_PROCCESS:
        return{
          ...state,
          onAdding:true
        }
  

      default:
        return state
   }
}

export default reducer