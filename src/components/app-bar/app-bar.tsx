import React from "react";
import NavBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import styles from "./app-bar.module.css";
import SearchBar from "../search-bar/search-bar";

const AppBar: React.FC = () => {
  return (
    <>
      <div className={styles.root}>
        <NavBar position="static" className={styles.container}>
          <Toolbar>
            {/* <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
            <Typography className={styles.title} variant="h6" noWrap>
              Cluster 11
            </Typography>
            <SearchBar />
          </Toolbar>
        </NavBar>
      </div>
    </>
  );
};

export default AppBar;
