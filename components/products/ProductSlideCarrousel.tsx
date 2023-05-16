import { FC } from "react";
import { Slide } from "react-slideshow-image";

import "react-slideshow-image/dist/styles.css";
import styles from "../../styles/products/ProductSlideCarrousel.module.css";

interface Props {
  images: string[];
  height: string;
}

export const ProductSlideCarrousel: FC<Props> = ({ images, height }) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        return (
          <div className={styles["each-slide"]} key={image}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                height: height,
              }}
            ></div>
          </div>
        );
      })}
    </Slide>
  );
};
