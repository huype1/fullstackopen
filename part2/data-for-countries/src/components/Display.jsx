import React, { useState, useEffect } from "react";
import axios from 'axios'
const Display = ({ filteredCountry }) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const [countryId, setCountryId] = useState('')
    const [dataReturned, setData] = useState([])
    const [detail,setDetail] = useState([])
    useEffect(() => {
        setDetail(filteredCountry)
        const showCountry = (country) => {
            setCountryId(country)
            setDetail(filteredCountry.filter(name => name.name.common === country))
        }
        if (filteredCountry.length === 0 && countryId ) {
            setDetail([])
            setData([])
            setCountryId('')
        }
        else if (filteredCountry.length > 10) {
            setData("Too many matches, specify another filter")
        }
        else if (filteredCountry.length <= 10 && filteredCountry.length > 1 && !countryId) {
            setData(detail.map((country, index) => <div key={index}>{country.name.common} <button onClick={() => showCountry(country.name.common)}>show</button></div> ))
        }
        else if (filteredCountry.length === 1 || countryId) {
            
            if (detail) {
                axios
                    .get(`https://api.openweathermap.org/data/2.5/weather?q=${detail[0].capital}&appid=${api_key}&units=metric`)
                    .then(response => {
                        const imgLink = 'https://openweathermap.org/img/wn/'+ response.data.weather[0].icon + '@4x.png'
                        setData(
                            <div>
                                <h2>{detail[0].name.common}</h2>
                                <p>capital {detail[0].capital}</p>
                                <p>area {detail[0].area}</p>
                                <b>languages:</b>
                                <ul>
                                {Object.values(detail[0].languages).map((language, index) => <li key={index}>{language}</li>) }
                                </ul>
                                <img src={detail[0].flags.png} alt={detail[0].name.common}/>
                                <h2>Weather in {detail[0].capital}</h2>
                                <p>temperature {response.data.main.temp} celsius</p>
                                <img src={imgLink}/>
                                <p>wind {response.data.wind.speed} m/s</p>
                            </div>
                            )
                    })
            }
        }
            
    }, [filteredCountry, countryId])

    return (
        <div>
            {dataReturned}
        </div>
    )
}
export default Display