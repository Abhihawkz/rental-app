import React, { useState } from 'react'

const Login = () => {
   


    const handleSubmit = (event) => {
        event.preventDefault();
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Email' />
        <input type="text" placeholder='password' />
        <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default Login;