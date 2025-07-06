import React, { useContext } from "react";


import DataContext from "../context/DataContext";
import { Link } from "react-router";

const Cart = () => {
  const { cart, clearCart, removeFromCart, checkout } = useContext(DataContext);

 const getTotalPrice = () => {
  const total = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
  return total.toLocaleString("en-IN", { style: "currency", currency: "INR" });
};


  return (
    <div className="container my-5">
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h2 className="mb-3">🛒 Your Cart is Empty</h2>
          <Link to="/" className="btn btn-warning btn-lg">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-center mb-4">🛒 Your Cart</h2>
          <div className="row justify-content-center">
            {cart.map((product) => (
              <div key={product.id} className="col-lg-8 col-md-10 mb-4">
                <div className="card shadow-sm">
                  <div className="row g-0 align-items-center">
                    <div className="col-md-4 d-flex justify-content-center p-2">
                      <img
                        src={product.imgSrc}
                        alt={product.title}
                        className="img-fluid rounded"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text text-muted">{product.description}</p>
                        <p className="fw-bold mb-2">{product.price} ₹</p>
                        <div className="d-flex flex-wrap gap-2">
                          <button className="btn btn-success" onClick={() => alert("Proceed to Buy Now (implement your logic)")}>
                            Buy Now
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => removeFromCart(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total, Checkout & Clear Cart */}
          <div className="text-center my-5">
            <h4 className="mb-3">Total: ₹ {getTotalPrice()}</h4>
            <button className="btn btn-primary mx-2" onClick={checkout}>
              Proceed to Checkout
            </button>
            <button className="btn btn-danger mx-2" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
