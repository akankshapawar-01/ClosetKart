const Footer = () => {
  return (
    <footer className="text-white py-4 mt-5" style={{ backgroundColor: '#830d6f' }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">🛍️ ClosetKart</h5>
            <p className="text-white-50">Trendy clothes for Men, Women & Kids</p>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white-50 text-decoration-none">Home</a></li>
              <li><a href="/cart" className="text-white-50 text-decoration-none">Cart</a></li>
              <li><a href="/login" className="text-white-50 text-decoration-none">Login</a></li>
              <li><a href="/register" className="text-white-50 text-decoration-none">Register</a></li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h6 className="fw-bold">Categories</h6>
            <ul className="list-unstyled">
              <li className="text-white-50">Men</li>
              <li className="text-white-50">Women</li>
              <li className="text-white-50">Kids</li>
            </ul>
          </div>
        </div>
        <hr className="border-light" />
        <p className="text-center text-white-50 mb-0">© 2026 ClosetKart. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;