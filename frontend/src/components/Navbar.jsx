import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#830d6f" }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold fs-4" to="/">
          🛍️ ClosetKart
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link to="/cart" className="text-white text-decoration-none">
            🛒 Cart
          </Link>
          {user ? (
            <>
              {user.isAdmin && (
                <Link to="/admin" className="text-white text-decoration-none">
                  👑 Admin
                </Link>
              )}
              <Link to="/profile" className="text-white text-decoration-none">
                👤 {user.name}
              </Link>
              <button
                onClick={logout}
                className="btn btn-outline-light btn-sm px-3"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-white text-decoration-none">
              👤 Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;