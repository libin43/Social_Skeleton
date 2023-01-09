import React from 'react';
import Home from '../Components/Homebanner/Home';
import Navbar from '../Components/Navbar/Navbar';

function HomePage() {
  return (
    <div>
        <React.Fragment>
            <Navbar></Navbar>
            <Home></Home>
        </React.Fragment>
    </div>
  )
}

export default HomePage;