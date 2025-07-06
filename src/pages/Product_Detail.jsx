import React, { useContext } from "react";
import { useParams } from "react-router"; // ✅ correct import
import { items } from "../context/data";
import Products from "../components/Products";
import DataContext from "../context/DataContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(DataContext);

  const product = items.find((pro) => pro.id.toString() === id);

  // Handle product not found
  if (!product) {
    return (
      <div className="container my-5 text-center">
        <h2>❌ Product Not Found</h2>
        <p>Please go back and try another product.</p>
      </div>
    );
  }

  const relatedProducts = items.filter(
    (pro) =>
      pro.category.toLowerCase() === product.category.toLowerCase() &&
      pro.id !== product.id // Exclude current product
  );

  return (
    <>
      <div className="container my-5">
        <div className="product-detail-card shadow-lg p-4 rounded d-flex flex-column flex-md-row align-items-center gap-4">
          <div className="image-section text-center">
            <img
              src={product.imgSrc}
              alt={product.title}
              className="product-image img-fluid rounded"
              style={{ maxWidth: "300px", objectFit: "contain" }}
            />
          </div>
          <div className="info-section">
            <h2 className="product-title mb-3">{product.title}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price h5 mt-3 mb-4">
              ₹ {parseFloat(product.price).toFixed(2)}
            </p>
            <button
              onClick={() =>
                addToCart(
                  product.id,
                  product.title,
                  parseFloat(product.price),
                  product.imgSrc
                )
              }
              className="btn btn-primary btn-lg"
            >
              🛒 Add To Cart
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <>
          <h2 className="text-center my-5">Related Products</h2>
          <Products items={relatedProducts} />
        </>
      )}
    </>
  );
};

export default ProductDetail;
