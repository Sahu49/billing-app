import React from 'react'
import NavComponent from './NavComponent'
import "./core-styles/Base-style.css"
function Base({ children }) {
    return (
        <div>
            {/* <div className="title">Gossip-chain</div> */}
            <NavComponent />
            {children}
        </div>
    )
}

export default Base
