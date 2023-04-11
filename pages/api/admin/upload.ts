import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import formidable from "formidable";
import fs from "fs"

const s3 = new S3({
  region: "sa-east-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  signatureVersion: "v4",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      return postFiles(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

const postFiles = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error al procesar los archivos subidos" });
    }
   
    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      //@ts-ignore
      Key: `${fields.type}/${files.images.newFilename}`,
      //@ts-ignore
      Body: fs.createReadStream(files.images.filepath),
      Expires: 60,
      //@ts-ignore
      ContentType: files.images.mimetype,
    };
    try {
      //@ts-ignore
      const result = await s3.upload(fileParams, function(err, data) {
        console.log(err, data);
      }).promise();
      //@ts-ignore
      fs.unlinkSync(files.images.filepath);
      return res.status(200).json({ key: result.Key, url: result.Location });

    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Bad request" });
    }
  });
};
