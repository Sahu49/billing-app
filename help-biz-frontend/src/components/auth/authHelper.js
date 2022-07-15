import { API } from "../../Backend"
export const signupHelper = (data) => {
    return fetch(`${API}/auth/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            password: data.password
        })
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err)
    })
}

export const signInHelper = (data) => {
    return fetch(`${API}/auth/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({

            email: data.email,
            password: data.password
        })
    }).then((res) => {
        return res.json();
    }).catch((err) => {
        console.log(err)
    })
}

export const isAuthenticated = () => {
    const userData = JSON.parse(localStorage.getItem("auth"))
    if (userData) {
        return userData
    }
    else {
        return false;
    }
}
export const logoutHelper = () => {
    localStorage.removeItem("auth")
}