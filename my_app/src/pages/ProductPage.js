import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, message } from 'antd';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import axiosInstance from '../api/axios';

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/products');
            setProducts(response.data);
        } catch (error) {
            message.error('Failed to fetch products');
        }
        setLoading(false);
    };

    const addToCart = async (product) => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        if (!userId || !token) {
            message.error("Please log in to add products to the cart");
            return;
        }

        try {
            await axiosInstance.post(
                "/cart/",
                { userId, productId: product._id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            message.success(`${product.name} added to cart!`);
        } catch (error) {
            console.error("Error adding to cart:", error.response?.data);
            message.error(error.response?.data?.error || "Failed to add product to cart");
        }
    };

    return (
        <div style={{ padding: '50px' }}>
            <h2>Our Products</h2>
            {loading ? (
                <Spin size="large" />
            ) : (
                <Row gutter={[16, 16]}>
                    {products.map((product) => (
                        <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                            <ProductCard product={product} addToCart={addToCart} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default ProductPage;
