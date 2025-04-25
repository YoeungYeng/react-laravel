import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartContext } from "../../context/Cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart,removeFromCart, updateQuantity } = useContext(CartContext); // Get cart items from context
  const [orderSummaryItems, setOrderSummaryItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0.00");

  const increaseQty = (id) => {
    updateQuantity(id, 1);
  };

  const decreaseQty = (id) => {
    const itemInCart = cart.find((item) => item.id === id);
    if (itemInCart && itemInCart.quantity > 1) {
      updateQuantity(id, -1);
    } else if (itemInCart && itemInCart.quantity === 1) {
      // If quantity is 1, clicking "-" should remove the item
      removeFromCart(id);
    }
  };

  const handleRemoveIfEmpty = (id) => {
    const itemToRemove = cart.find((item) => item.id === id);
    if (itemToRemove && itemToRemove.quantity <= 0) {
      removeFromCart(id);
    }
  };

  useEffect(() => {
    // Map and summarize each item in the cart
    const summaryItems = cart.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: (item.price * item.quantity).toFixed(2),
    }));
    setOrderSummaryItems(summaryItems);

    const newTotalPrice = cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
    setTotalPrice(newTotalPrice);
  }, [cart]);

  return (
    <>
      <Navbar />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 h-full min-h-screen">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl space-y-6">
              {cart.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">Your cart is empty.</p>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                  >
                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                      <a href="#" className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20 dark:hidden"
                          src={item.image}
                          alt={item.name}
                        />
                        <img
                          className="hidden h-20 w-20 dark:block"
                          src={item.imageDark || item.image}
                          alt={item.name}
                        />
                      </a>

                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <input
                            type="text"
                            readOnly
                            className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 dark:text-white"
                            value={item.quantity}
                          />
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <p className="text-base font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-4">
                          <button onClick={() => increaseQty(item.id)}  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            ❤️ Add 
                          </button>
                          <button onClick={() => decreaseQty(item.id)}  className="text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                            ❌ Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Summary */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order summary
                </p>

                <div className="space-y-4">
                  {orderSummaryItems.map((item, index) => (
                    <dl
                      key={index}
                      className="flex items-center justify-between gap-4"
                    >
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        {item.name} × {item.quantity}
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${item.total}
                      </dd>
                    </dl>
                  ))}

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                      Total
                    </dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                      ${totalPrice}
                    </dd>
                  </dl>
                </div>

                <Link
                  to={"/checkout"}
                  className="flex w-full hover:bg-slate-300 hover:text-black items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Proceed to  Checkout
                </Link>

               
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Cart;
