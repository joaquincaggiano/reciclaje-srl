import Carousel from "react-material-ui-carousel";
import { Item } from "./Item";
import ArrowBackIosNewOutlined from "@mui/icons-material/ArrowBackIosNewOutlined";
import  ArrowForwardIosOutlined  from "@mui/icons-material/ArrowForwardIosOutlined";

const images = [
  "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/banner/frente1.jpg",
  "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/banner/adentro4.jpg",
  "https://todorecsrl-test-dev.s3.sa-east-1.amazonaws.com/banner/adentro2.jpg",
];

export const Carrousel = () => {

  return (
    <Carousel NextIcon={<ArrowForwardIosOutlined/>} PrevIcon={<ArrowBackIosNewOutlined />}>
      {images.map((image, i) => (
        <Item key={i} image={image} />
      ))}
    </Carousel>
  );
};
