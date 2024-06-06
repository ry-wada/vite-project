import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Button } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";

export const UserHeader: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext); // CartContextからカート内の商品を取得

  const handleCart = () => {
    navigate("/myCart");
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "white" }}
        >
          LH-EC-SHOP
        </Typography>
        <div>
          <IconButton color="inherit" onClick={handleCart}>
            <Badge badgeContent={cartItems.length} color="error">
              {" "}
              {/* カート内の商品数をバッジに表示 */}
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Button onClick={handleClick} color="inherit">
            Info
          </Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {isLoggedIn ? (
              <>
                <MenuItem component={Link} to="/myPage" onClick={handleClose}>
                  マイページ
                </MenuItem>
                <MenuItem component={Link} to="/" onClick={handleLogout}>
                  ログアウト
                </MenuItem>
              </>
            ) : (
              <MenuItem component={Link} to="/userLogin" onClick={handleClose}>
                ログイン
              </MenuItem>
            )}
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export const AdminHeader: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout(true);
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/adminHome"
          style={{ textDecoration: "none", color: "white" }}
        >
          管理画面
        </Typography>
        <div>
          <>
            <Typography
              variant="body1"
              style={{ marginRight: 10, color: "white" }}
            >
              山田花子 さん {/* DBにないのでとりあえず */}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              ログアウト
            </Button>
          </>
        </div>
      </Toolbar>
    </AppBar>
  );
};
