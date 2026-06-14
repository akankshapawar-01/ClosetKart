import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h6 className="card-title fw-bold">{product.name}</h6>
        <p className="text-muted small mb-1">{product.category}</p>
        <p className="fw-bold text-dark">₹{product.price}</p>
        <Link to={`/product/${product._id}`} className="mt-auto">
          <button className="btn btn-sm w-100" style={{ backgroundColor: '#830d6f', color: 'white' }}>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;