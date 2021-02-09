import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Flights from './Flights/Flights'
import Checkout from './Checkout/Checkout'
import Booking from './Booking/Booking'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Flights} />
      <Route exact path="/checkout" component={Checkout} />
      <Route exact path="/bookings/:id" component={Booking} />
    </Switch>
  )
}

export default App
