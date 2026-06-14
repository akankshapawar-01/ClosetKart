import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const changeQuantity = (id, quantity) => {
    const updated = cartItems.map(item =>
      item._id === id ? { ...item, quantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  const checkout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    } else {
      navigate('/order');
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">Your cart is empty!</h4>
          <button
            onClick={() => navigate('/')}
            className="btn mt-3 text-white"
            style={{ backgroundColor: '#830d6f' }}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map(item => (
              <CartItem
                key={item._id}
                item={item}
                onRemove={removeItem}
                onQuantityChange={changeQuantity}
              />
            ))}
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm p-4">
              <h4 className="fw-bold">Order Summary</h4>
              <hr />
              {cartItems.map(item => (
                <div key={item._id} className="d-flex justify-content-between mb-2">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <button
                onClick={checkout}
                className="btn w-100 text-white mt-3 fw-bold"
                style={{ backgroundColor: '#830d6f' }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;