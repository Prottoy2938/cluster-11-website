import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Props } from "./preview-card.model";
import styles from "./preview-card.module.css";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const PreviewCard: React.FC<Props> = (props: Props) => {
  const { title, description, githubURL, image, demoURL } = props;

  const handleGithubClick = (): void => {
    document.location.href = githubURL;
  };

  const handleDemoClick = (): void => {
    document.location.href = demoURL;
  };

  return (
    <div className={styles.container}>
      <Card className={styles.root}>
        <CardHeader
          action={
            <Tooltip title="view on github" aria-label="view on github">
              <IconButton
                aria-label="Give it a Star on GitHub"
                onClick={handleGithubClick}
              >
                <FontAwesomeIcon icon={faCoffee} />
              </IconButton>
            </Tooltip>
          }
          title={title}
        />
        <CardMedia className={styles.media} image={image} />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions className={styles.actionContainer}>
          <Button variant="contained" onClick={handleDemoClick}>
            Demo
          </Button>

          <Button variant="contained">Details</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default PreviewCard;
