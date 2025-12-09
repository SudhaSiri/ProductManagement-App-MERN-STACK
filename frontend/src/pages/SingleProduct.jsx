import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as productApi from "../api/productApi";

const SingleProduct = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const data = await productApi.getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err?.response?.data?.error || "Failed to fetch product");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await productApi.deleteProduct(id);
      navigate("/products");
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  if (loading) return <div className="container mt-4">Loading...</div>;
  if (error)
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  if (!product) return null;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{product.productName}</h3>
          <p className="card-text">
            Category: {product.category} <br />
            SubCategory: {product.subCategory}
          </p>
          <Link to="/products" className="btn btn-secondary me-2">
            Back
          </Link>
          {user.role === "admin" && (
            <>
              <Link
                to={`/products/update/${product._id}`}
                className="btn btn-success me-2"
              >
                Edit
              </Link>
              <button onClick={handleDelete} className="btn btn-danger">
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
