import { z } from "zod";
import React, { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// ユーザー情報のスキーマ定義（仮）
const UserSchema = z.object({
  // id: z.string(),
  email: z.string(),
});

// ユーザー情報の型定義
type User = z.infer<typeof UserSchema>;

// ログイン状態のスキーマ定義
const AuthStateSchema = z.object({
  isLoggedIn: z.boolean(),
  user: UserSchema.nullable(),
  login: z.function(z.tuple([z.string(), z.string()]), z.promise(z.unknown())),
  logout: z.function(),
});

// ログイン状態の型定義
type AuthState = z.infer<typeof AuthStateSchema>;

interface AuthProviderProps {
  children: ReactNode;
}

// デフォルト値を含む AuthContext の作成
const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

// ログインプロバイダーのコンポーネント
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null); // ユーザー情報の状態を管理する
  const [token, setToken] = useState<string>(""); // トークンの状態を管理する
  const navigate = useNavigate();

  // ログイン関数の例
  const login = async (email: string, password: string) => {
    try {
      // バックエンドの認証サービスと通信してログインを試みる
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // レスポンスが正常でない場合はエラーをスローする
      if (!response.ok) {
        throw new Error("Failed to login");
      }

      // レスポンスデータを取得する
      const data = await response.json();

      const { token } = data;

      // トークンをセットする
      setToken(token);
      console.log("token", token);

      // ユーザー情報を取得するAPIにアクセスしてユーザー情報を取得する
      const userResponse = await fetch("http://localhost:8080/api/my/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // トークンを使って認証
        },
      });

      // レスポンスが正常でない場合はエラーをスローする
      if (!userResponse.ok) {
        throw new Error("Failed to get user data");
      }

      // レスポンスデータからユーザー情報を取得する
      const userData = await userResponse.json();

      // ログイン成功時の処理
      setIsLoggedIn(true);
      setUser(userData); // ユーザー情報をセットする

      // ログイン後のリダイレクト
      navigate("/");
    } catch (error) {
      // ログイン失敗時の処理
      console.error("Login error:", error);
      alert("ログインに失敗しました。");
    }
  };

  // ログアウト関数
  const logout = async () => {
    try {
      // バックエンドのログアウトエンドポイントにアクセスしてログアウトする
      const response = await fetch("http://localhost:8080/api/auth/signout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // トークンを使って認証
        },
      });

      // レスポンスが正常でない場合はエラーをスローする
      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      // ログアウト成功時の処理
      setIsLoggedIn(false);
      setUser(null); // ユーザー情報を削除する
      setToken(""); // トークンを削除する
    } catch (error) {
      // ログアウト失敗時の処理
      console.error("Logout error:", error);
      alert("ログアウトに失敗しました。");
    }
  };

  // AuthState を検証し、エラーがあればコンソールに出力する
  AuthStateSchema.parse({ isLoggedIn, user, login, logout });

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// カスタムフックとしての useContext をエクスポート
export const useAuth = () => useContext(AuthContext);
