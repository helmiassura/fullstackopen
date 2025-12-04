import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setMessage(state, action) { return action.payload },
    clearMessage() { return '' }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions

let timeoutId = null
export const setNotification = (message, seconds = 5) => {
  return dispatch => {
    dispatch(setMessage(message))
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(clearMessage())
      timeoutId = null
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
