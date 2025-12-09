import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <h1>Welcome to React Products App</h1>
        {user ? (
          <p className="lead">
            Hello, {user.name}! Explore your dashboard below.
          </p>
        ) : (
          <p className="lead">
            Please <Link to="/login">Login</Link> or{" "}
            <Link to="/register">Register</Link> to continue.
          </p>
        )}
      </div>

      {user && (
        <div className="row justify-content-center">
          <div className="col-md-4 mb-3">
            <Link to="/dashboard" className="text-decoration-none">
              <div className="card text-center h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Dashboard</h5>
                  <p className="card-text">View your personalized dashboard.</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </div>
            </Link>
          </div>

          <div className="col-md-4 mb-3">
            <Link to="/products" className="text-decoration-none">
              <div className="card text-center h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Products</h5>
                  <p className="card-text">Browse all available products.</p>
                  <button className="btn btn-primary">Go</button>
                </div>
              </div>
            </Link>
          </div>

          {user.role === "admin" && (
            <div className="col-md-4 mb-3">
              <Link to="/users" className="text-decoration-none">
                <div className="card text-center h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">User Management</h5>
                    <p className="card-text">Manage users and their roles.</p>
                    <button className="btn btn-primary">Go</button>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
