import React from 'react'
import { MainMenu } from './index'

export default function PageTemplate({ children }) {
    return (<div>
        <MainMenu/>
            { children }
    </div>)
}