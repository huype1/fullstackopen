import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    },
  },
})

export const setNotification = (data, second) => {
  return  (dispatch) => {
    dispatch(set(data))
    setTimeout(() => {
      dispatch(clearNotification())
      //because it is in milisecond
    }, second * 1000)
  }
}
export const { set, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
