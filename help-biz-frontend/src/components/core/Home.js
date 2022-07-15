import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../auth/authHelper'

import Base from './Base'
import { Link, Redirect } from "react-router-dom"
import "./core-styles/HomeStyle.css"

function Home() {
    const [redirect, setredirect] = useState(false);
    useEffect(() => {
        if (!isAuthenticated()) {
            setredirect(true)
        }
    }, [])
    const handleRedirect = () => {
        return <Redirect to="/signup" />
    }
    if (!isAuthenticated()) {
        return (
            <Base>
                <div className="homeNotLoggedIn">
                    <div className="message">
                        Please login to your account
                    </div>
                </div>
            </Base>
        )
    }
    return (
      <Base>
        <div className="homeBody">
          <div className="controlPanel">
            <div className="leftColumn">
              <Link style={{ textDecoration: "none" }} to="/invoice/create">
                <div className="item1">Create Invoice</div>
              </Link>

              <Link style={{ textDecoration: "none" }} to="/invoice/search">
                <div className="item1">Search Invoice</div>
              </Link>

              <Link style={{ textDecoration: "none" }} to="/customer/search">
                <div className="item1">Search Customer</div>
              </Link>

              <Link style={{ textDecoration: "none" }} to="/ledger">
                <div className="item1">Ledger</div>
              </Link>
            </div>
          </div>
        </div>
        {/* <InvoiceCreation /> */}
      </Base>
    );
}

export default Home
