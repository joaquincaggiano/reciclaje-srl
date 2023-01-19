interface SeedProduct {
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface SeedService {
    title: string
    description: string,
    serviceImage: string
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
    products: SeedProduct[];
  // users: SeedUser[];
  services: SeedService[];
//   blog: SeedBlog[]
}

export const initialData: SeedData = {
  products: [
    {
      title: "producto 1",
      description: "Lorem qui ut mollit officia qui.",
      image:
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      slug: "product_1",
    },
    {
      title: "producto 2",
      description: "Lorem qui ut mollit officia qui.",
      image:
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      slug: "product_2",
    },
    {
      title: "producto 3",
      description: "Lorem qui ut mollit officia qui.",
      image:
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      slug: "product_3",
    },
    {
        title: "producto 4",
        description: "Lorem qui ut mollit officia qui.",
        image:
          "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
        slug: "product_4",
      },
      {
        title: "producto 5",
        description: "Lorem qui ut mollit officia qui.",
        image:
          "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
        slug: "product_5",
      },
      {
        title: "producto 6",
        description: "Lorem qui ut mollit officia qui.",
        image:
          "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
        slug: "product_6",
      },
  ],
  services:  
  [
      {
        title: "Molienda",
        description:
          "Velit non sit tempor labore est in quis pariatur cillum id ea non tempor anim.",
        serviceImage:
          "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      },
      {
        title: "Micronizado",
        description: "Non non consectetur ad laboris aliquip.",
        serviceImage:
          "https://pbs.twimg.com/media/CWgztjyUsAAWLFm?format=jpg&name=medium",
      },
      {
        title: "Estrudado",
        description:
          "Exercitation sunt cupidatat pariatur ex culpa duis occaecat magna qui aliqua velit pariatur.",
        serviceImage:
          "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      },
    ]
};
