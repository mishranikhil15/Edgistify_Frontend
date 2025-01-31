import React, { useEffect, useState } from "react";
import { List, Button, Typography, message, Input, Modal, Form } from "antd";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate(); // Use navigate hook
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!userId || !token) {
            message.error("User not logged in");
            return;
        }

        axiosInstance
            .get(`/cart/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => setCart(response.data))
            .catch((error) => message.error("Failed to fetch cart data"));
    }, [userId, token]);

    const handleCheckout = async () => {
        if (!userId || !token) {
            message.error("User not logged in");
            return;
        }

        if (!shippingAddress.trim()) {
            message.error("Please enter a shipping address.");
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post(
                `/orders/`,
                { userId, shippingAddress, paymentStatus: "Pending" },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            message.success(response.data.message || "Checkout successful!");
            setCart([]); // Clear cart UI after successful order
            form.resetFields(); // Reset form after successful checkout
            setIsModalVisible(false); // Close the modal

            // Redirect to Orders page after the checkout
            navigate(`/orders/${userId}`);
        } catch (error) {
            message.error(error.response?.data?.error || "Checkout failed. Try again.");
        }
        setLoading(false);
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <Typography.Title level={2}>Your Cart</Typography.Title>
            <List
                itemLayout="horizontal"
                dataSource={cart.products || []}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.productId.name}
                            description={`$${item.productId.price} x ${item.quantity}`}
                        />
                    </List.Item>
                )}
            />

            <Button 
                type="primary" 
                onClick={showModal} 
                disabled={!cart.products?.length || loading}
                loading={loading}
            >
                Checkout
            </Button>

            {/* Shipping Address Modal */}
            <Modal
                title="Enter Shipping Address"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleCheckout}
                okText="Checkout"
                cancelText="Cancel"
                confirmLoading={loading}
                centered
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Shipping Address" required>
                        <Input.TextArea 
                            rows={3} 
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)}
                            placeholder="Enter your shipping address"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CartPage;
