import React, { useState, useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X, Plus, Minus } from "lucide-react";
import { CartContext } from "../../context/Cart"; // Assuming you have a CartContext
import { FaUser } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [cartDetails, setCartDetails] = useState([]); // State to hold detailed cart info with calculated prices

  useEffect(() => {
    // Update cartDetails whenever the cart changes
    const updatedCartDetails = cart.map((item) => ({
      ...item,
      itemTotalPrice: (item.price * item.quantity).toFixed(2), // Use item.quantity
    }));
    setCartDetails(updatedCartDetails);
  }, [cart]);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 font-semibold"
      : "text-gray-700 hover:text-blue-500";

  const increaseQty = (id) => {
    updateQuantity(id, 1);
  };

  const decreaseQty = (id) => {
    const itemInCart = cart.find((item) => item.id === id);
    if (itemInCart && itemInCart.quantity > 1) { // Use item.quantity
      updateQuantity(id, -1);
    } else if (itemInCart && itemInCart.quantity === 1) { // Use item.quantity
      // If quantity is 1, clicking "-" should remove the item
      removeFromCart(id);
    }
  };

  const totalPrice = cart
    .reduce((total, item) => total + item.price * item.quantity, 0) // Use item.quantity
    .toFixed(2);
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0); // Use item.quantity

 

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">
            <NavLink to="/">E-commerce(Small Team❤️)</NavLink>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/home" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <NavLink to={'/account/cart'}>
              Cart
            </NavLink>
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 border border-gray-300 rounded-md"
            />

            <button
              onClick={() => setCartOpen(true)}
              className="text-gray-700 hover:text-blue-500 relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute mt-1 -top-5 left-2 bg-slate-400 w-[20px] h-[20px] rounded-full flex justify-center items-center text-white text-xs">
                {totalQuantity}
              </span>
            </button>
            <NavLink className={navLinkClass} to={'/account/favorite'}>
              <MdFavorite />
            </NavLink>
            <NavLink className={navLinkClass} to={'/account/dashboard'}>
              <FaUser />
            </NavLink>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3">
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search..."
                className="px-2 py-1 border border-gray-300 rounded-md w-full"
              />
              <button onClick={() => setCartOpen(true)}>
                <ShoppingCart className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-30"
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <div className="w-80 bg-white shadow-lg p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button onClick={() => setCartOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            {cartDetails.map((item) => (
              <div key={item.id} className="border-b py-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: ${item.itemTotalPrice}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decreaseQty(item.id)}>
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span>{item.quantity}</span> {/* Use item.quantity here */}
                    <button onClick={() => increaseQty(item.id)}>
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Total & Checkout */}
            <div className="mt-4">
              {cart.length > 0 ? (
                <>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                  <Link to="/checkout">
                    <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                      Checkout
                    </button>
                  </Link>
                </>
              ) : (
                <p>Your cart is empty.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;