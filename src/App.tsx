import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductProvider } from "./contexts/ProductContext";
import { AuthProvider } from "./contexts/AuthContext";
import MyPage from "./components/user/MyPage";
import UserHome from "./components/user/UserHome";
import MyCart from "./components/user/MyCart";
import ProductDetail from "./components/user/ProductDetail";
import AdminHome from "./components/admin/AdminHome";
import AdminProductDetail from "./components/admin/AdminProductDetail";
import AdminAddProduct from "./components/admin/AdminAddProduct";
import NotFoundPage from "./components/common/NotFoundPage";
import { CartProvider } from "./contexts/CartContext";
import Login from "./components/common/Login";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Routes>
              {/* 共通のルート */}
              <Route path="/login" element={<Login />} />

              {/* ユーザー側のルート */}
              <Route path="/" element={<UserHome />} />
              <Route path="/productDetail/:id" element={<ProductDetail />} />
              <Route path="/myPage" element={<MyPage />} />
              <Route path="/myCart" element={<MyCart />} />

              {/* 管理者側のルート */}
              <Route path="/adminHome" element={<AdminHome />} />
              <Route
                path="/adminProductDetail/:id"
                element={<AdminProductDetail />}
              />
              <Route path="/adminAddProduct" element={<AdminAddProduct />} />

              {/* 404 ページ */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
