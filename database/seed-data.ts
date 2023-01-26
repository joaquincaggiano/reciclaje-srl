import { ICategory, IColor } from "@/interfaces";

interface SeedProducts {
  title: string;
  images: string[];
  colors: IColor[];
  category: ICategory;
}

interface SeedService {
  title: string;
  description: string;
  images: string[];
}

// interface SeedBlog {
//     title: string
//     description: string
//     info: string
//     image?: string
// }

// interface SeedUser {
//     name     : string;
//     email    : string;
//     password : string;
//     role     : 'admin'
// }

interface SeedData {
  products: SeedProducts[];
  services: SeedService[];
  // users: SeedUser[];
  //   blog: SeedBlog[]
}

export const initialData: SeedData = {
  products: [
    {
      title: "Molienda Alto Impacto",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
      colors: ["Blanco", "Gris"],
      category: "Molienda",
    },
    {
      title: "Molienda ABS",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
      colors: ["Blanco", "Gris", "Negro"],
      category: "Molienda",
    },
    {
      title: "Molienda Polipropileno",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
      colors: ["Negro", "Gris", "Transparente"],
      category: "Molienda",
    },
    {
      title: "Polietileno de roto moldeo",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
      colors: ["Blanco", "Amarillo", "Verde", "Azul", "Rojo", "Negro"],
      category: "Polietileno",
    },
    {
      title: "Polietileno estrudado de baja intensidad",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
      colors: ["Caramelo", "Negro"],
      category: "Polietileno",
    },
    {
      title: "Polietileno estrudado de alta intensidad",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
      colors: ["Caramelo", "Negro"],
      category: "Polietileno",
    },
  ],
  services: [
    {
      title: "Molienda",
      description:
        "Velit non sit tempor labore est in quis pariatur cillum id ea non tempor anim.",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
    },
    {
      title: "Micronizado",
      description: "Non non consectetur ad laboris aliquip.",
      images: [
        "https://pbs.twimg.com/media/CWgztjyUsAAWLFm?format=jpg&name=medium",
      ],
    },
    {
      title: "Estrudado",
      description:
        "Exercitation sunt cupidatat pariatur ex culpa duis occaecat magna qui aliqua velit pariatur.",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
    },
  ],
};
