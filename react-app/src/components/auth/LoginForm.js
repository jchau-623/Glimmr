import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import { login, validateEmail } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const history = useHistory()
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisplayedEmailField, setIsDisplayedEmailField] = useState(true)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();
    let email = 'demo@aa.io'
    let password = 'password'
    await dispatch(login(email, password))
    history.push("/");
  }

  const handleClickNext = async (e) => {
    e.preventDefault();
    const data = await dispatch(validateEmail(email));
    /* problem: even if the email is incorrect,
    what we want: if the email is correct, move to the next field. if not, display error
    */
    if (data === email) { // if data is true
      // console.log(data)
      // TODO FIX ERROR HANDLING
      setIsDisplayedEmailField(false);
    } else {
      setErrors(data);
    }
  };


  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <section className='login-container'>
      <div className='login-border'>
        <span className='login-logo'>Log in to Glimmr</span>
        <form onSubmit={isDisplayedEmailField ? handleClickNext : onLogin} className='login-form'>
          <div className='login-wrapper'>
            <div className='login-input-container'>
              {isDisplayedEmailField ?
                (
                  <input
                    className='login-input'
                    name='email'
                    type='text'
                    placeholder='Email address'
                    value={email}
                    onChange={updateEmail}
                  />
                ) :

                (
                  <div className='login-input-container'>
                    <input
                      className='login-input'
                      name='password'
                      type='password'
                      placeholder='Password'
                      value={password}
                      onChange={updatePassword}
                    />
                  </div>
                )}
            </div>
            <div className='error-handling-login'>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            {isDisplayedEmailField ?
              (
                <div className='login-wrapper'>
                    <div className='login-btns'>
                      <button className='login-next' type='submit'>Next</button>
                      <button className='login-next' onClick={demoLogin}>Demo User</button>
                  </div>
                    <div className='signup-login-text'>
                      <span className='login-learn-more'>Not a Glimmr member? </span>
                      <NavLink to='/sign-up' className='signup-link'>Sign up here.</NavLink>
                    </div>
                </div>
              ) : (
                <div className='login-wrapper'>
                  {/* <span className='login-forgot'>Forgot Password?</span> */}
                  <div className='login-btns'>
                    <button className='login-next' type='submit'>Sign in</button>
                  </div>
                </div>
              )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginForm;
