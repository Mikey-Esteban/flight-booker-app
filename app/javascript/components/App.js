import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Flights from './Flights/Flights'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Flights} />

    </Switch>
  )
}

export default App
