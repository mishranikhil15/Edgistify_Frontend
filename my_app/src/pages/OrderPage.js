import React, { useEffect, useState } from 'react';
import { List, Button, Typography, message, Card } from 'antd';
import axiosInstance from '../api/axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) {
      message.error("User not logged in");
      return;
    }

    fetchOrders();
  }, [userId, token]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/orders/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error) {
      message.error("Failed to fetch orders");
    }
    setLoading(false);
  };

  const handlePayment = (orderId) => {
    // This is where you can implement payment processing or simulate it.
    message.success(`Payment for Order #${orderId} processed successfully.`);
    // Update payment status to 'Paid'
    axiosInstance
      .put(`/orders/${orderId}/payment`, { paymentStatus: "Paid" }, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        fetchOrders(); // Fetch updated orders after payment
      })
      .catch((error) => {
        message.error("Payment processing failed.");
      });
  };

  return (
    <div style={{ padding: '50px' }}>
      <Typography.Title level={2}>Your Orders</Typography.Title>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          dataSource={orders}
          renderItem={(order) => (
            <List.Item key={order._id}>
              <Card title={`Order #${order._id}`} bordered={false}>
                <p><strong>Total Price: </strong>${order.totalPrice}</p>
                <p><strong>Status: </strong>{order.orderStatus}</p>
                <p><strong>Shipping Address: </strong>{order.shippingAddress}</p>
                <Button 
                  type="primary" 
                  disabled={order.paymentStatus === 'Paid'} 
                  onClick={() => handlePayment(order._id)}
                >
                  Pay Now
                </Button>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default OrdersPage;
