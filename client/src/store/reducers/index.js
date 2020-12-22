
import { combineReducers } from 'redux';

import filiereReducer from './filiereReducer';
import errorsReducer from './errorsReducer';

const reducer = combineReducers({
   flrStore : filiereReducer,
   errorsStore: errorsReducer
})

export default reducer