import { useEffect, useState } from "react";
import API from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const userId = "6a2ae9153b2d167392a719df";

      await API.post("/cart", {
        userId,
        productId,
        quantity: 1,
      });

      alert("Added To Cart Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed To Add To Cart");
    }
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Welcome to ShopEZ 🛒
      </h2>

      <div className="text-center mb-4">
        <button
          className="btn btn-dark me-2"
          onClick={() => setSelectedCategory("All")}
        >
          All
        </button>

        <button
          className="btn btn-outline-dark me-2"
          onClick={() =>
            setSelectedCategory("Electronics")
          }
        >
          Electronics
        </button>

        <button
          className="btn btn-outline-dark me-2"
          onClick={() =>
            setSelectedCategory("Fashion")
          }
        >
          Fashion
        </button>

        <button
          className="btn btn-outline-dark me-2"
          onClick={() =>
            setSelectedCategory("Kitchen")
          }
        >
          Kitchen
        </button>

        <button
          className="btn btn-outline-dark"
          onClick={() =>
            setSelectedCategory("Home")
          }
        >
          Home
        </button>
      </div>

      <div className="row">
        {filteredProducts.map((product) => (
          <div
            className="col-md-4 mb-4"
            key={product._id}
          >
            <div className="card shadow h-100">

              <img
                src={product.image}
                alt={product.title}
                className="card-img-top"
                style={{
                  height: "250px",
                  objectFit: "cover",
                }}
              />

              <div className="card-body">
                <h4>{product.title}</h4>

                <p>{product.description}</p>

                <p>
                  <strong>Category:</strong>{" "}
                  {product.category}
                </p>

                <h5>₹ {product.price}</h5>

                <button
                  className="btn btn-primary w-100"
                  onClick={() =>
                    addToCart(product._id)
                  }
                >
                  Add To Cart
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;