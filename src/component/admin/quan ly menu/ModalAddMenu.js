import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row, message } from "antd";
import {
  callAddMedia,
  callAddMenu,
  callAddVideoNoibat,
} from "../../../service/api";
import { useParams } from "react-router-dom";
import { convertSlug } from "../../../utils/convertSlug";

const AddMenu = (props) => {
  const {
    isModalAddMenu,
    setIsModalAddMenu,
    fetchMenu_byId,
    fetchMenu_byId_layout,
  } = props;
  const params = useParams();
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalAddMenu(false);
  };
  const onFinish = (values) => {
    const { name } = values;
    fetchAddMenu(name);
    form.resetFields();
  };

  const fetchAddMenu = async (name) => {
    let res = await callAddMenu(name, params.id);
    if (res && res.EC === 1) {
      // thêm media khi tạo menu, để update
      let slug = convertSlug(name)
      const add = await callAddMedia(res.data.id, "", "", "", "", "", "",slug,name);

      message.success("Thêm thành công");
      setIsModalAddMenu(false);
      fetchMenu_byId();
      fetchMenu_byId_layout();
    } else {
      message.error("Thêm thất bại ");
    }
  };

  return (
    <>
      <Modal
        title="Thêm tên Menu"
        open={isModalAddMenu}
        onOk={() => {
          form.submit();
        }}
        okText="Thêm mới"
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
export default AddMenu;
