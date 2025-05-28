import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Categorie from "./pages/Categorie";
import Brand from "./pages/Brand";
import User from "./pages/User";
// -----------------------------------------
import Proudcts from "./pages/Proudcts";
import { default as CreateProduct } from "./products/Create";
// -----------------------------------------
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { default as AccountLogin } from "./fronted/page/Login";
import { default as AccountRegister } from "./fronted/page/Register";
import { default as Order } from "./fronted/page/Orders";
import { AdminRequireAuth } from "./context/AdminRequireAuth";
import Create from "./cantories/Create";
import { ToastContainer } from "react-toastify";
import { default as EditCategory } from "./cantories/Edit";
import { default as EditProduct } from "./products/Edit";
// brands
import { default as EditBrand } from "./branches/Edit";
import { default as CreateBrand } from "./branches/Create";
import Home from "./fronted/page/Home";
import About from "./fronted/page/About";
import { UserRequireAuth } from "./context/UserRequirment";
import ConfirmThank from "./fronted/page/ConfirmThank";
import Contact from "./fronted/page/Contact";
import Shop from "./fronted/page/Shop";
import ProductDetail from "./fronted/page/ProductDetail";
import Checkout from "./fronted/page/Checkout";
import Profile from "./fronted/page/Profile";
import Cart from "./fronted/page/Cart";
import OrderDetail from "./orders/OrderDetail";
import Payment from "./fronted/page/Payment";
import ChangePassword from "./fronted/page/ChangePassword";
import Favorite from "./fronted/page/Favorite";
import { default as  ShowSlides} from "./pages/Slides";
import { default as CreateSlides } from "./slides/Create";
import { default as UpdateSlides } from "./slides/Update";
import Setting from "./pages/Setting";
import Footer from "./pages/Footer";
import { default as CreatFooter } from "./footer/Create";
function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* fronted */}
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* page details */}
          <Route path="/product/:id" element={<ProductDetail />} />
          {/* check out page */}
          <Route
            path="/checkout"
            element={
              <UserRequireAuth>
                <Checkout />
              </UserRequireAuth>
            }
          />
          {/* thank you */}
          <Route
            path="/account/thankorder/:id"
            element={
              <UserRequireAuth>
                <ConfirmThank />
              </UserRequireAuth>
            }
          />
          <Route path="/account/login" element={<AccountLogin />} />
          <Route path="/account/register" element={<AccountRegister />} />

          {/* for user */}
          <Route
            path="/account/dashboard"
            element={
              <UserRequireAuth>
                {" "}
                <Profile />{" "}
              </UserRequireAuth>
            }
          />
          <Route
            path="/payment"
            element={
              <UserRequireAuth>
                {" "}
                <Payment/>{" "}
              </UserRequireAuth>
            }
          />
          {/* order */}
          <Route path="/account/order" element={
              <UserRequireAuth>
                <Order />
              </UserRequireAuth>
            } />
          {/* change password */}
          <Route
            path="/account/changepassword"
            element={
              <UserRequireAuth>
                <ChangePassword />
              </UserRequireAuth>
            }
            />
          <Route path="/account/favorite" element={<Favorite />} />
          {/* cart page
          {/* -------------------------------------------------- */}
          {/* login */}
          <Route path="/login" element={<Login />} />
          {/* cart */}
          <Route
            path="account/cart"
            element={
              <UserRequireAuth>
                <Cart />
              </UserRequireAuth>
            }
          />

          {/* dashboard for admin */}
          <Route
            path="/"
            element={
              <AdminRequireAuth>
                <Dashboard />
              </AdminRequireAuth>
            }
          />
          {/* slide show */}
          <Route
            path="/slides"
            element={
              <AdminRequireAuth>
                <ShowSlides />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/slides/create"
            element={
              <AdminRequireAuth>
                <CreateSlides />
              </AdminRequireAuth>
            }
          />
          
          <Route
            path="/slides/:id"
            element={
              <AdminRequireAuth>
                <UpdateSlides />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/slides/:id"
            element={
              <AdminRequireAuth>
                <ShowSlides />
              </AdminRequireAuth>
            }
          />
          {/* category */}
          <Route
            path="/categories"
            element={
              <AdminRequireAuth>
                <Categorie />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/categories/create"
            element={
              <AdminRequireAuth>
                <Create />
              </AdminRequireAuth>
            }
          />
          {/* edit category */}
          <Route
            path="/categories/edit/:id"
            element={
              <AdminRequireAuth>
                <EditCategory />
              </AdminRequireAuth>
            }
          />
          {/* ---------------------------- */}
          {/* brand */}
          <Route
            path="/brands"
            element={
              <AdminRequireAuth>
                <Brand />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/brands/create"
            element={
              <AdminRequireAuth>
                <CreateBrand />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/brands/edit/:id"
            element={
              <AdminRequireAuth>
                <EditBrand />
              </AdminRequireAuth>
            }
          />
          {/* users */}
          <Route
            path="/users"
            element={
              <AdminRequireAuth>
                <User />
              </AdminRequireAuth>
            }
          />
          {/* products */}
          <Route
            path="/products"
            element={
              <AdminRequireAuth>
                <Proudcts />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/products/create"
            element={
              <AdminRequireAuth>
                <CreateProduct />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/products/edit/:id"
            element={
              <AdminRequireAuth>
                <EditProduct />
              </AdminRequireAuth>
            }
          />
          {/* ------------------------ */}

          {/* order  */}
          <Route
            path="/orders"
            element={
              <AdminRequireAuth>
                <Orders />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/orders/:id"
            element={
              <AdminRequireAuth>
                <OrderDetail />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <AdminRequireAuth>
                <Setting />
              </AdminRequireAuth>
            }
          />
          {/* footer */}
          <Route
            path="/footer"
            element={
              <AdminRequireAuth>
                <Footer />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/footer/create"
            element={
              <AdminRequireAuth>
                <CreatFooter />
              </AdminRequireAuth>
            }
          />
          {/* not found */}
          <Route
            path="*"
            element={
              <AdminRequireAuth>
                <h1>Not Found</h1>
              </AdminRequireAuth>
            }
          />
        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
