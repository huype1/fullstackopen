import React, { useState, useEffect } from "react";
import './index.css'
import axios from 'axios'
import Search from "./components/Search";
const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountry] = useState([])
  const handleSearch = (event) => setSearch(event.target.value)
  useEffect(() => {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {

          setCountry(response.data)

        })
  }, [search])
  
  
  let id = 0
  return (
    <>
      <Search country={search} change={handleSearch}/>
      <ul>
      {countries.map(country => <li key={id++}>{country.name.common}</li>)}
      </ul>
    </>
  )
}

export default App
