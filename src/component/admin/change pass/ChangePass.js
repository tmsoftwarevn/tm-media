import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./changePass.scss";
import { callChangePass } from "../../../service/api";
import { useNavigate } from "react-router-dom";


const ChangePass = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const res = await callChangePass(values.name, values.oldpass, values.newpass);
    if (res && res.data) {
      message.success("Đổi mật khẩu thành công");
      //navigate("/admin/lienhe")
    } else if (res && res.message) {
      message.error("Tài khoản hoặc mật khẩu không đúng");
    }
  };
  return (
    <>
      <div className="content-p">
        <div className="form-content">
          <Button
            type="primary"
            className="admin"
            onClick={() => navigate("/admin/lienhe")}
          >
            Về trang admin
          </Button>
          <Form name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }}
              name="name"
              label="Tên đăng nhập"
              // requiredMark={"optional"} // off star form
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
              name="oldpass"
              label="Mật khẩu cũ"
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu cũ",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu cũ" />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              name="newpass"
              label="Mật khẩu mới"
              rules={[
                {
                  required: true,
                  message: "Nhập mật khẩu mới",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu mới" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};
export default ChangePass;
