import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import * as productApi from "../api/productApi";

const Products = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await productApi.getAllProducts();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await productApi.deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="row">
          {products.length === 0 ? (
            <div className="col-12">
              <div className="alert alert-info text-center">
                No products available.
              </div>
            </div>
          ) : (
            products.map((p) => (
              <div key={p._id} className="col-md-4 mb-3">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{p.productName}</h5>
                    <p className="card-text">
                      Category: {p.category} <br />
                      SubCategory: {p.subCategory}
                    </p>
                    <Link
                      to={`/products/${p._id}`}
                      className="btn btn-sm btn-outline-primary me-2"
                    >
                      View
                    </Link>
                    {user.role === "admin" && (
                      <>
                        <Link
                          to={`/products/update/${p._id}`}
                          className="btn btn-sm btn-outline-success me-2"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
