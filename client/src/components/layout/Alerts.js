import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//validation form fields -instead use bootstrap
const Alerts = () => {
  const alertContext = useContext(AlertContext);
  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div key={alert.id} className={`mt-3 alert alert-${alert.type}`}>
        <FontAwesomeIcon icon={'info-circle'} className='mr-2' />
        {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
