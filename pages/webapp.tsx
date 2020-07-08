import React from "react";
import classNames from "classnames";
import GridContainer from "../src/components/grid-utils/grid-container/grid-container";
import GridItem from "../src/components/grid-utils/grid-item/grid-item";
import Parallax from "../src/components/sc-parallax/sc-parallax";
import styles from "../src/page-props&-style/webapp.module.css";
import SectionCarousel from "../src/components/section-carousel/section-carousel";
import Head from "next/head";
import { useRouter } from "next/router";

const WebApp: React.FC = () => {
  const router = useRouter();
  //BRING BACK THE SEARCH-BAR TEST FILES
  //https://stackoverflow.com/questions/53648652/how-to-use-environment-variables-in-github-page
  // console.log(router.query.name);

  return (
    <>
      <Head>
        <title>Cluster 11 | Cluster of AI/ML Powered Application</title>
        <link
          href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
          rel="stylesheet"
        />
      </Head>
      <div>
        <Parallax background="#091422">
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
    </>
  );
};

export default WebApp;
