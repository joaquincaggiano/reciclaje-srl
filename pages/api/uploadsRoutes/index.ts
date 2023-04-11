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

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const postPath = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = await req.body;
  return res.status(200).json({ message: req.body });
};
