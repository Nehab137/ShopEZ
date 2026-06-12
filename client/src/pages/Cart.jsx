import { useEffect, useState } from "react";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCartItems(res.data.cartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await API.delete(`/cart/${id}`);

      alert("Item Removed Successfully");

      fetchCart();
    } catch (error) {
      console.log(error);
      alert("Failed To Remove Item");
    }
  };

  const placeOrder = async () => {
    try {
      const userId = cartItems[0].userId._id;

      const products = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      const totalAmount = cartItems.reduce(
        (sum, item) =>
          sum + item.productId.price * item.quantity,
        0
      );

      await API.post("/orders", {
        userId,
        products,
        totalAmount,
      });

      alert("Order Placed Successfully");

      fetchCart();
    } catch (error) {
      console.log(error);
      alert("Failed To Place Order");
    }
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + item.productId.price * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">
          Your Cart is Empty 🛒
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="card shadow p-3 mb-3"
            >
              <h4>{item.productId.title}</h4>

              <p>
                <strong>Price:</strong> ₹{" "}
                {item.productId.price}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {item.quantity}
              </p>

              <button
                className="btn btn-danger"
                onClick={() =>
                  removeFromCart(item._id)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="card p-3 shadow">
            <h3>Total: ₹ {total}</h3>

            <button
              className="btn btn-success mt-2"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;