import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";  
import axiosInstance from "../api/axios";

const RegistrationPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axiosInstance.post("/users/register", values); 
      message.success("Registration successful!");
      navigate("/login"); 
    } catch (error) {
      message.error("Registration failed!");
    }
    setLoading(false);
  };

  return (
    <Form name="register" onFinish={onFinish} layout="vertical">
      <Form.Item label="Full Name" name="fullName" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationPage;
