import { API } from "../../Backend"
import { isAuthenticated } from "../auth/authHelper"

export const setInvoiceApiCall = (data) => {
    const token = isAuthenticated().token
    const userId = isAuthenticated().user._id
    return fetch(`${API}/invoice/add/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

export const getInvoiceById = (id) => {
    console.log("-----" + id)
    return fetch(`${API}/invoice/email/${id}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                // "Content-Type": "application/json",

            }
        }

    ).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}

export const searchCustomer = (email) => {
    const token = isAuthenticated().token
    const userId = isAuthenticated().user._id
    return fetch(`${API}/invoice/search/by/email/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            email: email
        })
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        console.log(err)
    })
}