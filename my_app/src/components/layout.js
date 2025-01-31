import React from 'react';
import { Layout as AntLayout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content, Footer } = AntLayout;

const Layout = ({ children }) => {
  return (
    <AntLayout>
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          <Menu.Item key="2"><Link to="/products">Products</Link></Menu.Item>
          <Menu.Item key="3"><Link to="/cart">Cart</Link></Menu.Item>
          <Menu.Item key="4"><Link to="/login">Login</Link></Menu.Item>
          <Menu.Item key="5"><Link to="/register">Register</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/orders">Orders</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>E-Commerce App ©2025</Footer>
    </AntLayout>
  );
};

export default Layout;
