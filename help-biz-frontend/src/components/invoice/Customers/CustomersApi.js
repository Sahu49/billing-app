import { API } from "../../../Backend"
export const getAllInvoicesByCustomerMail = (email) => {
    return fetch(`${API}/invoice/customer/byemail?email=${email}`, {
        method: "GET",
        headers: {
            Accept: "application/json"
        }
    }).then((res) => {
        return res.json()
    }).catch((err) => {
        return err
    })
}