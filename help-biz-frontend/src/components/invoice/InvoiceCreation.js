import React, { useState, useEffect } from 'react'
import Base from '../core/Base'
import CreateInvoiceForm from './core/CreateInvoiceForm'
import InvoiceDisplay from './core/InvoiceDisplay'
import { setInvoiceApiCall } from './InvoiceApiHelper'
import "./styles/invoiceBaseStyle.css"
const hideButton = {
    display: "none"
}
function InvoiceBase() {
    const [hideSaveButton, setHideSaveButton] = useState(false)
    const [data, setData] = useState({
        storeDetails: {
            name: "",
            email: "",
            phone: "",
            address: "",
            id: ""
        },
        customerDetails: {
            name: "",
            email: "",
            phone: "",
            address: ""
        },
        products: [

        ],
        allTotal: 0
    })
    const saveInvoice = () => {
        setInvoiceApiCall(data).then((res) => {
            setData(res)
            console.log(res)
            setHideSaveButton(true)
        })
    }
    return (
        <Base>
            <>
                <button style={{ display: hideSaveButton == false ? "block" : "none" }} className="saveButton" onClick={() => { saveInvoice() }}>Save</button>
                <div className="invoiceBaseBody">

                    <CreateInvoiceForm data={data} setData={setData} />
                    <InvoiceDisplay data={data} setData={setData} />

                </div>

            </>
        </Base>
    )
}

export default InvoiceBase
