import bcrypt from 'bcryptjs';
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

interface SeedBlog {
  title: string;
  description: string;
  info: string;
  images?: string[];
}

interface SeedUser {
    name     : string;
    email    : string;
    password : string;
    role     : 'admin'
}

interface SeedData {
  products: SeedProducts[];
  services: SeedService[];
  blog: SeedBlog[];
  users: SeedUser[];
}

export const initialData: SeedData = {
  users: [
    {
      name     : "Joaquín",
      email    : "joaquincaggiano@gmail.com",
      password : bcrypt.hashSync('J04qu1nD3v'),
      role     : "admin",
    },
    {
      name     : "Cata",
      email    : "cataquarleri@gmail.com",
      password : bcrypt.hashSync('C4t4QD3v'),
      role     : "admin",
    },
  ],
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
        "Enim tempor adipisicing aliqua duis. Quis ea cillum duis adipisicing laborum exercitation enim laborum velit ipsum. Laborum magna adipisicing amet cillum non eu duis labore non nisi velit eu. Ullamco do eiusmod veniam incididunt labore do Lorem dolore laboris magna elit sint cillum consequat. Laborum ex adipisicing qui Lorem reprehenderit incididunt veniam elit Lorem consequat aliqua.",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
    },
    {
      title: "Micronizado",
      description:
        "Irure quis exercitation nisi occaecat aute non magna est laboris labore enim. Quis dolore aliqua labore dolore culpa ex est amet consequat proident magna culpa occaecat. Cupidatat consectetur officia consequat reprehenderit anim. Enim anim enim non laboris esse laboris culpa. Mollit consectetur sunt aliquip adipisicing. Ipsum eu laborum ut eu adipisicing. Eu enim duis labore sit sit velit.",
      images: [
        "https://pbs.twimg.com/media/CWgztjyUsAAWLFm?format=jpg&name=medium",
      ],
    },
    {
      title: "Estrudado",
      description:
        "Et enim ex quis proident velit est incididunt sit nulla Lorem qui elit eu do. Laborum tempor commodo et consectetur aliqua commodo dolor amet ad. Commodo excepteur qui et amet nulla. Est sunt sunt voluptate enim fugiat eu eu ullamco enim magna consectetur est. Velit consectetur occaecat incididunt dolore officia pariatur Lorem aute velit deserunt cillum laboris do sint.",
      images: [
        "https://pbs.twimg.com/media/FZ_IEv5WAAEgh40?format=jpg&name=medium",
      ],
    },
  ],
  blog: [
    {
      title: "Noticia1",
      images: ["https://img.interempresas.net/fotos/2928562.jpeg"],
      description:
        "Ipsum aute ipsum est enim nisi velit ea exercitation sunt ex et fugiat incididunt anim.",
      info: "Sit ut dolore aute magna enim adipisicing incididunt ex aliquip ea dolore ea id. Culpa veniam id exercitation veniam nisi enim dolor cupidatat. Pariatur adipisicing anim et elit veniam sunt nisi mollit Lorem commodo sit. Et veniam elit est deserunt ipsum nisi commodo.",
    },
    {
      title: "Noticia2",
      images: ["https://img.interempresas.net/fotos/2928562.jpeg"],
      description:
        "Ipsum aute ipsum est enim nisi velit ea exercitation sunt ex et fugiat incididunt anim.",
      info: "Sit ut dolore aute magna enim adipisicing incididunt ex aliquip ea dolore ea id. Culpa veniam id exercitation veniam nisi enim dolor cupidatat. Pariatur adipisicing anim et elit veniam sunt nisi mollit Lorem commodo sit. Et veniam elit est deserunt ipsum nisi commodo.",
    },
    {
      title: "Noticia3",
      images: ["https://img.interempresas.net/fotos/2928562.jpeg"],
      description:
        "Ipsum aute ipsum est enim nisi velit ea exercitation sunt ex et fugiat incididunt anim.",
      info: "Sit ut dolore aute magna enim adipisicing incididunt ex aliquip ea dolore ea id. Culpa veniam id exercitation veniam nisi enim dolor cupidatat. Pariatur adipisicing anim et elit veniam sunt nisi mollit Lorem commodo sit. Et veniam elit est deserunt ipsum nisi commodo.",
    },
    {
      title: "Noticia4",
      images: ["https://img.interempresas.net/fotos/2928562.jpeg"],
      description:
        "Ipsum aute ipsum est enim nisi velit ea exercitation sunt ex et fugiat incididunt anim.",
      info: "Sit ut dolore aute magna enim adipisicing incididunt ex aliquip ea dolore ea id. Culpa veniam id exercitation veniam nisi enim dolor cupidatat. Pariatur adipisicing anim et elit veniam sunt nisi mollit Lorem commodo sit. Et veniam elit est deserunt ipsum nisi commodo.",
    },
    {
      title: "Noticia5",
      images: ["https://img.interempresas.net/fotos/2928562.jpeg"],
      description:
        "Ipsum aute ipsum est enim nisi velit ea exercitation sunt ex et fugiat incididunt anim.",
      info: "Sit ut dolore aute magna enim adipisicing incididunt ex aliquip ea dolore ea id. Culpa veniam id exercitation veniam nisi enim dolor cupidatat. Pariatur adipisicing anim et elit veniam sunt nisi mollit Lorem commodo sit. Et veniam elit est deserunt ipsum nisi commodo.",
    },
    {
      title: "Noticia6",
      images: ["https://img.interempresas.net/fotos/2928562.jpeg"],
      description:
        "Ipsum aute ipsum est enim nisi velit ea exercitation sunt ex et fugiat incididunt anim.",
      info: "Sit ut dolore aute magna enim adipisicing incididunt ex aliquip ea dolore ea id. Culpa veniam id exercitation veniam nisi enim dolor cupidatat. Pariatur adipisicing anim et elit veniam sunt nisi mollit Lorem commodo sit. Et veniam elit est deserunt ipsum nisi commodo.",
    },
  ],
};
