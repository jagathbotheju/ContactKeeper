import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current, clearCurrent, updateContact } = contactContext;

  //component did mount
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
    }
  }, [contactContext, current]); //if contactContext or current values changed

  //local state
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      {/* =========Name=====================  */}
      <div className='form-row'>
        <div className='col-md-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>
        {/* =========Email=====================  */}
        <div className='col-md-5'>
          <input
            type='email'
            className='form-control'
            placeholder='Email'
            name='email'
            value={email}
            onChange={onChange}
          />
        </div>
        {/* =========Phone=====================  */}
        <div className='col-md-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Phone'
            name='phone'
            value={phone}
            onChange={onChange}
          />
        </div>
      </div>
      <h5 className='mt-3'>Contact Type</h5>
      {/* =========type-Personal=====================  */}
      {/*<label>
        <input
          type='radio'
          name='type'
          value='personal'
          className='mr-2'
          onChange={onChange}
          checked={type === 'personal'}
        />
        Personal
      </label>*/}
      <div className='custom-control custom-radio'>
        <input
          type='radio'
          name='type'
          id='personal'
          value='personal'
          className='custom-control-input'
          onChange={onChange}
          checked={type === 'personal'}
        />
        <label className='custom-control-label' htmlFor='personal'>
          Personal
        </label>
      </div>
      {/* =========type-Professional=====================  */}
      {/*<label>
        <input
          type='radio'
          name='type'
          value='professional'
          className='mx-2'
          onChange={onChange}
          checked={type === 'professional'}
        />
        Professional
      </label>*/}

      <div className='custom-control custom-radio'>
        <input
          type='radio'
          name='type'
          className='custom-control-input'
          id='professional'
          value='professional'
          onChange={onChange}
          checked={type === 'professional'}
        />
        <label className='custom-control-label' htmlFor='professional'>
          professional
        </label>
      </div>

      <div>
        <input
          type='submit'
          value={current ? 'Update Contact' : 'Add Contact'}
          className='btn btn-primary btn-block mt-2'
        />
      </div>
      {current && (
        <div>
          <button
            className='btn btn-outline-secondary btn-block mt-1'
            onClick={clearAll}
          >
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
