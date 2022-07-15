import React from 'react'
import { useState } from 'react'
import { NavItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import NavComponent from '../../core/NavComponent'
import { getAllInvoicesByCustomerMail } from './CustomersApi'
import "./FindInvoiceCustomerStyles.css"
const moment = require('moment');


function FindInvoiceCustomer() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [invoiceData, setInvoiceData] = useState([])
    const [loading, setloading] = useState(false)
    const handleSearch = () => {
        setloading(true)
        getAllInvoicesByCustomerMail(email).then((res) => {
            if (res.error) {
                setError(true)
            }
            else {

                setInvoiceData(res.data)
                console.log(invoiceData)
                setloading(false)
            }
        })
    }

    const handleEnterKey = (e) => {
        if (e.key == 'Enter') {
            handleSearch()
        }
    }

    const invoiceListItem = (itm) => {
        const time = moment(itm.createdAt);
        console.log(time.format("DD/MM/YY HH:mm"));
        return <Link to={`/invoice/display/email/${itm._id}`} style={{ textDecoration: "none" }}>
            <div className='list-item'>
                <div className='shop-name'>{itm.storeDetails.name}</div>
                <div className='shop-email'>Email: {itm.storeDetails.email}</div>
                <div className='date'>Time: {time.format("DD/MM/YY HH:mm")}</div>
                <div className='spant'>Spent: {itm.allTotal}</div>
            </div>
        </Link>
    }

    return (
        <div>
            <NavComponent />
            <div className='search-box'>
                <input
                    onKeyDown={handleEnterKey}
                    onChange={(e) => {

                        setEmail(e.target.value)
                    }} />
                <button onClick={() => { handleSearch() }}>Search</button>
            </div>
            <div className='invoices-list'>


                {!loading && invoiceData.length &&
                    invoiceData.map((e) => {
                        return invoiceListItem(e)
                    })}

            </div>
        </div>
    )
}

export default FindInvoiceCustomer