import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ログインボタンがクリックされたときの処理
  const handleLogin = () => {
    console.log("login button clicked");
    // ログイン処理を行う
    // ここでは簡略化のため、ユーザー名とパスワードが適切であればログインするとする
    if (email === "email" && password === "admin") {
      login();
      navigate("/adminHome");
    } else {
      // ログイン失敗時の処理
      alert("ログインに失敗しました。");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <Typography variant="h5" gutterBottom>
          管理者ログイン
        </Typography>
        <TextField
          label="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          ログイン
        </Button>
      </div>
    </Grid>
  );
};

export default AdminLogin;
