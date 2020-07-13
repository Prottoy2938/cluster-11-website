import React, { useState, useEffect } from "react";
import classNames from "classnames";
import GridContainer from "../src/components/grid-utils/grid-container/grid-container";
import GridItem from "../src/components/grid-utils/grid-item/grid-item";
import Parallax from "../src/components/sc-parallax/sc-parallax";
import styles from "../src/page-props&-style/webapp.module.css";
import SectionCarousel from "../src/components/section-carousel/section-carousel";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import AppBar from "../src/components/app-bar/app-bar";

const WebApp: React.FC = () => {
  const router = useRouter();
  const [appData, setAppData] = useState({});

  //fetching data base on the query app name
  useEffect(() => {
    const { name } = router.query;
    if (name) {
      const appName = name.toString().toLowerCase().replace(/ /g, "-");
      axios
        .get(`/api/${appName}`)
        .then(({ data }) => {
          setAppData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  useEffect(() => {
    console.log(appData);
  }, [appData]);

  return (
    <>
      <Head>
        <title>Cluster 11 | Cluster of AI/ML Powered Application</title>
        <link
          href="https://use.fontawesome.com/releases/v5.0.10/css/all.css"
          rel="stylesheet"
        />
      </Head>
      {/* fade in appbar */}
      <AppBar backgroundColor="rgb(9, 17, 28)" />
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
