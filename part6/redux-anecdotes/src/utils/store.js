import anecdoteReducer from '../reducers/anecdoteReducer'
import {setAnecdotes} from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import anecdoteService from '../services/anecdotes'
import notificationReducer from '../reducers/notificationReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer,
  }
})
 
anecdoteService.getAll().then(anecdotes => {
  store.dispatch(setAnecdotes(anecdotes))
})

export default store