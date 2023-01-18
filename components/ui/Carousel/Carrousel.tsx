import Carousel from "react-material-ui-carousel";
import { Item } from "./Item";
import { images } from "@/utils";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

export const Carrousel = () => {

  return (
    <Carousel NextIcon={<ArrowForwardIosOutlined/>} PrevIcon={<ArrowBackIosNewOutlined />}>
      {images.map((image, i) => (
        <Item key={i} image={image} />
      ))}
    </Carousel>
  );
};
