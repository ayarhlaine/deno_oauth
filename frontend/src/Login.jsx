import React from 'react'

const Login = () => {
    const onLogin = () => {
        if (process.env.NODE_ENV === 'development') {
          window.location.href = 'http://localhost:8080/auth/signin';
        } else {
          window.location.href = 'https://' + window.location.hostname + '/auth/signin';
        }
      }
  return (
    <div>
        <h4>You are not currently logined.</h4>
        <br />
        <button className='Login_Button' onClick={onLogin}>Login</button>
    </div>
  )
}

export default Login