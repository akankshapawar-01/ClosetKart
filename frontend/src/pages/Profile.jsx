import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      navigate('/login');
    } else {
      setUser(userData);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm p-4">
            <div className="text-center mb-4">
              <div className="rounded-circle d-inline-flex align-items-center justify-content-center text-white fw-bold fs-1 mb-3"
                style={{ width: '80px', height: '80px', backgroundColor: '#830d6f' }}>
                {user.name.charAt(0).toUpperCase()}
              </div>
              <h3 className="fw-bold">{user.name}</h3>
              {user.isAdmin && (
                <span className="badge" style={{ backgroundColor: '#830d6f' }}>
                  👑 Admin
                </span>
              )}
            </div>

            <hr />

            <div className="mb-3">
              <label className="text-muted small">Name</label>
              <p className="fw-bold">{user.name}</p>
            </div>

            <div className="mb-3">
              <label className="text-muted small">Email</label>
              <p className="fw-bold">{user.email}</p>
            </div>

            <div className="mb-3">
              <label className="text-muted small">Role</label>
              <p className="fw-bold">{user.isAdmin ? 'Admin' : '👤 User'}</p>
            </div>

            <hr />

            <button
              onClick={logout}
              className="btn w-100 text-white fw-bold"
              style={{ backgroundColor: '#830d6f' }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;