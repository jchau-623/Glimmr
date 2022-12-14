import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "./LogoutButton.css";

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <div className='logout-btn-container'>
    <button className='logout-btn' onClick={onLogout}>Log out
  </button>
    </div>
};

export default LogoutButton;
