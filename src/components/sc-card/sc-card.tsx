import React from "react";
import classNames from "classnames";
import styles from "./sc-card.module.css";
import { Props } from "./sc-card.model";

const Card: React.FC<Props> = (props: Props) => {
  const { className, children, plain, carousel, ...rest } = props;

  const cardClasses = classNames({
    [styles.card]: true,
    [styles.cardPlain]: plain,
    [styles.cardCarousel]: carousel,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;
