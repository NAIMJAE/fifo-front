/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { RootUrl } from "../../api/RootUrl";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";

const settings = ["프로필", "로그아웃", "회원탈퇴"];

function ResponsiveAppBar({ setPageState }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    switch (e) {
      case "프로필":
        setPageState("MyProfile");
        break;
      case "프로젝트":
        setPageState("MyProject");
        break;
      case "회원탈퇴":
        setPageState("MyArticle");
        break;
    }

    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="l">
        <Toolbar disableGutters>
          <Box
            sx={{ flexGrow: 0.4, display: { xs: "none", md: "flex" } }}
          ></Box>

          <Link to={"/"}>
            <img
              style={{ width: "120px", margin: "0px 20px 0px 0px" }}
              src="../../../../images/ppoppi_in_my_house.png"
              alt="fifo"
            ></img>
          </Link>

          <Typography
            variant="h5"
            noWrap
            component="text"
            style={{
              display: { xs: "none", md: "flex" },
              fontWeight: "border",
              letterSpacing: ".2rem",
              color: "inherit",
            }}
          >
            마이페이지
          </Typography>

          <Box style={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            ></Menu>
          </Box>
          <div style={{ margin: "0px 15px 0px 0px" }}></div>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                alt="profile"
                src={`${RootUrl()}/uploads/user/ppoppi.png`}
              />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{ flexGrow: 0.5, display: { xs: "none", md: "flex" } }}
          ></Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
