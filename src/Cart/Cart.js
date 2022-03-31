import "./Cart.css";
import { IoTrashBin } from "react-icons/io5";
import { useEffect, useState } from "react";

const Cart = ({ cart, products, handleClearCart, getOffer, offer }) => {
  const [freeItem, setFreeItem] = useState(false);
  useEffect(() => {
    if (cart.length) { /* We set this Condition Checking in the useEffect Hook to prevent rendering many times. - a Bug */
      setFreeItem(true);
    } else {
      setFreeItem(false);
    }
  }, [cart]);
  return (
    <div className="cart">
      <div className="cart-header">
        <h1>Order Summery</h1>
        <button
          onClick={handleClearCart}
          className="remove-button"
          title="Clear Cart"
        >
          <IoTrashBin color="white" size={20} />
        </button>
      </div>
      {cart.map((product, index) => (
        <div key={index} className="cart-item">
          <img src={product.pairImage} alt="" />
          <div>
            <p>
              {product.name} {product.color}
            </p>
            <p>$ {product.price}</p>
          </div>
        </div>
      ))}
      <small>Buy One Get 1 Free*</small>
      <button
        onClick={() => getOffer(products)}
        className={freeItem ? "offer-button" : "offer-button-disabled"}
        disabled={!freeItem ? true : false}
      >
        {" "}
        {/* Here, freeItme is false by default. So, we set it [not(!)false = true] to achieve the Condition */}
        Get One For Me
      </button>
      {Object.keys(offer).length !== 0 && (
        <div className="cart-item">
          <img src={offer.pairImage} alt="" />
          <div>
            <p>
              {offer.name} {offer.color}
            </p>
            <p>$ {offer.price}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
