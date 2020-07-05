import React, { useState, useEffect } from "react";
import classNames from "classnames";

import { Props } from "./sc-parallax.model";
import classNameCS from "./sc-parallax.module.css";

const Parallax: React.FC<Props> = (props: Props) => {
  let windowScrollTop;

  const [transform, setTransform] = useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );

  const resetTransform = (): void => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };

  useEffect(() => {
    if (window.innerWidth >= 768) {
      windowScrollTop = window.pageYOffset / 3;
    } else {
      windowScrollTop = 0;
    }
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return (): void => {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });

  const { filter, className, children, style, background, small } = props;
  const parallaxClasses = classNames({
    [classNameCS.parallax]: true,
    [classNameCS.filter]: filter,
    [classNameCS.small]: small,
    [className]: className !== undefined,
  });
  return (
    <div
      className={parallaxClasses}
      style={{
        ...style,
        backgroundColor: background,
        transform: transform,
      }}
    >
      {children}
    </div>
  );
};

export default Parallax;
