const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutId = null

export const setNotification = (message, type, time = 5) => {
  return async dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      data: { message, type }
    })

    timeoutId = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, time * 1000)
  }
}

export default notificationReducer