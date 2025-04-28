import React, { useContext, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { CartContext } from "../../context/Cart";

function PayPalCheckout() {
  const [disable, setDisable] = useState(false); // Disable button while processing payment
  const { grandTotal } = useContext(CartContext); // Get grandTotal from context

  return (
    <div className="pt-4">
      <PayPalScriptProvider
        options={{
          "client-id": "ATV771yqVEmAlwfQCHSNeotoDIxt0KIY48en4HUzQGeFa6deONfiFQ-0DwLgA25W8dDqHXOwPAegr4QG",
          components: "buttons",
        }}
      >
        <PayPalButtons
          style={{ layout: "vertical" }}
          disabled={disable} // ✅ Disable button while processing
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: grandTotal(), // ✅ no () call
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            try {
              setDisable(true); // ✅ Disable while capturing
              const details = await actions.order.capture();
              console.log("Transaction completed by", details.payer.name.given_name);

              // You can pass real details if needed
            //   await saveOrder(details, "paid");
                // alert("Transaction completed successfully!");
    
                // Optionally, redirect to a thank you page or show a success message
            } catch (err) {
              console.error("Capture error", err);
              alert("Something went wrong during payment capture.");
            } finally {
              setDisable(false); // Always re-enable
            }
          }}
          onError={(err) => {
            console.error("PayPal error", err);
            alert("PayPal Checkout failed. Please try again.");
            setDisable(false); // Re-enable button
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}

export default PayPalCheckout;
