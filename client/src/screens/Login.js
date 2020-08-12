import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'

import './loading.css'

import Container from '../components/container/container.component'
import FormInput from '../components/inputs/formInput.component'
import Button from '../components/button/button.component'

import { login } from '../data/reducers/auth'

const Login = () => {
  const isLoading = useSelector(state => state.auth.loading)
  const user = useSelector(state => state.auth.user)
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const handleChange = name => e => {
    setData({
      ...data,
      [name]: e.target.value
    })
  }
  const { email, password } = data

  const onSubmit = async e => {
    e.preventDefault();
    dispatch(login({email, password}))
  }

  if(isAuth && user){
    const { name, role } = user
    toast.success(`Welcome ${name}`)
    if(role === 0) return <Redirect to='/dashboard/user'/>
    if(role === 1) return <Redirect to='/dashboard/admin'/>
  }

  return (
    <Container>
      <form onSubmit={onSubmit} className='bg-white rounded-lg overflow-hidden shadow-2xl p-5 my-16 md:w-1/2 lg:w-1/3 mx-auto flex flex-col'>
        <h2 className='font-bold text-3xl text-center mb-5'>Login</h2>
        <FormInput 
          title='Email'
          placeholder='nick@example.com'
          type='email'
          value={email}
          handleChange={handleChange('email')}
        />
        <FormInput 
          title='Password'
          placeholder='******'
          type='password'
          value={password}
          handleChange={handleChange('password')}
        />
        { isLoading && <div id='loading' className='self-center mb-3'></div> } 
        { !isLoading && 
            <Button 
              title='Login'
              moreStyle='bg-primary text-white w-full mb-3'
              type='submit'
            />
        }
        <div className='flex justify-end w-full'>
          <Button 
            isButton={false}
            title='did you need a new account ?'
            moreStyle='text-gray-600'
            href='/register'
          />
        </div>
      </form>
    </Container>
  )
}

export default Login
