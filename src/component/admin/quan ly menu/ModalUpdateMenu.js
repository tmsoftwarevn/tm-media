import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import { callUpdateMenu } from "../../../service/api";
import { Await } from "react-router-dom";
const UpdateMenu = (props) => {
  const { isModalUpdateMenu, setIsModalUpdateMenu, dataUpdate ,fetchMenu_byId} = props;

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalUpdateMenu(false);
  };
  const onFinish = async (values) => {
    const {name} = values;
    fetchUpdateMenu(name);
  };
  useEffect(() => {
    form.resetFields();
  }, [dataUpdate]);

  const fetchUpdateMenu = async (name) => {
    let res = await callUpdateMenu(dataUpdate?.id, name);
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      setIsModalUpdateMenu(false);
      fetchMenu_byId(); 
    } else {
      message.error("Cập nhật thất bại ");
    }
  };

  return (
    <>
      <Modal
        title="Cập nhật tên Menu"
        open={isModalUpdateMenu}
        onOk={() => {
          form.submit();
        }}
        okText="Cập nhật"
        onCancel={handleCancel}
        maskClosable={false}
        forceRender
      >
        <Form name="basic" onFinish={onFinish} autoComplete="off" form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Tên không được để trống !",
                  },
                ]}
                initialValue={dataUpdate.name}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateMenu;
