const PersonForm = (props) => {
    
    return (
        <div>
            <form onSubmit={props.addPeople}>
                <div>
                name:
                <input value={props.name} onChange={props.handleName}/>
                </div>
                <div>
                number:
                <input value={props.number} onChange={props.handleNumber}/>
                </div>
                
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}
export default PersonForm