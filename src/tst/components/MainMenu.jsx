import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

const selectedStyle = {
    backgroundColor: 'white', color: 'red'
}

export default function MainMenu() {
    return (<nav>
                <NavLink to={"/"}><FaHome/></NavLink>
                <NavLink to={"/about"} activeStyle={ selectedStyle }>[회사소개]</NavLink>
                <NavLink to={"/events"} activeStyle={ selectedStyle }>[이벤트]</NavLink>
                <NavLink to={"/products"} activeStyle={ selectedStyle }>[제품]</NavLink>
                <NavLink to={"/contacts"} activeStyle={ selectedStyle }>[고객지원]</NavLink>
            </nav>)
}