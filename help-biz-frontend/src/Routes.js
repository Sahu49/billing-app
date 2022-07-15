import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import Signin from './components/auth/Signin'
import Signup from './components/auth/Signup'
import Commingsoon from './components/core/Commingsoon'
import Home from './components/core/Home'
import InvoiceDisplayByLink from './components/invoice/core/InvoiceDisplayByLink'
import FindInvoiceCustomer from './components/invoice/Customers/FindInvoiceCustomer'
import InvoiceCreation from "./components/invoice/InvoiceCreation"
import SearchInvoice from './components/invoice/SearchInvoice'
import ShopProfile from './components/shop/ShopProfile'
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'
function Routes() {

    return (
      <div>
        <Router>
          <Switch>
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/user/account" component={ShopProfile} />
            <PrivateRoute
              exact
              path="/invoice/create"
              component={InvoiceCreation}
            />
            <Route
              exact
              path="/invoice/display/email/:id"
              component={InvoiceDisplayByLink}
            />
            <PrivateRoute
              exact
              path="/invoice/search"
              component={SearchInvoice}
            />
            <Route
              exact
              path="/customer/invoice/search"
              component={FindInvoiceCustomer}
            />
            <Route exact path="/customer/search" component={Commingsoon} />
            <Route exact path="/ledger" component={Commingsoon} />
          </Switch>
        </Router>
      </div>
    );
}

export default Routes
