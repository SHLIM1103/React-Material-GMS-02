import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Airport = () => {
    const [ data, setData ] = useState([])

    useEffect(() => {
        axios.get(`https://gist.githubusercontent.com/tdreyno/4278655/raw/7b0762c09b519f40397e4c3e100b097d861f5588/airports.json`)
        .then(response => {
            setData(response.data)
        }).catch(error => { throw error } )
    })

    return (<>
        <div className="title">공항검색</div>
        <table style={{ border: `1px solid black` }}>
            <thead>
            <tr style={{ border: `1px solid black` }}>
                    <td style={{ border: `1px solid black` }}>공항 코드</td>
                    <td style={{ border: `1px solid black` }}>국 가</td>
                    <td style={{ border: `1px solid black` }}>공항이름</td>
                    <td style={{ border: `1px solid black` }}>공항 도시</td>
                    <td style={{ border: `1px solid black` }}>공항 ICAO</td>
                </tr>
            </thead>
            <tbody>
                {data.map((i, index) =>  (
                    <tr key={ index } style={{ border: `1px solid black` }}>
                        <td style={{ border: `1px solid black` }}>{i.code}</td>
                        <td style={{ border: `1px solid black` }}>{i.country}</td>
                        <td style={{ border: `1px solid black` }}>{i.name}</td>
                        <td style={{ border: `1px solid black` }}>{i.city}</td>
                        <td style={{ border: `1px solid black` }}>{i.icao}</td>
                    </tr> ))
                }
            </tbody>
        </table>
    </>)
}