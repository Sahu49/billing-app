import React, { useState, useEffect } from 'react'
import Base from "../core/Base"
import SearchResultCard from './core/SearchResultCard'
import { searchCustomer } from './InvoiceApiHelper'
import "./styles/searchInvoiceStyle.css"

function SearchInvoice() {
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(true)
    const liveQueryForEmail = (e) => {
        const email = e.target.value
        searchCustomer(email).then((res) => {
            setResults(res)
            console.log(res)
            if (res.length)
                setLoading(false)
        })
    }
    return (
        <Base>
            <div className="searchInvoiceBody">
                <div className="searchBar">
                    <input
                        placeholder="customer email"
                        onChange={(e) => { liveQueryForEmail(e) }}
                    />
                </div>
                <div className="searchResult">
                    <div className="heading">
                        <div className="col">Name</div>
                        <div className="col">Phone</div>
                        <div className="col">email</div>
                    </div>
                    {
                        !loading && results.map((result) => {
                            return (
                                <SearchResultCard res={result} />
                            )
                        })
                    }
                </div>
            </div>
        </Base>
    )
}

export default SearchInvoice
