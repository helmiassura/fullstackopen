import React, { createContext, useContext, useReducer, useRef } from 'react'

const StateCtx = createContext()
const DispatchCtx = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'SET': return { message: action.payload }
    case 'CLEAR': return { message: '' }
    default: throw new Error('Unknown action')
  }
}

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { message: '' })
  const timeoutRef = useRef(null)

  const showNotification = (msg, seconds = 5) => {
    dispatch({ type: 'SET', payload: msg })
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
      timeoutRef.current = null
    }, seconds * 1000)
  }

  return (
    <StateCtx.Provider value={state}>
      <DispatchCtx.Provider value={{ dispatch, showNotification }}>
        {children}
      </DispatchCtx.Provider>
    </StateCtx.Provider>
  )
}

export const useNotification = () => {
  const ctx = useContext(DispatchCtx)
  if (!ctx) throw new Error('useNotification must be used inside NotificationProvider')
  return ctx
}

export const useNotificationState = () => {
  const ctx = useContext(StateCtx)
  if (!ctx) throw new Error('useNotificationState must be used inside NotificationProvider')
  return ctx
}
