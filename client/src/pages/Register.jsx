import { useState } from "react";
import API from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
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
        "/auth/register",
        formData
      );

      alert("Registration Successful");

      console.log(res.data);
    } catch (error) {
      alert("Registration Failed");
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>

      <input
        type="text"
        name="username"
        className="form-control mb-3"
        placeholder="Username"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        className="form-control mb-3"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        className="form-control mb-3"
        placeholder="Password"
        onChange={handleChange}
      />

      <button
        className="btn btn-success"
        onClick={handleSubmit}
      >
        Register
      </button>
    </div>
  );
}

export default Register;