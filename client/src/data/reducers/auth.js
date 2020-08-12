import axios from 'axios'
import { toast } from 'react-toastify'

import { URLDevelopment } from '../../helpers/URL'
import { setAuthToken } from '../../helpers/setAuthToken'

// Types
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const REGISTER_FAIL = 'REGISTER_FAIL'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAIL = 'LOGIN_FAIL'
const USER_LOADED = 'USER_LOADED'
const AUTH_ERROR = 'AUTH_ERROR'
export const LOGOUT = 'LOGOUT'
export const SET_LOADING = 'SET_LOADING'



// initial state

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false,
  user: null
}

// reducers

export default (state = initialState, action) => {
  const { type, payload } = action
  switch(type){
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
        token: null
      }
    default:
      return state
  }
}

// actions

export const loadUser = () => async dispatch => {
  /** 
   * Method setAuthToken
   * 除了註冊外，其它的請求都需要在 Header 裡帶著 Token，所以 axios default 在 local storage 裡有 token 的 
   * 話就會帶上去 Header
   */
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get(`${URLDevelopment}/api/user`)
    dispatch({ type: USER_LOADED, payload: res.data })
  } catch (error) {
    console.log(error.message)
    dispatch({ type: AUTH_ERROR })
  }
}

export const register = ({name, email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch({ type: SET_LOADING})
  const body = JSON.stringify({name, email, password})
  try {
    const res = await axios.post(`${URLDevelopment}/api/user/register`, body, config)
    dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors
    if(errors){
      errors.forEach(err => toast.error(err.msg))
    }
    dispatch({ type: REGISTER_FAIL })
  }
}

export const login = ({email, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  dispatch({ type: SET_LOADING})
  const body = JSON.stringify({email, password})
  try {
    const res = await axios.post(`${URLDevelopment}/api/user/login`, body, config)
    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    dispatch(loadUser())
  } catch (error) {
    const errors = error.response.data.errors
    if(errors){
      errors.forEach(err => toast.error(err.msg))
    }
    dispatch({ type: LOGIN_FAIL })
  }
}