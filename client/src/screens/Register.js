import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { connect, useSelector } from 'react-redux'

import './loading.css'

import Container from '../components/container/container.component'
import FormInput from '../components/inputs/formInput.component'
import Button from '../components/button/button.component'

import { register } from '../data/reducers/auth'

const Register = ({ register }) => {
  const isLoading = useSelector(state => state.auth.loading)
  const [data, setData] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = name => e => {
    setData({
      ...data,
      [name]: e.target.value
    })
  }
  const { name, email, password, confirmPassword } = data

  const onSubmit = async e => {
    e.preventDefault();
    if(confirmPassword !== password){
      toast.error('Password do not match')
    } else if (!name || !email || !password){
      toast.error('Please Fill all fields')
    } else {
      register({name, email, password})

    }
  }

  return (
    <Container>
      <form onSubmit={onSubmit} className='bg-white rounded-lg overflow-hidden shadow-2xl p-5 my-16 md:w-1/2 lg:w-1/3 mx-auto flex flex-col'>
        <h2 className='font-bold text-3xl text-center mb-5'>Register</h2>
        <FormInput 
          title='Name'
          placeholder='Nick'
          type='text'
          value={name}
          handleChange={handleChange('name')}
        />
        <FormInput 
          title='Email'
          placeholder='Nick@example.com'
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
        <FormInput 
          title='Confirm Password'
          placeholder='******'
          type='password'
          value={confirmPassword}
          handleChange={handleChange('confirmPassword')}
        />
        { isLoading && <div id='loading' className='self-center mb-3'></div> } 
        { !isLoading && 
            <Button 
              title='SingUp'
              moreStyle='bg-primary text-white w-full mb-3'
              type='submit'
            />
        }
        <div className='flex justify-end w-full'>
          <Button 
            isButton={false}
            title='already have an account ?'
            moreStyle='text-gray-600'
            href='/login'
          />
        </div>
      </form>
    </Container>
  )
}

export default connect(null, { register })(Register)
