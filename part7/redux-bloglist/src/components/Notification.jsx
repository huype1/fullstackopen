import { useEffect } from 'react'
import '../index.css'
import { useSelector } from 'react-redux'
const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
  })
  if (notification.message === null) {
    return null
  }

  return <div className={notification.style}>{notification.message}</div>
}

export default Notification
