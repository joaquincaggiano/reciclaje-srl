import { FC } from "react";
import Carousel from "react-material-ui-carousel";
import {ItemCarrousel} from "./ItemCarrousel"
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import  ArrowForwardIosOutlined  from "@mui/icons-material/ArrowForwardIosOutlined";


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