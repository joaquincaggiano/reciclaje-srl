// import { NextApiRequest, NextApiResponse } from "next";
// import S3 from "aws-sdk/clients/s3";
import Credentials from 'next-auth/providers/credentials';

// const s3 = new S3({
//   region: "sa-east-1",
//   accessKeyId: process.env.ACCESS_KEY,
//   secretAccessKey: process.env.SECRET_KEY,
//   signatureVersion: "v4",
// });

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     let { name, type } = req.body;

//     const fileParams = {
//       Bucket: process.env.BUCKET_NAME,
//       Key: name,
//       Expires: 60,
//       ContentType: type,
//     };

//     const url = await s3.getSignedUrlPromise("putObject", fileParams);

//     res.status(200).json({ url });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: err });
//   }
// };

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "8mb", // Set desired value here
//     },
//   },
// };


/********FUNCION EN EL TSX*******/
  // const uploadFile = async () => {
  //   // File ahora es un array
  //   const oneFile = file.map((fil:File) => {
  //     return fil;
  //   })

  //   let { data } = await axios.post("/api/s3/uploadFile", {
  //     name: imageName,
  //     // type: file.type,
  //     type: oneFile.type,
  //   });

  //   console.log(data);

  //   const url = data.url;
  //   let { data: newData } = await axios.put(url, oneFile, /*file,*/ {
  //     headers: {
  //       "Content-type": oneFile.type,
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   });
  //   setFile(null);
  // };


import { NextApiRequest, NextApiResponse } from 'next'
import { createPresignedPost } from '@aws-sdk/s3-presigned-post'
import { S3Client } from '@aws-sdk/client-s3'
// import S3 from "aws-sdk/clients/s3";

const s3 = new S3Client({
    region: "sa-east-1",
    credentials: {
      accessKeyId: process.env.ACCESS_KEY || "",
      secretAccessKey: process.env.SECRET_KEY || "",
    },
    // signatureVersion: "v4",
  });

const uploadHandler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const {
    // query: { file, fileType, fileId, fileTitle },
    method,
  } = req

  let { name, type } = req.body;

  switch (method) {
    case 'POST':
      try {
        const post = await createPresignedPost(s3, {
          Bucket: process.env.S3_BUCKET_NAME || "",
          // Key: must match POST url for file upload
          Key: `${name}-${type}`,
          Fields: {
            ContentType: type as string,
          },
          Expires: 600, // seconds
          Conditions: [
            { bucket: process.env.S3_BUCKET_NAME || "" },
            ['starts-with', '$ContentType', 'image/'],
          ],
        })

        res.status(200).json(post)
      } catch (error: any) {
        console.error('🚀 ~ file: index.ts ~ line 45 ~ error', error)
        // throw error for errorWrapper to handle?
        // send to some error logging service?
        res.json(error)
        // throw error
      }
    default:
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

export default uploadHandler

