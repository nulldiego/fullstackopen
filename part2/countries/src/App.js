import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => (
  <div>
    find countries: <input value={value} onChange={onChange} />
  </div>
)

const Languages = ({ languages }) => (
  languages.map(lang =>
    <li key={lang.name}>{lang.name}</li>
  )
)

const Weather = ({ location }) => {
  const [ weather, setWeather ] = useState('') 

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=dummy&query=${location}`).then(response => {
        setWeather(response.data)
      })
  }, [location])

  const icons = (icons) => icons.map(icon => 
    <img src={icon} alt="" key={icon} />
  )

  return (
    <div>
      <div>temperature: {weather.current?.temperature ? weather.current.temperature : '-'} Celsius</div>
      <div>wind: {weather.current?.wind_speed ? weather.current.temperature : '-'} kph direction {weather.current?.wind_dir ? weather.current.wind_dir : '-'}</div>
      {weather.current?.weather_icons ? icons(weather.current.weather_icons) : ''}
    </div>
  )
}

const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h3>languages</h3>
    <div>
      <ul>
        <Languages languages={country.languages} />
      </ul>
    </div>
    <div>
      <img src={country.flag} alt="flag" width="200px"/>
    </div>
    <h3>Weather in {country.capital}</h3>
    <Weather location={country.capital} />
  </div>
)

const Countries = ({ countries, onShowClick }) => {
  if (countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countries.length === 1) {
    return (
      <CountryInfo country={countries[0]} />
    )
  } else {
    return (
      countries.map(country =>
        <div key={country.name}>
          {country.name} <button type="submit" onClick={onShowClick()} value={country.name}>Show</button>
        </div>
      )
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ searchFilter, setSearchFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all').then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(country => country.name.toUpperCase().includes(searchFilter.toUpperCase()))

  const handleFilterChange = (event) => {
    setSearchFilter(event.target.value)
  }

  return (
    <div>
      <Filter value={searchFilter} onChange={handleFilterChange} />
      <Countries countries={countriesToShow} onShowClick={() => handleFilterChange}/>
    </div>
  )
}

export default App