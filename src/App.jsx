import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home";
import Create from "./Components/Create";
import MyNavbar from "./Components/Navbar";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./Components/Admin";
import Cart from "./Components/Cart";
import Update from "./Components/Update";
import ProtectedRoute from "./JWT/ProtectedRoute"; // Import the ProtectedRoute
import Login from "./JWT/LogInForm";
import NestedDropdown from "./Components/NestedDropdown";


function App() {
  return (
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/update" element={<Update />} />
        <Route path="/dropdown" element={<NestedDropdown />}/>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;


  {/* Use ProtectedRoute for the Admin route */}
// <Route
//           path="/admin"
//           element={<ProtectedRoute element={Admin} />}
//         />