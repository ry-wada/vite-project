import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import { AuthProvider } from "./contexts/AuthContext";
import MyPage from "./components/user/MyPage";
import UserHome from "./components/user/UserHome";
import MyCart from "./components/user/MyCart";
import UserLogin from "./components/user/UserLogin";
import ProductDetail from "./components/user/ProductDetail";
import AdminLogin from "./components/admin/AdminLogin";
import AdminHome from "./components/admin/AdminHome";
import AdminProductDetail from "./components/admin/AdminProductDetail";
import AdminAddProduct from "./components/admin/AdminAddProduct";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            {/* ユーザー側のルート */}
            <Route path="/" element={<UserHome />} />
            <Route path="/productDetail/:id" element={<ProductDetail />} />
            <Route path="/userLogin" element={<UserLogin />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myCart" element={<MyCart />} />

            {/* 管理者側のルート */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/adminHome" element={<AdminHome />} />
            <Route
              path="/adminProductDetail/:id"
              element={<AdminProductDetail />}
            />
            <Route path="/adminAddProduct" element={<AdminAddProduct />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
