import React from "react";
import NavBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import styles from "./app-bar.module.css";

const AppBar: React.FC = () => {
  return (
    <div className={styles.root}>
      <NavBar position="static">
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
          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: styles.inputRoot,
                input: styles.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </NavBar>
    </div>
  );
};

export default AppBar;
