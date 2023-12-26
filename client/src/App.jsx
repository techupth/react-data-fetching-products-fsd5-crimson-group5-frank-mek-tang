import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    const result = await axios.get("http://localhost:4001/products");
    // console.log(result); เอาไว้เช็คค่า result ก่อน setProduct
    setProduct(result.data.data);
  };

  const delProduct = async (index) => {
    await axios.delete(`http://localhost:4001/products/${index}`);
    // const result = product.filter((item) => {
    //   return item.id !== id;
    // });
    // setProduct(result);
  };

  useEffect(() => {
    getProduct();
  }, [product]);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {product.map((item) => {
          return (
            <div className="product" key={item.id}>
              <div className="product-preview">
                <img
                  src={item.image}
                  alt="some product"
                  width="350"
                  height="350"
                />
              </div>
              <div className="product-detail">
                <h1>Product name: {item.name}</h1>
                <h2>Product price: {item.price}</h2>
                <p>Product description: {item.description}</p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  delProduct(item.id);
                }}
              >
                x
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
