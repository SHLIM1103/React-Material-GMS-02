import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { debounce } from 'throttle-debounce'

/* 리덕스 개념 */
export const setFlux = data => ({ type: "FETCH_AIRPORT", payload: data })
export const airportReducer = ( state=[], action ) => {
    switch( action.type ) {
        case "FETCH_AIRPORT": return action.payload
        default: return state
    }
}

/* 리액트 개념 */
export default function Airport() {
    const [ airport, setAirport] = useState({})
    const [ airports, setAirports ] = useState({})
    const [ selected, setSelected ] = useState(false)
    const [ resultAvailable, setResult ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ search, setSearch] = useState('')
    const handleInput = e => {
        e.preventDefault()
        setSearch(e.target.value.trim().toLowerCase())
    }
    const mySearch = e => {
        e.preventDefault()
        alert(`검색한 공항: ${search}`)
        searchAirports(search)
    }
    const selectAirport = payload => {
        setSelected(true)
        setResult(false)
        setAirport({airport: payload.name, city: payload.city, icao: payload.icao})
    }
    const dispatch = useDispatch()
    const getFlux = useSelector(state => state.airportReducer)
    useEffect(() => {
        if( !getFlux ) {
            axios.get(`https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json`)
            .then( response => {
                alert(`seartchAirport가 작동함. 응답한 값: ${response.data.length}`)
                dispatch( setFlux(response.data) )
                alert(`dispatch가 작동함. 응답한 값: ${getFlux.length}`)
            } ).catch(error => { throw error } )
        }else {
            if( getFlux.length > 0 ) changeTitle()
            if( airport.city !== undefined ) changeTitle()
        }
    }, [])

    let changeTitle = () => document.title = `공항 검색결과: ${airport.name}`
    let searchAirports = debounce(500, input => {
        alert(`seartchAirport가 작동함. 검색한 값: ${input}`)
        if(input.length < 0) alert(` Error `)
        switch(input.length) {
            case 0: 
                setAirport([])
                setResult(false)
                setSelected(false)
            break
            case 1:
                setAirports(getFlux.filter(
                    e => e.airport.charAt(0).toLowerCase() === input.toLowerCase()
                        || e.city.toLowerCase().includes(input.toLowerCase())
                        || e.icao.toLowerCase().includes(input.toLowerCase())
                ))
                setResult(true)
            break
            default:
                setAirports(getFlux.filter(
                    e => e.airport.toLowerCase().includes(input.toLowerCase())
                        || e.city.toLowerCase().includes(input.toLowerCase())
                        || e.icao.toLowerCase().includes(input.toLowerCase())
                ))
                setResult(true)
            break
        }
    })

    return (<>
        <div class='title'>공항 검색</div>
        <div style={{ outline: 'none', border: 0 }}>
            { loading === false &&
            <div style={{ outline: 'none', border: 0 }}>
                <div style={{ width: '100%', display: 'block' }}>
                    <input type='text' style={{ width: '50%' }} 
                        placeholder='공항이름, 코드번호, 도시명으로 검색 가능' 
                        className='Search' onChange={ e => handleInput(e) }/>
                        <button onClick = { e => mySearch(e) }>검 색</button>
                </div>
                <div className='Gap'/>
                <h5 style={{ marginTop: 10, marginBottom: 10, fontSize: 15, 
                    color: '#f0ad4e', textAlign: 'center' }}>
                        { resultAvailable === true && '검색 결과' }
                        { selected === true && '조회된 공항 목록' }
                </h5>
                
                { selected === true &&
                    <div className='Results'>
                        <div style={{ marginTop: 0, padding: 10}} onClick={() => selected(true)}>
                        <div style={{ width: '100%', display: 'block' }}>
                            <span style={{ fontWeight: 'bold' }}>{airport.city}</span>
                            <span style={{ float: 'right' }}>{airport.icao}</span>
                        </div>
                        <p style={{ marginTop: 5, marginBottom: 0, paddingBottom: 5, color: '#777',
                            borderBottom: '0.5px solid #9997' }}>{airport.name}</p>
                    </div>
                </div>
                }
                { selected === false && resultAvailable === true
                    && airports.map((item, i) => (
                            <div className='Results' key={ i }>
                                <div style={{ marginTop: 0, padding: 10 }} id="Select" 
                                     onClick={ () => { selectAirport(item) } }>
                                    <div style={{ width: '100%', display: 'block'}}>
                                        <span style={{ fontWeight: 'bold' }}>{ airport.city }</span>
                                        <span style={{ float: 'right'}}>{ airport.icao }</span>
                                    </div>
                                    <p style={{ marginTop: 5, marginBottom: 0, paddingBottom: 5, color: '#777',
                                                borderBottom: '0.5px solid #9997' }}>{ airport.name }</p>
                                </div>
                            </div>
                    ))
                }
            </div>
            }
        </div>
    </>)
}