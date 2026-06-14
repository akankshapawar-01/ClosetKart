const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body d-flex align-items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-1">{item.name}</h6>
          <p className="text-muted mb-0">₹{item.price}</p>
        </div>
        <select
          value={item.quantity}
          onChange={(e) => onQuantityChange(item._id, Number(e.target.value))}
          className="form-select w-auto"
        >
          {[1, 2, 3, 4, 5].map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
        <button
          onClick={() => onRemove(item._id)}
          className="btn btn-danger btn-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;