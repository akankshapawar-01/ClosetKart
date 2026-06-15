import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const Order = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) { navigate('/login'); return; }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems.map(item => ({
            name: item.name,
            quantity: item.quantity,
            image: item.image,
            price: item.price,
            product: item._id,
          })),
          shippingAddress: { address, city, postalCode, country },
          totalPrice,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        localStorage.removeItem('cart');
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  if (success) return (
    <div className="container text-center py-5">
      <div className="card shadow-sm p-5 mx-auto" style={{ maxWidth: '500px' }}>
        <h1>🎉 Order Placed!</h1>
        <p className="text-muted">Your order has been placed successfully!</p>
        <button
          onClick={() => navigate('/')}
          className="btn text-white mt-3"
          style={{ backgroundColor: '#830d6f' }}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">📦 Place Order</h2>
      <div className="row g-4">

        {/* Shipping Form */}
        <div className="col-md-7">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-3">🚚 Shipping Address</h4>
            <div className="mb-3">
              <label className="form-label fw-bold">Address</label>
              <input
                className="form-control"
                placeholder='Enter address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">City</label>
              <input
                className="form-control"
                placeholder='Enter city'
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Postal Code</label>
              <input
                className="form-control"
                placeholder='Enter postal code'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Country</label>
              <input
                className="form-control"
                placeholder='Enter country'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-3">🧾 Order Summary</h4>
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
              onClick={placeOrder}
              className="btn w-100 text-white mt-3 fw-bold"
              style={{ backgroundColor: '#830d6f' }}
            >
              Place Order 🛒
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Order;