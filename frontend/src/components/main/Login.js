import React from 'react'

const Login = () => {
    
  return (
  
    <div class="container py-5">      
      <div className='col-md-4 mx-auto mt-5'>
        {/* Create Your Card Here */}
        <h1><u>Login</u></h1>
        <div className='card'>
          <div className='card-body'>
            <label>Email Address</label>
            <input className='form-control'/>
            <label>Password</label>
            <input type='password' className='form-control'/>
            <button className='btn btn-primary mt-3'>Login</button>
         </div>
        </div>
      </div>
   </div>

      
  )
}

export default Login;