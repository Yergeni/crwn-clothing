import React from 'react';

import {
  CartItemContainer,
  ItemDetailsContainer,
  CartItemImage
} from './cart-item.styles';

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={imageUrl} alt='item' />
    <ItemDetailsContainer>
      <span>{name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

// Memoizing the cart items
export default React.memo(CartItem);
