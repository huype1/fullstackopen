import { useEffect } from 'react'
import '../index.css'
import { useSelector } from 'react-redux'
const Notification = ({ notificationStyle }) => {
  const message = useSelector(state => {
    return state.notification
  })
  if (message === null) {
    return null
  }

  return <div className={notificationStyle}>{message}</div>
}

export default Notification
