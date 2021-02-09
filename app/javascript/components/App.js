import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Flights from './Flights/Flights'
import Checkout from './Checkout/Checkout'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Flights} />
      <Route exact path="/checkout" component={Checkout} />
    </Switch>
  )
}

export default App
