import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/Cart.jsx";
import { AuthUserProvider } from "./context/AuthUser.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AuthUserProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthUserProvider>
    </AuthProvider>
  </StrictMode>
);
