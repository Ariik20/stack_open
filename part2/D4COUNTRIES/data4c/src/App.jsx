import { useEffect,useState } from 'react'
import axios from "axios"
import Button from './components/Button'

function App() {
//effects 
const [countries,setCountries]=useState([])
const [weather, setWeather] = useState(null)

const [search,setSearch]=useState("")

const apiKey= import.meta.env.VITE_WEATHER_KEY
// fetch the data using axios 
useEffect(()=>{
  axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
   .then(response=>setCountries(response.data))
}, [])

const filteredResults = countries.filter(country=>country.name["common"].toLowerCase().includes(search.toLowerCase()))
useEffect(()=>{
  if (filteredResults.length === 1 && filteredResults[0].capital) {
      const capital = filteredResults[0].capital[0]
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`)
        .then(response => {
          setWeather(response.data)
        })
    }
}, [filteredResults,apiKey])

const searchHandler =(e)=>{
  setSearch(e.target.value)
}
  return (
    <div>
      Find Countries : <input value={search} onChange={searchHandler}/>
      {filteredResults.length > 10 && <div>To many results, be specific 🔥 </div> }
      {filteredResults.length <=10 && filteredResults.length > 1 && 
      filteredResults.map(country => (
          <div key={country.cca2}>
            {country.name.common} <Button message={"Show"}/>
          </div>
        ))
      }
      {
        filteredResults.length == 1 && (
        <div>{
           filteredResults.map(result=><div key={result.cca2
}>          <h3>{ result.name["common"]}</h3>
            <p>Capital: {result.capital[0]}</p>
            <p> Area: {result.area} </p>
            <h3>Languages</h3>
            <ul> 
              {
            Object.values(filteredResults[0].languages).map(lang=>{
              return <li key={lang}>{lang}</li>
            }) }
            </ul>
            <img src={`${result.flags["png"]}`}/>

            <div> 
              <h3>Weather in {result.capital[0]}</h3>
              <div> 
{weather && (
  <div>
    <p>Temperature: {weather.main.temp} °C</p>
    <p>Wind: {weather.wind.speed} m/s</p>
     <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p>{weather.weather[0].description}</p>
  </div>
)}
              </div>
            </div>
           </div>)
          } </div>)
      }
    </div>
  )
}
export default App
