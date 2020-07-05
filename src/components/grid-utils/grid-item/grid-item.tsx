import React from "react";
import Grid from "@material-ui/core/Grid";
import styles from "./grid-item.module.css";
import { Props } from "./grid-item.model";

const GridItem: React.FC<Props> = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <Grid item {...rest} className={styles.grid + " " + className}>
      {children}
    </Grid>
  );
};

GridItem.defaultProps = {
  className: "",
};

export default GridItem;
