import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../app/Store/User/userSlice'
import Account from '../components/AccountPage/Account';
import Header from '../components/Layout/Header';
import SmallFooter from '../components/Layout/SmallFooter';

const AccountPage = () => {
  const user = useUserData();
  const nav = useNavigate()
  useEffect(() => {
    if (!user) {
      nav('/login');
    }
  }, [])

  return (
    <>
      <Header />
      <Account />
      <SmallFooter/>
    </>
  )
}

export default AccountPage;