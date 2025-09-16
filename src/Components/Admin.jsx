import React from 'react'
import Table from './Table'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MyNavbar from './Navbar';


function Admin() {

  return (
    <>
    <MyNavbar />
    <div className='adminTitle' style={{margin:"10px",display:"flex", justifyContent:"center", alignItems:"center"}}><h3 style={{width:"200px", backgroundColor:"lightblue",display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"5px"}}>Admin Panel</h3></div>
    <Table />
    </>
  )
}

export default Admin