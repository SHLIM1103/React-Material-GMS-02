import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (<div>
                <h1>HOME</h1>
                <nav>
                    <Link to={ 'about' }>[회사소개]</Link>
                    <Link to={ 'contacts' }>[고객지원]</Link>
                    <Link to={ 'events' }>[이벤트]</Link>
                    <Link to={ 'products' }>[제품]</Link>
                </nav>
            </div>)
}