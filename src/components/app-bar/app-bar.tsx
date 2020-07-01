import React, { useState } from "react";
import NavBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import styles from "./app-bar.module.css";
import SearchBar from "../search-bar/search-bar";
import GitHubIcon from "@material-ui/icons/GitHub";
import Tooltip from "@material-ui/core/Tooltip";

const AppBar: React.FC = () => {
  const [hideTitle, setHideTitle] = useState(false);
  const hide = true;
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

            <a
              href="https://github.com/cluster-11"
              target="_blank"
              rel="noopener noreferrer"
              className={
                hideTitle
                  ? styles.githubIconContainerSM
                  : styles.githubIconContainer
              }
            >
              <Tooltip
                title="view github organization"
                aria-label="view github organization"
              >
                <IconButton>
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
            </a>
            <SearchBar setHideTitle={setHideTitle} />
          </Toolbar>
        </NavBar>
      </div>
    </>
  );
};

export default AppBar;
