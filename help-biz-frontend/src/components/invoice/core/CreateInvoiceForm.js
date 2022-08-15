import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../../auth/authHelper'
import "../styles/invoiceForm.css"


function CreateInvoiceForm({ data, setData }) {
    const [totalCost, setTotalCost] = useState(0)
    const [item, setItem] = useState({
        name: "",
        price: "",
        qty: "",
        total: "",
        tt: ""
    })

    const [errorMessage, setErrorMessage] = useState({
        isError: false,
        message:""
    })

    useEffect(() => {
        const d = isAuthenticated().user
        // console.log(d)
        // const { name, email } = d
        setData({ ...data, storeDetails: { ...data.storeDetails, name: d.name, email: d.email, id: d._id } })

    }, [])
    const pushItemToMainState = () => {

        if(!item.name || !item.price || !item.qty)
        {
            setErrorMessage({
                isError:true,
                message: "Fields can't be empty"
            })
            return;
        }
        const t = (parseInt(item.price) * parseInt(item.qty))
        console.log("this is total " + t)
        setItem({ ...item, tt: t })
        console.log(item)


        setData({ ...data, products: [...data.products, { name: item.name, price: item.price, qty: item.qty, total: t }] })


        setItem({
            name: "",
            price: "",
            qty: "",
            total: ""
        })





    }
    const customerDetailsForm = () => {
        return (
            <div className="customerDetailsFormBody">

                <input placeholder="name" onChange={(e) => { setData({ ...data, customerDetails: { ...data.customerDetails, name: e.target.value } }) }} />
                <input placeholder="phone" onChange={(e) => { setData({ ...data, customerDetails: { ...data.customerDetails, phone: e.target.value } }) }} />
                <input placeholder="Email" onChange={(e) => { setData({ ...data, customerDetails: { ...data.customerDetails, email: e.target.value } }) }} />
                <input placeholder="address" onChange={(e) => { setData({ ...data, customerDetails: { ...data.customerDetails, address: e.target.value } }) }} />

            </div>
        )
    }

    const showError = (message) =>{
        return (
          <div className='error-message'>
            <span>{message}</span>
            <span onClick={()=>{setErrorMessage({isError:false, message:""})}}>X</span>
          </div>
        );
    }
    const addItemForm = () => {
        return (
            <div className="addItemForm">
                <input value={item.name} placeholder="name" onChange={(e) => { setItem({ ...item, name: e.target.value }) }} />
                <input value={item.price} placeholder="price" onChange={(e) => { setItem({ ...item, price: e.target.value }) }} />
                <input value={item.qty} placeholder="quantity" onChange={(e) => { setItem({ ...item, qty: e.target.value }) }} />

                <button onClick={() => { pushItemToMainState() }}>Add</button>
            </div>
        )
    }
    return (
        <div className="invoiceFormBody">
            {customerDetailsForm()}
            {errorMessage.isError && showError(errorMessage.message)}
            {addItemForm()}
        </div>
    )
}

export default CreateInvoiceForm
