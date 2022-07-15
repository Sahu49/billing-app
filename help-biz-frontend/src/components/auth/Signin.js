import React, { useState } from 'react'
import Base from '../core/Base'
import { Form, Button } from 'react-bootstrap'
import './auth-styles/signup-style.css'
import { Redirect } from "react-router-dom"
import { signInHelper } from './authHelper'
function Signin() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    redirect: false
  })
  const handleSubmit = () => {
    signInHelper(userData).then((res) => {
      if (res.error) {
        console.log("something went wrong please try again")
      }
      else {
        console.log(res)

        localStorage.setItem("auth", JSON.stringify(res));
        setUserData({ ...userData, redirect: true })



      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const redirectToHome = () => {
    return <Redirect to="/" />
  }
  return (
    <Base>
      <div className='signup-form-body'>
        {userData.redirect && redirectToHome()}
        <Form>
          <div className='containerHeader'>Sign In</div>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control type='email' placeholder='Enter email'
              onChange={(e) => { setUserData({ ...userData, email: e.target.value }) }}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Password'
              onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
            />
          </Form.Group>

          <Button variant='primary' onClick={() => { handleSubmit() }}>
            Submit
          </Button>
        </Form>
      </div>
    </Base>
  )
}

export default Signin
