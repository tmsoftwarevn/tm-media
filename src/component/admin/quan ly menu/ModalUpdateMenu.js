import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Modal, Row, message } from "antd";
import { callUpdateMenu, callUpdateSlugMedia } from "../../../service/api";
import { Await } from "react-router-dom";
import { convertSlug } from "../../../utils/convertSlug";
const UpdateMenu = (props) => {
  const {
    isModalUpdateMenu,
    setIsModalUpdateMenu,
    dataUpdate,
    fetchMenu_byId,
    fetchMenu_byId_layout
  } = props;
  const [active, setActive] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalUpdateMenu(false);
  };
  const onFinish = async (values) => {
    const { name } = values;
    
    fetchUpdateMenu(name, active);
  };
  useEffect(() => {
    form.resetFields();
    setActive(dataUpdate.active);
  }, [dataUpdate]);

  const onChangeActive = (e) => {
    if (e.target.checked) setActive(1);
    else setActive(0);
  };
  const fetchUpdateMenu = async (name, active) => {
    let res = await callUpdateMenu(dataUpdate?.id, name, active);
    let slug = convertSlug(name);
    if (res && res.EC === 1) {
      message.success("Cập nhật thành công");
      setIsModalUpdateMenu(false);
      fetchMenu_byId();
      fetchMenu_byId_layout();

      let updateSlug = await callUpdateSlugMedia(slug, dataUpdate?.id, name)
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
            <Col span={24}>
              <Checkbox
                checked={+active === 1 ? true : false}
                onChange={onChangeActive}
              >
                Hiện
              </Checkbox>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateMenu;
