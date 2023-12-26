import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [productData, setProductData] = useState([]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:4001/products/${id}`);
    const newProductData = productData.filter((product) => {
      return product.id !== id;
    });
    setProductData(newProductData);
  };

  const getProductdata = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setProductData(result.data.data);
    console.log(result);
  };

  useEffect(() => {
    getProductdata();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      {productData.map((product) => {
        return (
          <div className="product-list" key={product.id}>
            <div className="product">
              <div className="product-preview">
                <img
                  src={product.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {product.name}</h1>
                <h2>Product price: {product.price} Baht</h2>
                <p>Product description: {product.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  handleDelete(product.id);
                }}
              >
                x
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
