const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const style = {
    padding: '10px 20px',
    margin: '10px 0',
    fontSize: '18px',
    border: type === 'error' ? '3px solid red' : '3px solid green',
    backgroundColor: '#f0f0f0',
    color: type === 'error' ? 'red' : 'green'
  }

  return (
    <div style={style} className={type}>
      {message}
    </div>
  )
}

export default Notification