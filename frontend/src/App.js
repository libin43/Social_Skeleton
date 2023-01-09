import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';


import LoginPage from './Client/Pages/LoginPage';
import SignupPage from './Client/Pages/SignupPage';
import FeedsPage from './Client/Pages/FeedsPage';
import HomePage from './Client/Pages/HomePage';
import ProfilePage from './Client/Pages/ProfilePage';


function App() {  
  return (
    <div className="App">
      <Router>

        <Routes>
  
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/feed' element={<FeedsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>

        </Routes>

      </Router>

    </div>
  );
}

export default App;
