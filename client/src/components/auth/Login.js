import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = props => {
  const [pwState, setPwState] = useState(false);

  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Invalid credentials...') {
      setAlert(error, 'danger');
      clearErrors();
    }
  }, [error, isAuthenticated, props.history]);

  //local storage
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;
  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  //====Submit Form====
  const onSubmit = e => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <form
      onSubmit={onSubmit}
      className='container mt-5 needs-validation'
      noValidate
    >
      {/*=======heading=========== */}
      <div className='form-group row justify-content-center'>
        <h1>
          Account <span className='text-primary'>Login</span>
        </h1>
      </div>
      {/*=======email=============== */}
      <div className='form-group row justify-content-center'>
        <label htmlFor='email-id' className='col-sm-2 col-form-label'>
          Email
        </label>
        <div className='col-sm-6'>
          <input
            type='email'
            id='email-id'
            name='email'
            value={email}
            onChange={onChange}
            className='form-control'
            required
          />
          <div className='invalid-feedback'>Please enter email address</div>
        </div>
      </div>
      {/*=======password============ */}
      <div className='form-group row justify-content-center'>
        <label htmlFor='password-id' className='col-sm-2 col-form-label'>
          Password
        </label>
        <div className='col-sm-6 input-group'>
          <input
            type={pwState ? 'text' : 'password'}
            id='password-id'
            name='password'
            value={password}
            onChange={onChange}
            className='form-control'
            required
          />
          <div className='input-group-append'>
            <div className='input-group-text'>
              <FontAwesomeIcon
                icon={pwState ? ['far', 'eye'] : ['far', 'eye-slash']}
                onClick={() => setPwState(!pwState)}
                className={
                  pwState
                    ? 'cursor-pointer text-primary'
                    : 'cursor-pointer text-secondary'
                }
              />
            </div>
          </div>
          <div className='invalid-feedback'>Please enter password</div>
        </div>
      </div>
      {/*========submit button======== */}
      <div className='form-group row justify-content-center'>
        <div className='col-sm-8'>
          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </div>
      </div>
    </form>
  );
};

export default Login;
