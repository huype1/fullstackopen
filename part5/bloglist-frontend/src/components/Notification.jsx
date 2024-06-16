import '../index.css'
const Notification = ({ message, problem }) => {
    if (message === null) {
    return null
    }

    return (
        <div className={problem}>
        {message}
        </div>
    )
}

export default Notification;
