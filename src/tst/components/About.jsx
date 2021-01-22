import React from 'react'
import { PageTemplate, AboutMenu } from './index'
import { Company, History, Location, Services } from './aboutMenu'
import { Route } from 'react-router-dom'

export default function About({ match }) {
    return (<PageTemplate>
                <section>
                    <Route component={ AboutMenu } />
                    <Route exact path='/about' component={ Company } />
                    <Route path='/about/hitory' component={ History } />
                    <Route path='/about/location' component={ Location } />
                    <Route path='/about/services' component={ Services } />
                </section>
            </PageTemplate>)
}