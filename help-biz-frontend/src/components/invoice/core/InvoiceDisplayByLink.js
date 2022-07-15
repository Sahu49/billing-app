import React, { useState, useEffect } from 'react'
import { getInvoiceById } from '../InvoiceApiHelper'
import InvoiceDisplay from './InvoiceDisplay'

function InvoiceDisplayByLink() {
    const [data, setData] = useState({})
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        let link = window.location.href
        link = link.split("/")
        let len = link.length
        console.log(link[len - 1])
        let tar = link[len - 1]
        getInvoiceById(tar).then((res) => {
            setData(res)
            console.log(res)
            setLoaded(true)
        })
    }, [])
    return (
        <div style={{ margin: "auto", width: "600px" }}>
            {/* <h5>Hi {data.customerDetails.name}, This is your invoice at {data.storeDetails.name}</h5> */}
            {loaded && <InvoiceDisplay data={data} />}
            {!loaded && <h3>Loading</h3>}
        </div>
    )
}

export default InvoiceDisplayByLink
