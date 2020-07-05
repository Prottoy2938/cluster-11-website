import React from "react";
import Grid from "@material-ui/core/Grid";
import { Props } from "./grid-container.model";
import styles from "./grid-container.module.css";

const GridContainer: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <Grid container {...rest} className={styles.grid + " " + className}>
      {children}
    </Grid>
  );
};

GridContainer.defaultProps = {
  className: "",
};

export default GridContainer;
