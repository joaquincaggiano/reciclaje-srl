import Carousel from "react-material-ui-carousel";
import { Item } from "./Item";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from "@mui/icons-material";

const images = [
  "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
  "https://pbs.twimg.com/media/CWgztjyUsAAWLFm?format=jpg&name=medium",
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
