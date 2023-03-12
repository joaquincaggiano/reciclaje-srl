import type { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";
import formidable from "formidable";

// type Data = {
//   message: string;
// };

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
  res: NextApiResponse /*<Data>*/
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
  res: NextApiResponse /*<Data>*/
) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res
        .status(500)
        .json({ message: "Error al procesar los archivos subidos" });
      return;
    }

    // aca va s3
    try {
      const fileParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: `${fields.productName}/${files.images.newFilename}`,
        Body: files.image as formidable.File,
        Expires: 60,
        ContentType: files.images.mimetype,
      };

      const url = await s3.getSignedUrlPromise("putObject", fileParams);

      res.status(200).json({ url });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Bad request" });
    }
  });
};
