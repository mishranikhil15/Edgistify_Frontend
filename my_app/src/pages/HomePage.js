import React from 'react';
import { Card, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const quotes = [
  "The future of business is in the supply chain.",
  "E-commerce is not the next big thing, it is the now big thing.",
  "In the world of e-commerce, customer experience is everything.",
  "Supply chain efficiency is the backbone of every successful business.",
  "A seamless supply chain can drive innovation and customer loyalty."
];

const Home = () => {
  return (
    <div style={{ padding: '50px' }}>
      <Typography.Title level={2}>Welcome to Our E-Commerce Platform</Typography.Title>
      <Row gutter={16}>
        {quotes.map((quote, index) => (
          <Col span={8} key={index}>
            <Card
              bordered={false}
              style={{ backgroundColor: '#f0f2f5', height: '200px' }}
              bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Text italic>{`"${quote}"`}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
