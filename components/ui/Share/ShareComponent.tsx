import { FC } from "react";
import Image from "next/image";

interface Props {
  // link: string; va a ser un string en el futuro
  link: {
    images: string[];
  };
}

export const ShareComponent: FC<Props> = ({ link }) => {
  return (
    <>
      {/* WPP */}
      <a
        href="https://api.whatsapp.com/send?text=www.todorec.com.ar/products"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          width={30}
          height={30}
          style={{
            maxHeight: "30px",
            marginRight: "10px",
          }}
          src="/whatsapp.png"
          alt="logo de wpp"
        />
      </a>
      {/* FACEBOOK */}
      <a
        href="https://www.facebook.com/sharer/sharer.php?u=www.todorec.com.ar/products"
        target="_blank"
        rel="noreferrer"
      >
        <Image
          src="/facebook.png"
          width={30}
          height={30}
          style={{ maxHeight: "30px" }}
          alt="logo de facebook"
        />
      </a>
    </>
  );
};
