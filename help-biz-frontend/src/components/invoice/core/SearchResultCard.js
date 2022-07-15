import React from 'react'
import "../styles/searchResultCardStyle.css"
function SearchResultCard({ res }) {

    return (
        <div className="cardRow">
            <div className="col">{res.customerDetails.name}</div>
            <div className="col">{res.customerDetails.phone}</div>
            <div className="col">{res.customerDetails.email}</div>
        </div>
    )

}

export default SearchResultCard
