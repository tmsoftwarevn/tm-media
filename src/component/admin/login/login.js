import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../../../scss/login.scss";

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const [show, setShow] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputUsername !== "admin" || inputPassword !== "admin") {
      setShow(true);
    }

  };

  return (
    <div className="sign-in__wrapper">
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <div className="h4 mb-5 text-center tm" >TM MEDIA</div>

        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Tài khoản hoặc mật khẩu không đúng
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
        
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Tài khoản"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Mật khẩu"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
       
          <Button className="w-100" variant="primary" type="submit">
            Đăng nhập
          </Button>
         
      </Form>
    
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by TM | &copy;
      </div>
    </div>
  );
};

export default Login;
