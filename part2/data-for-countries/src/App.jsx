import React, { useState, useEffect } from "react";
import './index.css'
import axios from 'axios'
import Search from "./components/Search";
import Display from "./components/Display";
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

  const [filteredCountry, setfilteredCountry] = useState([])
  useEffect(() => {
    if (search.trim() === '') {
      setfilteredCountry([]);
    }
    else {
      setfilteredCountry(
        countries.filter(country =>
          country.name.common.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, countries]);
  return (
    <>
      <Search country={search} change={handleSearch}/>
      <Display filteredCountry={filteredCountry} />
    </>
  )
}

export default App
