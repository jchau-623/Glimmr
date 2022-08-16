import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  // const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(firstName, lastName, email, password, repeatPassword));
    // console.log(data)
    if (data) {
      setErrors(data)
    }
  };

  // const updateUsername = (e) => {
  //   setUsername(e.target.value);
  // };

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <section className='signup-container'>
      <form onSubmit={onSignUp} className='signup-form'>
        <div className='form-contents'>
          <p className='signup-heading'>Sign up for Glimmr</p>
          <div className='error-handling-signup'>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className='main'>
            <div className='row-1'>
              <div className='form-field-container first-name-field'>
                <input
                  className='form-field'
                  placeholder='First name'
                  type='text'
                  name='first_name'
                  onChange={updateFirstName}
                  value={firstName}
                ></input>
              </div>
              <div className='form-field-container'>
                <input
                  className='form-field'
                  placeholder='Last name'
                  type='text'
                  name='last_name'
                  onChange={updateLastName}
                  value={lastName}
                ></input>
              </div>
            </div>
            <div className='row-2'>
              <div className='form-field-container'>
                <input
                  className='form-field'
                  placeholder='Email address'
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
            </div>
            <div className='row-3'>
              <div className='form-field-container password-field'>
                <input
                  className='form-field'
                  placeholder='Password'
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div className='form-field-container password-field'>
                <input
                  className='form-field'
                  placeholder='Confirm password'
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                ></input>
              </div>
            </div>
            <div className='login-text'>
            <span className='signup-learn-more'>Already a Glimmr member? </span>
            <NavLink to='/login' className='login-link'>Login in here.</NavLink>
            </div>
            <button className='next' type='submit'>Sign up</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
