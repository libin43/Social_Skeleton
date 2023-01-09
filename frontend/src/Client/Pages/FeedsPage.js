import React from 'react';
import Feed from '../Components/Feed/Feed';
import Navbar from '../Components/Navbar/Navbar';

function FeedsPage() {
  return (
   <React.Fragment>
    <Navbar></Navbar>
    <Feed></Feed>
   </React.Fragment>
  )
}

export default FeedsPage;