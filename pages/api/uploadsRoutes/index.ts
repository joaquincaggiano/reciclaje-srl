import type { NextApiRequest, NextApiResponse } from "next";

interface IImageData {
  path: string;
  filename: string[];
}

type Data = string[] | { message: string };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return postPath(req, res);
    // case "GET":
    //     return getPath(req, res)

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const postPath = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
// SIENTO QUE EL PROBLEMA ES LA ASINCRONIA
const data = await req.body
console.log("LA DATA", data);
return res.status(200).json({message: req.body});



//   let url: string[] = [];
//   const { path = "", filename = [] } = req.body as IImageData;

//   if (!filename.length) {
//     res.status(400).json({ message: "File not found" });
//   }

//   //   console.log(filename, path);
//   //   console.log("REQ BODY", req.body);
//   filename.map((eachFile: string) => {
//     return url.push(`/${path}/${eachFile}`);
//   });
//   return res.status(200).json(url);
};
