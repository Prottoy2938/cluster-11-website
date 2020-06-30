import React, { useState, useEffect } from "react";
import NavBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import styles from "./app-bar.module.css";
import SearchBar from "../search-bar/search-bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare } from "@fortawesome/free-brands-svg-icons";

const AppBar: React.FC = () => {
  const [hideTitle, setHideTitle] = useState(false);

  return (
    <>
      <div className={styles.root}>
        <NavBar position="static" className={styles.container}>
          <Toolbar className={styles.navBarContent}>
            {/* <IconButton
            edge="start"
            className={styles.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
            <h3 className={hideTitle ? styles.titleSM : styles.title}>
              Cluster 11
            </h3>

            <SearchBar setHideTitle={setHideTitle} />
          </Toolbar>
        </NavBar>
      </div>
    </>
  );
};

export default AppBar;
