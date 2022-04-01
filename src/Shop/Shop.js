import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { addToDB, getDB, removeDB } from "../Utility/Utility";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [offer, setOffer] = useState({});

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedItemId = getDB();
    let addItToCart = [];
    for (const id in storedItemId) {
      const savedProduct = products.find((product) => product.id === id);
      const quantity = storedItemId[id]
      if (savedProduct) { /* Check - weather the savedProduct is exits or not. If it does't exist, we cannot set quantity. [it'll throw an error] */
        savedProduct.quantity = quantity
        addItToCart.push(savedProduct)
      }
    }
    setCart(addItToCart);
  }, [products]);

  const handleAddToCart = (selectedProduct) => {
    let newCart = [];
    const exist = cart.find((product) => product.id === selectedProduct.id);
    if (!exist) {
      selectedProduct.quantity = 1;
      newCart = [...cart, selectedProduct];
    } else {
      const rest = cart.filter((product) => product.id !== selectedProduct.id);
      const newQuantity = selectedProduct.quantity + 1;
      selectedProduct.quantity = newQuantity;
      newCart = [...rest, exist];
    }
    setCart(newCart);
    addToDB(selectedProduct.id);
  };

  const handleClearCart = () => {
    setCart([]);
    setOffer([])
    removeDB()
  };

  const getOffer = (products) => {
    const randomNum = Math.floor(Math.random() * products.length);
    setOffer(products[randomNum]);
  };

  return (
    <>
      <div className="shop">
        <div className="products-container">
          {products.map((product, index) => {
            return (
              <Product
                key={index}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
        <div className="cart-container">
          <Cart
            cart={cart}
            offer={offer}
            products={products}
            getOffer={getOffer}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </>
  );
};

export default Shop;
