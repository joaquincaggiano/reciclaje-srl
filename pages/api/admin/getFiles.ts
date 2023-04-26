import type { NextApiRequest, NextApiResponse } from "next";
import { S3 } from "aws-sdk";

const s3 = new S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION_AWS,
});

export default function handler (req: NextApiRequest, res: NextApiResponse /*<Data>*/) {
  switch (req.method) {
    case "POST":
      return getListFiles(req, res);

    default:
      res.status(200).json({ message: "Bad request" });
  }
}

const getListFiles = async (
  req: NextApiRequest,
  res: NextApiResponse /*<Data>*/
) => {
  const { name, type } = req.body;
  const params = {
    Bucket: process.env.BUCKET_NAME as string,
    Prefix: `${type}/${name}` as string,
  };
  try {
    const data = await s3.listObjectsV2(params).promise();
    //@ts-ignore
    const objects = data.Contents.map((obj) => obj.Key);
    res.status(200).json({ objects });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to list objects in folder" });
  }
};
