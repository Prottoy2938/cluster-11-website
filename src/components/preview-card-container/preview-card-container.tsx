import React, { useEffect, useState } from "react";
import PreviewCard from "../preview-card/preview-card";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Props } from "./preview-card-container.model";
import styles from "./preview-card-container.module.css";

const PreviewCardContainer: React.FC<Props> = (props: Props) => {
  const [applicationData, setApplicationData] = useState([]);
  const { APIEndPoints } = props;

  useEffect(() => {
    //mapping though every available api
    APIEndPoints.map((endpoint) => {
      axios
        .get(`/api/${endpoint}`)
        .then(({ data }) => {
          setApplicationData((applicationData) => [...applicationData, data]);
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }, []);

  return (
    <div className={styles.container}>
      <Grid container spacing={1}>
        {applicationData &&
          applicationData.map((d) => (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={uuid()}>
              <PreviewCard
                title={d.title}
                description={d.description}
                githubURL={d.githubURL}
                demoURL={d.demoURL}
                image={d.images[0]}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default PreviewCardContainer;
