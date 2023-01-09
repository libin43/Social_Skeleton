import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Profile from '../Components/Profile/Profile';

function ProfilePage() {
  return (
    <div>
        <React.Fragment>
            <Navbar></Navbar>
            <Profile></Profile>
        </React.Fragment>
    </div>
  )
}

export default ProfilePage;