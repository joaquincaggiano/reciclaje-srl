import { FC } from "react";
import Carousel from "react-material-ui-carousel";
import {ItemCarrousel} from "./ItemCarrousel"
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

interface Props {
  productImages: string[];
}

export const ProductCarrousel: FC<Props> = ({productImages}) => {

    return (
      <Carousel NextIcon={<ArrowForwardIosOutlined/>} PrevIcon={<ArrowBackIosNewOutlined />}>
        {productImages.map((image, i) => (
          <ItemCarrousel key={i} image={image} />
        ))}
      </Carousel>
    );
  };