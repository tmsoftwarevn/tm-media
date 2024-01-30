import React, { useState } from "react";
//import "../../../scss/login.scss";
import "../change pass/changePass.scss";
import { callLogin } from "../../../service/api";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { name, password } = values;
    let res = await callLogin(name, password);
    if (res && res.EC === 1) {
      navigate("/admin/baiviet");
      sessionStorage.setItem("Tm media", "login");
    } else {
      message.error("Tài khoản hoặc mật khẩu không đúng !");
    }
  };

  return (
    <div className="content-p">
      <div className="form-content">
        <div className="tm">TM MEDIA</div>
        <Form name="basic" onFinish={onFinish} autoComplete="off">
          <Form.Item
            labelCol={{ span: 24 }}
            name="name"
            label="Tên đăng nhập"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên!",
              },
            ]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 24 }}
            name="password"
            label="Mật khẩu"
            rules={[
              {
                required: true,
                message: "Nhập mật khẩu",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
