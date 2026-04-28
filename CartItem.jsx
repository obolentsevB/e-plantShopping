import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Function to calculate the total amount for all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      // Ensure we are working with numbers to prevent string concatenation
      const itemCost = Number(item.cost);
      return total + (itemCost * item.quantity);
    }, 0);
  };

  // Function to calculate the total cost for an individual plant type
  const calculateTotalCost = (item) => {
    return Number(item.cost) * item.quantity;
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // If quantity would reach zero, remove the item entirely
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Improved, more descriptive alert message for the Checkout button
  const handleCheckoutShopping = (e) => {
    alert('Thank you for your interest in Paradise Nursery! The Checkout feature is currently under development and will be available in a future release. Please continue browsing our wonderful collection!');
  };

  const handleContinueShopping = (e) => {
    // Prevents potential page reload and calls the parent function
    e.preventDefault();
    onContinueShopping();
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">Unit Price: ${item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                    className="cart-item-button cart-item-button-dec" 
                    onClick={() => handleDecrement(item)}
                >
                    -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                    className="cart-item-button cart-item-button-inc" 
                    onClick={() => handleIncrement(item)}
                >
                    +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
