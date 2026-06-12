import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    alert("Logged Out");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link
        to="/"
        className="navbar-brand text-white text-decoration-none"
      >
        ShopEZ
      </Link>

      <div>
        <Link
          to="/cart"
          className="btn btn-warning me-2"
        >
          Cart
        </Link>

        <Link
          to="/orders"
          className="btn btn-info me-2"
        >
          Orders
        </Link>

        <Link
          to="/login"
          className="btn btn-outline-light me-2"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="btn btn-outline-light me-2"
        >
          Register
        </Link>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;