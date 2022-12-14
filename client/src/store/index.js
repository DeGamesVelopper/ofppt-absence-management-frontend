
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './reducers';
const sotre = createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))

export default sotre