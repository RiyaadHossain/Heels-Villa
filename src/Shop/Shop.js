import React, { useState, useEffect } from "react";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import { addToDB } from "../Utility/Utility";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [offer, setOffer] = useState({})

  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleAddToCart = (selectedProduct) => {
    let newCart = []
    const exist = cart.find(product => product.id === selectedProduct.id)
    if (!exist) {
      selectedProduct.quantity = 1
      newCart = [...cart, selectedProduct]
    } else {
      const rest = cart.filter(product => product.id !== selectedProduct.id)
      const newQuantity = selectedProduct.quantity + 1
      selectedProduct.quantity = newQuantity
      newCart = [...rest, exist]
    }
    setCart(newCart)
    addToDB(selectedProduct.id)
  };

  const handleClearCart = () => {
    setCart([])
  };

  const getOffer = products => {
    const randomNum = Math.floor(Math.random() * products.length)
    setOffer(products[randomNum])
  }

  return (
    <>
      <div className='shop'>
        <div className='products-container'>
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
        <div className='cart-container'>
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
