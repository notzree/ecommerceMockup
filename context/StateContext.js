import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const toggleCartItemQuantity = (id, values) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems;
    if (values === "inc") {
      newCartItems[index].quantity = newCartItems[index].quantity + 1;

      setCartItems(newCartItems);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (values === "dec") {
      if (foundProduct.quantity > 1) {
        newCartItems[index].quantity = newCartItems[index].quantity - 1;
        setCartItems(newCartItems);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => {
          if (prevTotalQuantities > 1) {
            prevTotalQuantities - 1;
          } else return;
        });
      }
    }
  };

  const deleteProduct = (product) => {
    const target = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice - target.price * target.quantity
    );
    setTotalQuantities((prevQty) => prevQty - target.quantity);
    setCartItems(newCartItems);
  };
  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item?._id === product._id
    );

    if (checkProductInCart) {
      //already know that product is in cart, just have to increment the quantity.
      const productIndex = cartItems.findIndex(
        (item) => item._id === checkProductInCart._id
      );
      const updatedCartItems = cartItems;
      updatedCartItems[productIndex].quantity =
        updatedCartItems[productIndex].quantity + 1;

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    toast.success(`${qty} ${product.name} added to cart`);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    if (qty - 1 < 1) {
      setQty(1);
    } else {
      setQty((prevQty) => prevQty - 1);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        deleteProduct,
        toggleCartItemQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
