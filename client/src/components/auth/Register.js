import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const [pwState, setPwState] = useState(false);
  const { name, email, password, password2 } = user;

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });

  useEffect(() => {
    //if authenticated re-direct to the Home page
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error === 'User already exist...') {
      setAlert(error, 'danger');
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onSubmit = e => {
    e.preventDefault();
    /*if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      console.log('Register submit');
    }*/

    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <form
      className='container mt-5 needs-validation'
      onSubmit={onSubmit}
      noValidate
    >
      <div className='form-group row justify-content-center'>
        <h1>
          Account <span className='text-primary'>Register</span>
        </h1>
      </div>
      {/*=======Name========== */}
      <div className='form-group row justify-content-center'>
        <label htmlFor='name-id' className='col-sm-2 col-form-label'>
          Name
        </label>
        <div className='col-sm-5'>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            className='form-control'
            id='name-id'
            required
          />
          <div className='invalid-feedback'>User Name is required</div>
        </div>
      </div>

      {/*=======Email========== */}
      <div className='form-group row justify-content-center'>
        <label htmlFor='email-id' className='col-sm-2 col-form-label'>
          Email
        </label>
        <div className='col-sm-5'>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            className='form-control'
            id='email-id'
            required
          />
          <div className='invalid-feedback'>Email is required</div>
        </div>
      </div>
      {/*=======Password one======*/}
      <div className='form-group row justify-content-center'>
        <label htmlFor='password-id' className='col-sm-2 col-form-label'>
          Password
        </label>
        <div className='col-sm-5 input-group'>
          <input
            type={pwState ? 'text' : 'password'}
            name='password'
            value={password}
            onChange={onChange}
            className='form-control'
            id='password-id'
            required
            minLength='6'
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
          <div className='invalid-feedback'>Please provide password</div>
        </div>
      </div>
      {/*========Confirm password==== */}
      <div className='form-group row justify-content-center'>
        <label
          htmlFor='password2-id'
          className='col-sm-2 col-form-label text-nowrap'
        >
          Confirm Password
        </label>
        <div className='col-sm-5 input-group'>
          <input
            type={pwState ? 'text' : 'password'}
            name='password2'
            value={password2}
            onChange={onChange}
            className='form-control'
            id='password2-id'
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
          <div className='invalid-feedback'>Please confirm the password</div>
        </div>
      </div>
      {/*========submit button=========== */}
      <div className='form-group row justify-content-center'>
        <div className='col-sm-7'>
          <input
            type='submit'
            value='REGISTER'
            className='btn btn-primary btn-block'
          />
        </div>
      </div>
    </form>
  );
};

export default Register;
