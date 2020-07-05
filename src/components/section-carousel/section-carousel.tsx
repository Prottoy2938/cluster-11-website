import React from "react";
import Carousel from "react-slick";
import LocationOn from "@material-ui/icons/LocationOn";
import GridContainer from "../grid-utils/grid-container/grid-container";
import GridItem from "../grid-utils/grid-item/grid-item";
import Card from "../sc-card/sc-card";
import image1 from "../../../public/assets/bg.jpg";
import image2 from "../../../public/assets/bg2.jpg";
import image3 from "../../../public/assets/bg3.jpg";
import styles from "./section-carousel.module.css";

const SectionCarousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={styles.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div>
                  <img src={image1} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Yellowstone National Park, United States
                    </h4>
                  </div>
                </div>
                <div>
                  <img
                    src={image2}
                    alt="Second slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Somewhere Beyond, United States
                    </h4>
                  </div>
                </div>
                <div>
                  <img src={image3} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                    <h4>
                      <LocationOn className="slick-icons" />
                      Yellowstone National Park, United States
                    </h4>
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default SectionCarousel;
