import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = category === 'All'
    ? products
    : products.filter(p => p.category === category);

  if (loading) return <Loader />;

  return (
    <div>
      {/* Hero Section */}
      <div style={{ backgroundColor: '#830d6f' }} className="text-white text-center py-5 mb-4">
        <h1 className="fw-bold">👗 Welcome to ClosetKart</h1>
        <p className="fs-5">Trendy clothes for Men, Women & Kids</p>
      </div>

      <div className="container">
        {/* Category Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          {['All', 'Men', 'Women', 'Kids'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`btn rounded-pill px-4 ${category === cat ? 'btn-dark' : 'btn-outline-dark'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {filteredProducts.length === 0 ? (
            <p className="text-center">No products found!</p>
          ) : (
            filteredProducts.map(product => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;