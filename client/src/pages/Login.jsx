import { useState } from "react";
import API from "../services/api";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      console.log(res.data);
    } catch (error) {
      alert("Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        className="form-control mb-3"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        className="form-control mb-3"
        placeholder="Enter Password"
        onChange={handleChange}
      />

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}

export default Login;