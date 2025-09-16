import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) => {
      e.preventDefault()
     const credential={username,password}
      try {
        console.log("credential: ", credential);
        const resp = await axios.post('http://localhost:8080/login',credential,{
            headers:{
                'Content-Type':'application/json',
            },
        })
        console.log('resp dadewedew...',resp.data);
        localStorage.setItem('token',resp.data);
        localStorage.setItem("UserName", username); 
        navigate('/home');
      } catch (error) {
        console.log('error');
      } 
};

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row >
        <Col md={6} lg={4} xs={12} sm={6} xl={3} >
          <div  >
            <h2 className="mb-4" >Login</h2>
            <Form onSubmit={handleLogin} className="shadow p-5 bg-light rounded" style={{width:"30vw"}}>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100"  style={{marginTop:"5vh"}}>
                Login
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
