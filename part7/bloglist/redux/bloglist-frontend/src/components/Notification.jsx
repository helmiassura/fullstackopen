import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
    color: notification.type === 'error' ? 'red' : 'green',
    borderColor: notification.type === 'error' ? 'red' : 'green',
    backgroundColor: notification.type === 'error' ? '#ffe6e6' : '#e6ffe6'
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification