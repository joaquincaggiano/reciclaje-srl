import AWS from 'aws-sdk';
import type { NextApiRequest, NextApiResponse } from 'next';

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {
    const { key } = req.body;
    console.log("EL KEY!!!!", key)

    var params = {
        Bucket: process.env.BUCKET_NAME as string, 
        Key: key as string
       };
  
    try {
        await  s3.listObjectVersions(params, function(err, data) {
            if (err){
                console.log("ERROR", err)
            }else{
                console.log("DATA", data)
            }
        })
        //@ts-ignore
      await s3.deleteObject(params).promise();
      res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting image' });
    }
  }