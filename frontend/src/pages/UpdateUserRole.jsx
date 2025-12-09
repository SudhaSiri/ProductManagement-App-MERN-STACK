import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as userApi from "../api/userApi";

const UpdateUserRole = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const users = await userApi.getAllUsers();
        const user = users.find((u) => u._id === id);
        if (!user) throw new Error("User not found");
        setRole(user.role);
        setLoading(false);
      } catch (err) {
        setError(err?.response?.data?.error || err.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userApi.updateUserRole(id, role);
      navigate("/users");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to update role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update User Role</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Updating..." : "Update Role"}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateUserRole;
