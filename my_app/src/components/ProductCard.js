import React from 'react';
import { Card, Button } from 'antd';

const { Meta } = Card;

const ProductCard = ({ product, addToCart }) => (
  <Card
    hoverable
    cover={<img alt={product.name} src={product.image} />}
    actions={[<Button type="primary" onClick={() => addToCart(product)}>Add to Cart</Button>]}
  >
    <Meta title={product.name} description={`$${product.price}`} />
  </Card>
);

export default ProductCard;
