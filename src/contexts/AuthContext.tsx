/* eslint-disable react-refresh/only-export-components */
// AuthContext.tsx

import React, { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// ログイン状態の型定義
interface AuthState {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// デフォルト値を含む AuthContext の作成
const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// ログインプロバイダーのコンポーネント
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // プロパティの受け取り方を修正
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ログイン関数
  const login = () => {
    console.log("login");
    // 本来はここでログイン処理が行われる
    setIsLoggedIn(true);
    navigate("/");
  };

  // ログアウト関数
  const logout = () => {
    // 本来はここでログアウト処理が行われる
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフックとしての useContext をエクスポート
export const useAuth = () => useContext(AuthContext);
