import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { debounce } from 'throttle-debounce'

/* 리덕스의 개념 */
export const getAirports = data => ({type: "FETCH_AIRPORT", payload: data})

export const airportReducer = ( state = [], action ) => {
    switch( action.type ) {
        case "FETCH_AIRPORT": return action.payload
        default: return state
    }
}

export const airportSearch = () => dispatch => {
    axios.get(`https://raw.githubusercontent.com/mwgg/Airports/master/airports.json`)
    .then(response => {
        dispatch(getAirports(response.data))
    }).catch(error => {throw error})
}

/* 리액트의 개념 */
export default function Airport() {
    const [ airport, setAirport] = useState({})
    const [ airports, setAirports ] = useState({})
    const [ selected, setSelected ] = useState(false)
    const [ resultAvailable, setResult ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const results = useSelector( state => airportReducer )
    const dispatch = useDispatch()

    useEffect(() => {
        if( !results.data ) fetch()
        else
        if( results.data.length > 0 ) changeTitle()
        if( airport.city !== undefined ) changeTitle()
    })

    let fetch = () => dispatch(airportSearch())
    let fetched = () => setLoading(false)
    let changeTitle = () => document.title = `공항 검색결과: ${airport.airport}`
    let searchAirports = debounce(500, input => {
        let data = results.data
        if(input.length < 0) alert (` Error `)
        switch(input.length) {
            case 0: 
                setAirport([])
                setResult(false)
                setSelected(false)
            break
            case 1:
                setAirports(data.filter(
                    e => e.airport.charAt(0).toLowerCase() === input.toLowerCase()
                        || e.city.toLowerCase().includes(input.toLowerCase())
                        || e.icao.toLowerCase().includes(input.toLowerCase())
                ))
                setResult(true)
            break
            default:
                setAirports(data.filter(
                    e => e.airport.toLowerCase().includes(input.toLowerCase())
                        || e.city.toLowerCase().includes(input.toLowerCase())
                        || e.icao.toLowerCase().includes(input.toLowerCase())
                ))
                setResult(true)
            break
        }
    })

    const handleInput = e => searchAirports( e.target.value )
    return (<div style={{ outline: 'none', border: 0 }}>
        <h1>공항 검색</h1>
            <div style={{ outline: 'none', border: 0 }}>
                <div style={{ width: '100%', display: 'block' }}>
                    <input type='text' style={{ width: '50%' }} placeholder='공항이름, 코드번호, 도시명으로 검색 가능' 
                           className='Search' onChange={ e => handleInput(e) }/>
                </div>
            </div>
    </div>)
}