import React, { useState } from "react";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const UserLogin: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // ログインボタンがクリックされたときの処理
  const handleLogin = async () => {
    if (email === "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (email !== "" && password !== "") {
      login(email, password, false);
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
          ユーザーログイン
        </Typography>
        <TextField
          label="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          error={emailError}
          helperText={emailError ? "emailを入力してください" : ""}
        />
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          error={passwordError}
          helperText={passwordError ? "パスワードを入力してください" : ""}
        />
        <Button variant="contained" color="primary" onClick={handleLogin}>
          ログイン
        </Button>
      </div>
    </Grid>
  );
};

export default UserLogin;
