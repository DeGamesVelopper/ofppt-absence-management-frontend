
import { LOADING, DATA_RECEIVED, LOGOUT, NEXT_10_ROWS, PREVIOUS_10_ROWS, TEN_ROWS_OF_COLLECTION, DATA_REFRESHED,FIRST_10_ROWS,FILIERE_PROCESSING, FILTER_FILIERE, FILTER_END
}
 from '../actions/TYPES';

const initalState = {
  collection : [],
  filieres : [],
  filteredFilieres : [],
  filtering : false,
  length: 0,
  isloading: false,
  onCRUDAction : false,
  firstIndex : 0,
  lastIndex :10
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
          collection: action.data,
          length: action.data.length,
          isloading:false,
          onCRUDAction:false
        }
      case TEN_ROWS_OF_COLLECTION:
        return{
          ...state,
          filieres: action.data,
        }
      case FILTER_FILIERE:
        return{
          ...state,
          filteredFilieres: action.data,
          filtering : true,
          length : action.length
        }
      case FILTER_END:
      return{
        ...state,
        filtering : false,
        filteredFilieres:[],
        length : action.length
      }
      case DATA_REFRESHED:
        return{
          ...state,
          collection: action.data,
          length: action.data.length,
          isloading:false,
          onCRUDAction:false,
          filtering : false
        }
      case FILIERE_PROCESSING:
        return{
          ...state,
          onCRUDAction:true
        }

      case NEXT_10_ROWS:
        return{
          ...state,
          firstIndex : action.firstIndex + 10,
          lastIndex : action.lastIndex + 10,
        }
      case FIRST_10_ROWS:
        return{
          ...state,
          firstIndex : 0,
          lastIndex : 10,
        }
        case PREVIOUS_10_ROWS:
        return{
          ...state,
          firstIndex : action.firstIndex - 10,
          lastIndex : action.lastIndex - 10,
        }
      case LOGOUT:
        return{
          ...state,
          collection: [],
          filieres: []
        }

      default:
        return state
   }
}

export default reducer