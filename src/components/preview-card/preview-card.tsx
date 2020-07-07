import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Props } from "./preview-card.model";
import styles from "./preview-card.module.css";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt } from "@fortawesome/free-brands-svg-icons";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "next/link";

const PreviewCard: React.FC<Props> = (props: Props) => {
  const { title, description, image, demoURL, githubURL } = props;

  const handleDemoClick = (): void => {
    document.location.href = demoURL;
  };

  return (
    <div className={styles.container}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <Tooltip
              title="view on github"
              aria-label="view on github"
              className={styles.githubIconContainer}
            >
              <a
                href={githubURL}
                className={styles.githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconButton aria-label="Give it a Star on GitHub">
                  <FontAwesomeIcon icon={faGithubAlt} />
                </IconButton>
              </a>
            </Tooltip>
          }
          className={styles.titleContainer}
          title={title}
        />
        <CardMedia className={styles.media} image={image} />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={styles.descriptionContainer}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions className={styles.actionContainer}>
          <Button
            variant="contained"
            onClick={handleDemoClick}
            className={styles.demoBtn}
          >
            Demo
          </Button>
          <Link href={`/webapp?name=${encodeURIComponent(title)}`}>
            <div className={styles.learnMoreContainer}>
              More Details
              <IconButton
                aria-label="learn-more"
                className={styles.learnMoreIcon}
              >
                <ArrowRightAltIcon />
              </IconButton>
            </div>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
};

export default PreviewCard;
