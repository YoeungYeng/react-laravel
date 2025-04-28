import React, { useState, useContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { CartContext } from "../../context/Cart";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "../../component/htpds";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; // Import PayPal SDK
import PayPalCheckout from "../components/PayPalCheckout";

function Checkout() {
  const { cart, subTotal, grandTotal, shipping } = useContext(CartContext);
  const [disable, setDisable] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card"); // Track payment method
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const processOrder = async (data) => {
    if (paymentMethod === "credit_card") {
      await saveOrder(data, "no paid");
    }
  };

  const saveOrder = async (formData, paymentStatus) => {
    try {
      const newFormData = {
        ...formData,
        grand_total: grandTotal(),
        shipping: shipping(),
        subTotal: subTotal(),
        discount: 0,
        payment_status: paymentStatus,
        status: "pending",
        cart,
      };

      setDisable(true);

      const response = await fetch(`${apiUrl}/saveorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
        body: JSON.stringify(newFormData),
        credentials: "include",
      });

      const result = await response.json();
      setDisable(false);

      if (result.status === 200) {
        toast.success("Order placed successfully!");
        navigate(`/account/thankorder/${result.data.id}`);
      } else {
        toast.error(result.message || "Failed to place order.");
      }
      
    } catch (error) {
      setDisable(false);
      console.error("Submission Error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit(processOrder)}>
        <div
          className="bg-gray-100 py-10"
          style={{
            backgroundImage: "linear-gradient(to right, #243949 0%, #517fa4 100%)",
          }}
        >
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

            {/* Shipping Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Name" name="name" register={register} required error={errors.name} />
                <InputField label="E-mail" name="email" type="email" register={register} required error={errors.email} />
                <InputField label="Address" name="address" register={register} required error={errors.address} />
                <InputField label="City" name="city" register={register} required error={errors.city} />
                <InputField label="State / Province" name="province" register={register} required error={errors.province} />
                <InputField label="Zip / Postal Code" name="zip" register={register} required error={errors.zip} />
                <div className="md:col-span-2">
                  <InputField label="Mobile" name="mobile" register={register} required error={errors.mobile} />
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Payment Information</h2>
              <div className="space-y-3">
                {/* Choose Payment Method */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Payment Method
                  </label>
                  <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                {/* PayPal Button */}
                {paymentMethod === "paypal" && (
                  <div className="pt-4">
                    <PayPalCheckout>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [{ amount: { value: grandTotal().toString() } }],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then(async function (details) {
                            toast.success(`Transaction completed by ${details.payer.name.given_name}`);
                            const formData = {}; // Collect necessary form data here if needed
                            await saveOrder(formData, "paid");
                          });
                        }}
                        onError={(err) => {
                          console.error(err);
                          toast.error("PayPal Checkout failed. Try again.");
                        }}
                      />
                    </PayPalCheckout>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-6 border-t pt-6">
              <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
              <ul>
                <SummaryItem label="Sub Total" value={`$${subTotal()}`} />
                <SummaryItem label="Shipping" value={`$${shipping()}`} />
                <SummaryItem label="Total" value={`$${grandTotal()}`} />
              </ul>
            </div>

            {/* Submit Button (Only for Credit Card) */}
            {paymentMethod === "credit_card" && (
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded w-full ${disable ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={disable}
              >
                {disable ? "Placing Order..." : "Place Order"}
              </button>
            )}
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}

// Reusable input component
const InputField = ({ label, name, type = "text", register, required, error, placeholder = "" }) => (
  <div>
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      {...(register ? register(name, required ? { required: `${label} is required` } : {}) : {})}
      className="shadow border rounded w-full py-2 px-3 text-gray-700"
    />
    {error && <p className="text-red-500 text-xs mt-2">{error.message}</p>}
  </div>
);

// Summary item component
const SummaryItem = ({ label, value }) => (
  <li className="flex justify-between font-semibold py-2 border-t mt-2">
    <span>{label}</span>
    <span>{value}</span>
  </li>
);

export default Checkout;
