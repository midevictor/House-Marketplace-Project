import React from 'react'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute';
import Explore from "./pages/Explore"
import ForgotPassword from "./pages/ForgotPassword"
import Offers from "./pages/Offers"
import Category from './pages/Category';
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path='/profile' element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Navbar/>
        {/* i put the navbar inside the router tag cos i used useNavigate hooks */}
      </Router>

      <ToastContainer/>
    
    </>
  )
}

export default App
