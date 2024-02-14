const Search = (props) => {

    return (
        <div>
            <p>find countries <input value={props.country} onChange={props.change}/></p>
        </div>
    )
}
export default Search