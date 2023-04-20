import { FC } from 'react'
import Image from 'next/image'

interface Props {
    // link: string; va a ser un string en el futuro
    link: {
        images: string[]
    }
}

export const ShareComponent: FC<Props> = ({link}) => {
  return (
    <>
              {/* WPP */}
              <a
                href={`https://api.whatsapp.com/send?text=${link.images[0]}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image
                  style={{
                    width: "30px",
                    maxHeight: "30px",
                    marginRight: "10px",
                  }}
                  src="/whatsapp.png"
                  alt="logo de wpp"
                />
              </a>
              {/* FACEBOOK */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${link.images[0]}`}
                target="_blank"
                rel="noreferrer"
              >
                <Image src="/facebook.png"  width={30} style={{maxHeight: "30px"}} alt="logo de facebook"/>
              </a>
            </>
  )
}
