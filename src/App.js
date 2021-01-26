import { Airport } from './air/pages/Airport'
import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from "redux"
import { Provider } from'react-redux'
import thunk from 'redux-thunk'

const rootReducer = combineReducers({})
export default function App() {
  return (
    <Provider store = { createStore(rootReducer, applyMiddleware(thunk)) }>
      <Airport/>
    </Provider>
  )
}