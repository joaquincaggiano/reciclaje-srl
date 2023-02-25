// import { NextApiRequest, NextApiResponse } from "next";
// import S3 from "aws-sdk/clients/s3";

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




// // Import required AWS SDK clients and commands for Node.js.
// import { PutObjectCommand } from 'aws-sdk/clients/s3';
// import { s3Client } from "./libs/s3Client.js"; // Helper function that creates an Amazon S3 service client module.
// import path from "path";
// import fs from "fs";

// const file = "OBJECT_PATH_AND_NAME"; // Path to and name of object. For example '../myFiles/index.js'.
// const fileStream = fs.createReadStream(file);

// // Set the parameters
// export const uploadParams = {
//   Bucket: "BUCKET_NAME",
//   // Add the required 'Key' parameter using the 'path' module.
//   Key: path.basename(file),
//   // Add the required 'Body' parameter
//   Body: fileStream,
// };


// // Upload file to specified bucket.
// export const run = async () => {
//   try {
//     const data = await s3Client.send(new PutObjectCommand(uploadParams));
//     console.log("Success", data);
//     return data; // For unit tests.
//   } catch (err) {
//     console.log("Error", err);
//   }
// };
// run();


