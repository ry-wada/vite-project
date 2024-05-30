import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductPage from "./components/ProductPage$id";
import { ProductProvider } from "./contexts/ProductContext";
import LoginPage from "./components/LoginPage";
import { AuthProvider } from "./contexts/AuthContext";
import MyPage from "./components/MyPage";
import MyCartPage from "./components/MyCartPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productPage/:id" element={<ProductPage />} />ß
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/myCartPage" element={<MyCartPage />} />
          </Routes>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
