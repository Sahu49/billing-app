import React, { useState } from 'react'
import Base from '../core/Base'
import { Form, Button } from 'react-bootstrap'
import './auth-styles/signup-style.css'
import { Link } from 'react-router-dom'
import { signupHelper } from './authHelper'
function Signup() {
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleSubmit = () => {
    //TODO: put validation for data
    console.log(userdata)
    signupHelper(userdata).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }
  //console.log(name)
  //console.log(email)
  //console.log(password)

  return (
    <Base>
      <div className='signup-form-body'>
        <Form>
          <div className='containerHeader'>Sign Up</div>
          <Form.Group className='mb-3' controlId='formBasicName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              onChange={(e) => setUserData({ ...userdata, name: e.target.value })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              onChange={(e) => setUserData({ ...userdata, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              onChange={(e) => setUserData({ ...userdata, password: e.target.value })}
            />
          </Form.Group>

          <Button variant='primary' onClick={() => { handleSubmit() }} >
            Submit
          </Button>
          <div>
            Already have an account ?<Link to='/signin'> sign in </Link>
            here
          </div>
        </Form>
      </div>
    </Base>
  )
}

export default Signup
