import React from 'react';
import { List, Button } from 'antd';

const CartItem = ({ item }) => (
  <List.Item
    actions={[<Button type="danger">Remove</Button>]}
  >
    <List.Item.Meta
      title={item.name}
      description={`Price: $${item.price} | Quantity: ${item.quantity}`}
    />
  </List.Item>
);

export default CartItem;
