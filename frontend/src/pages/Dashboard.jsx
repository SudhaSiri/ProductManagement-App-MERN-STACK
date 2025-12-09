import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <p>
        Welcome back, <strong>{user.name}</strong>!
      </p>

      <div className="row">
        <div className="col-md-4 mb-3">
          <Link to="/products" className="text-decoration-none">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Products</h5>
                <p className="card-text">View all products.</p>
                <button className="btn btn-outline-primary">Go</button>
              </div>
            </div>
          </Link>
        </div>

        {user.role === "admin" && (
          <>
            <div className="col-md-4 mb-3">
              <Link to="/products/add" className="text-decoration-none">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">Add Product</h5>
                    <p className="card-text">Create new products.</p>
                    <button className="btn btn-outline-success">Go</button>
                  </div>
                </div>
              </Link>
            </div>

            <div className="col-md-4 mb-3">
              <Link to="/users" className="text-decoration-none">
                <div className="card shadow-sm h-100">
                  <div className="card-body text-center">
                    <h5 className="card-title">Users</h5>
                    <p className="card-text">Manage users and roles.</p>
                    <button className="btn btn-outline-warning">Go</button>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
