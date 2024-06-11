import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomTextField,
  CustomTypography,
} from "../../features/components";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIsAdmin(params.get("isAdmin") === "true");
  }, [location.search]);

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
      login(email, password, isAdmin);
    }
  };

  const handleAdminLoginRedirect = () => {
    navigate("/login?isAdmin=true");
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <div>
        <CustomTypography
          variant="h5"
          text={isAdmin ? "管理者ログイン" : "ユーザーログイン"}
        />
        <CustomTextField
          label="e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          helperText={emailError ? "emailを入力してください" : ""}
        />
        <CustomTextField
          label="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
          helperText={passwordError ? "パスワードを入力してください" : ""}
        />
        <br></br>
        <CustomButton onClick={handleLogin} label="ログイン" />
        <br></br>
        {!isAdmin && (
          <CustomButton
            onClick={() => handleAdminLoginRedirect()}
            label="管理者としてログイン"
            color="warning"
          />
        )}
      </div>
    </Grid>
  );
};

export default Login;
