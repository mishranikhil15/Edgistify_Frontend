import React, { useState } from "react";
import { Form, Input, Button, message, Divider } from "antd";
import { useNavigate } from "react-router-dom";  
import axiosInstance from "../api/axios";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", values);
      
      if (response.data && response.data.userId && response.data.token) {
        localStorage.setItem("userId", response.data.userId); // Store userId
        localStorage.setItem("token", response.data.token);   // Store token
        message.success("Login successful!");
        navigate("/");  
      } else {
        message.error("Invalid response from server");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Login failed!");
    }
    setLoading(false);
  };

  return (
    <div>
      <Form name="login" onFinish={onFinish} layout="vertical">
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
      
      <Divider />

      <div>
        Don't have an account? 
        <Button type="link" onClick={() => navigate("/register")}>Sign Up</Button>
      </div>
    </div>
  );
};

export default LoginPage;
