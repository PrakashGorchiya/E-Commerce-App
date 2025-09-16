import React, { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, cartList, addToCartAction, minusQuantityAction, updateProduct, updateStock } from '../Redux/action';
import MyNavbar from './Navbar';

function Cart() {
  
  const dispatch = useDispatch();
  const response = useSelector((state) => state.cartItems);
  const user = localStorage.getItem("UserName")

  console.log("Hello in at Cart page", response.data);

  // Function to handle deletion of a card
  const handleDelete = (record) => {
    console.log("record is: ", record)
    console.log("deleting id is: ", record.id);
    console.log("Quantity is: ", record.quantity);
    
    const stockQuantity = record.cart.numberOfItems + record.quantity;
    console.log("Updated stock Quantity is: ", stockQuantity);
    
    dispatch(deleteCartItem(record.id));
  };

  useEffect(() => {
    dispatch(cartList())
  }, []);

  const addQuantity = (record) => {
    console.log("record.cart.is id is :", record.cart.id);
    console.log("record is", record);
    console.log("cart is", record.cart);  
    
    if (record.cart.numberOfItems<=0) {
      console.log("Item is not available more - Out of stock!");
      window.alert("Item is not available more - Out of stock!");
    }
    else{
      dispatch(addToCartAction(record.cart));
    }
  };

  const minusQuantity = (record) => {
    console.log("Minus quantity Id", record.cart.id );
    console.log("Quantity is: ", record.quantity);
    if (record.quantity > 1) {
      dispatch(minusQuantityAction(record.cart.id));
    }
    else{
      dispatch(deleteCartItem(record.id))
    }
  };

  return (
    <>
      <MyNavbar />

      <div style={{ margin: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}><h3 style={{ margin: "3px", width: "250px", backgroundColor: "lightblue", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "5px" }}>Your Cart Items</h3></div>

      <Container className="my-4">
        <Table striped bordered hover responsive style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th><b>Sr.No</b></th>
              <th><b>Title</b></th>
              <th><b>Description</b></th>
              <th><b>Quantity</b></th>
              <th><b>Price</b></th>
              <th><b>Actions</b></th>
            </tr>
          </thead>
          <tbody >
            {response.data && response.data.map && response.data.map((record, index) => (
              <tr key={record.id}>
                <td>{index + 1}</td>
                <td>{record.cart.title}</td>
                <td>{record.cart.description}</td>
                <td style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                  <div style={{width:"100px" ,border:"1px solid", borderRadius:"5px"}}>
                    <button onClick={() => minusQuantity(record)} style={{border:"none", marginRight:"15px"}}> <b> - </b> </button>
                    {record.quantity} 
                    <button onClick={() => addQuantity(record)} style={{border:"none", marginLeft:"15px"}}><b> + </b> </button>
                  </div>
                </td>
                <td>  {record.quantity * parseInt(record.cart.price.replace(/,/g, ""), 10)}   </td>
                <td>
                  <Button
                    variant="danger" style={{ margin: "5px" }}
                    onClick={() => handleDelete(record)} 
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

    </>
  )
}

export default Cart