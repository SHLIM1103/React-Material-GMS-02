import './App.css';
/* import { Main } from './tst/pages' */
import { Airport } from './air/pages/index'
import { createStore, applyMiddleware } from 'redux'
import { airportReducer } from './air/pages/Airport'
import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from'react-redux'

const rootReducer = combineReducers({ airportReducer })

export default function App() {
  return (
    <Provider store = { createStore(rootReducer, applyMiddleware(thunk)) }>
      <Airport/>
    </Provider>
  )
}