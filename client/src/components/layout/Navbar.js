import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);
  const { isAuthenticated, logout, user } = authContext;
  const { clearContacts } = contactContext;

  const onLogOut = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <h5 className='text-white'>Hello {user && user.name}</h5>
      </li>
      <li className='nav-item'>
        <a href='#!' onClick={onLogOut}>
          <h5>
            <FontAwesomeIcon icon='sign-out-alt' className='text-danger ml-4' />
            <span className='hide-sm text-danger ml-2'>Logout</span>
          </h5>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link to='/register' className='nav-link'>
          <h5 className='text-white'>Register</h5>
        </Link>
      </li>
      <li className='nav-item'>
        <Link to='/login' className='nav-link'>
          <h5 className='text-white'>Login</h5>
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand navbar-dark bg-primary'>
      <span className='navbar-text'>
        <h3 className='text-white'>
          <FontAwesomeIcon icon='id-card-alt' className='mx-3' />
          {title}
        </h3>
      </span>
      <ul className='navbar-nav ml-auto'>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
