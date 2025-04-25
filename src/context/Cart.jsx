import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const addToCart = (product) => {
    let updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex((item) => item.id === product.id);
  
    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({
        id: product.id,
        product_id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }
  
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, change) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const shipping = () => {
    return 0;
  };

  const subTotal = () => {
    let subTotal = 0;
    cart.forEach((item) => {
      // Using forEach for clarity
      subTotal += item.quantity * item.price;
    });
    return subTotal;
  };

  // grand total
  const grandTotal = () => {
    return subTotal() + shipping();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        shipping,
        subTotal,
        grandTotal,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
