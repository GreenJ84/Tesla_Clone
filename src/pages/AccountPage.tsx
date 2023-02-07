import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../app/Store/User/userSlice'

const AccountPage = () => {
  const user = useUserData();
  const nav = useNavigate()
  useEffect(() => {
    if (!user) {
      nav('/login');
    }
  }, [])

  return (
    <div>Here Is your account for now!</div>
  )
}

export default AccountPage;