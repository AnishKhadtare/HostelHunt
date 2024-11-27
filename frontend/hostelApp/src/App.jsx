import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HostelPage from './pages/HostelPage';
import PostHostel from './pages/PostHostel';
import SellerPostedHostels from './pages/SellerPostedHostels';
import ChangePassword from './pages/ChangePassword';
import SingleHostel from './pages/SingleHostel';
import { UserProvider } from './context/userContext';
import LearnMore from './pages/LearnMore';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/hostels' element={<HostelPage/>}></Route>
          <Route path='/post-hostel' element={<PostHostel/>}></Route>
          <Route path='/posted-hostels' element={<SellerPostedHostels/>}></Route>
          <Route path='/change-password' element={<ChangePassword/>}></Route>
          <Route path='/get-single-hostel/:id' element={<SingleHostel/>}></Route>
          <Route path='/learn-more' element={<LearnMore/>}></Route>
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
