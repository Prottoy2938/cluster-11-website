import React from "react";
import classNames from "classnames";
import GridContainer from "../src/components/grid-utils/grid-container/grid-container";
import GridItem from "../src/components/grid-utils/grid-item/grid-item";
import Parallax from "../src/components/sc-parallax/sc-parallax";
import styles from "../src/page-props&-style/webapp.module.css";
import Image from "../src/assets/bg4.jpg";
import SectionCarousel from "../src/components/section-carousel/section-carousel";

const WebApp: React.FC = () => {
  return (
    <div>
      <Parallax image={Image}>
        <div className={styles.container}>
          <GridContainer>
            <GridItem>
              <div className={styles.brand}>
                <h1 className={styles.title}>Material Kit React.</h1>
                <h3 className={styles.subtitle}>
                  A Badass Material-UI Kit based on Material Design.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(styles.main, styles.mainRaised)}>
        <SectionCarousel />
      </div>
    </div>
  );
};

export default WebApp;
