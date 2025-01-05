import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: null, style: null },
  reducers: {
    set(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return { message: null, style: null }
    },
  },
})

export const setNotification = (message, style, second) => {
  return dispatch => {
    dispatch(
      set({
        message,
        style,
      }),
    )
    setTimeout(() => {
      dispatch(clearNotification())
      //because it is in milisecond
    }, second * 1000)
  }
}
export const { set, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
